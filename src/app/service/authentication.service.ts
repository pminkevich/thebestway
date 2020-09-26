import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestoreDocument, AngularFirestore, DocumentData } from '@angular/fire/firestore';
import { Usuario } from '../models/user';
import{map, mapTo} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
usuario:BehaviorSubject<Usuario>;
userVisit: Usuario = {
  id: '',
  nombre: '',
  phoneNumber: '',
  email: '',
  photoURL: '',
  tipo: 'visit',
  groupId: 0,
  level: 0
        
}

  constructor(public auth: AngularFireAuth,
    private router:Router,
    private afs: AngularFirestore) {

      const user:Usuario= JSON.parse(localStorage.getItem('UserData'));
               if (user){
                const usuarioNow: Usuario = {
                  id: user.id,
                  nombre: user.nombre,
                  phoneNumber: user.phoneNumber,
                  email: user.email,
                  photoURL: user.photoURL,
                  tipo: user.tipo,
                  groupId: 0,
                  level: 1
                        
                }
                this.usuario=new BehaviorSubject<Usuario>(usuarioNow);
                //console.log(user.id);
               }
               else{
                
                this.usuario=new BehaviorSubject<Usuario>(this.userVisit);
               }

     }

  getUsers(){
  
  }
    loginGoogle() {
      const provider=new auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
  
      this.auth.signInWithPopup(provider).then(result=>{
         // This gives you a Google Access Token.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
  
        console.log(user);
        console.log(result);
  
      }).catch(error=>{
        console.log(error);
      });
       
    }
    logout() {
     this.auth.signOut();
     localStorage.removeItem('UserData');
     this.router.navigate(['/']);
     
     
    }
    
  
    async loginEmailUser(email: string, pass: string){  
      return new Promise((resolve, reject) => {
          this.auth.signInWithEmailAndPassword(email,pass)
          .then(  async userData  => {
            resolve(userData.user);
              
              const getDataUserSession:Usuario={
              id:userData.user.uid,
              nombre: userData.user.displayName,
              email: userData.user.email,
              emailVerified: userData.user.emailVerified,
              phoneNumber: userData.user.phoneNumber,
              photoURL: userData.user.photoURL,
              level:1,
              tipo: 'newUser',
              groupId: 0,
              
              }
  
            
              
              localStorage.setItem('UserData',JSON.stringify(getDataUserSession));
              this.usuario.next(getDataUserSession);
             
          },
          err => reject(err));
      }
  )
  
  }
   
  public signOut(){
      this.auth.signOut();
      localStorage.removeItem('UserData');
      this.usuario.next(this.userVisit);
      this.router.navigate(['/']);
      
  }
  
  public async registerUser(register: Usuario){
      return new Promise ((resolve, reject) => {
        
          this.auth.createUserWithEmailAndPassword(register.email,register.password)
          .then( async userData => {
              resolve(userData);
  
              const user={
                id:userData.user.uid,
                nombre: register.nombre,
                email: userData.user.email,
                emailVerified: userData.user.emailVerified,
                phoneNumber: register.phoneNumber,
                photoURL: userData.user.photoURL
                
          
                }
                //localStorage.setItem('UserData',JSON.stringify(user));
                
                await this.updateUserData(user)
              
                 
          }).catch(err => console.log(reject(err)))
      
      });
  }
  
  
  // Metodo para validar si el usuario esta autenticado
  // public isAuthenticated(){
  //     return this.auth.authState.pipe(map(auth => auth));
  // }
  public isAuthenticated(){
    return this.auth.authState.pipe(map(auth => auth));
  }
  async setImage(idUser:string,urlImage:string){
    this.afs.doc(`usuarios/${idUser}`).update({
      photoURL: urlImage
    })
  }
  private async updateUserData(user){
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usuarios/${user.id}`);
      const data: Usuario = {
          id: user.id,
          nombre: user.nombre,
          phoneNumber: user.phoneNumber,
          email: user.email,
          photoURL: user.photoURL,
          tipo: 'newUser',
          groupId: 0,
          level: 1
               
      }
      this.usuario.next(data);
      
      return await userRef.set(data, {merge: true})
  }
  
}
