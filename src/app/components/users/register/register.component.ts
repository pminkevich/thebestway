import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Usuario } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('imageUser') inputImageUser: ElementRef
  
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  error:boolean;
  errorMessage:string='';
  title:string='Login';
  user: Usuario;
  // public email: string ='';
  public passwordOne: string= '';
  public passwordConfirm: string= '';
 
  register= this.createFormGroup();
   

  get email(){return this.register.get('email');}
  get password(){return this.register.get('password');}
  get passwordConfirmInput(){return this.register.get('passwordConfirmInput');}
  get nombre(){ return this.register.get('nombre');}
 get phoneNumber(){return this.register.get('phoneNumber');}

  // uploadPercent: Observable<number>;
  // urlImage: Observable<string>;
  
  hide = true;
  
  constructor(private router:Router,
              private authService:AuthenticationService,
              private fb:FormBuilder,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.user= JSON.parse(localStorage.getItem('UserData'));
   
    if(this.user){
      this.router.navigate(['/home']);
  }
  }

  createFormGroup() {

    return  this.fb.group({
      
      nombre:  ['',[Validators.required]],
      phoneNumber:  ['',[Validators.required ,Validators.minLength(7), Validators.maxLength(10), Validators.pattern('[0-9]*$')]],
      email: ['',[Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]],
      passwordConfirmInput:['',[Validators.required]]
      

     
    });
  }
  textErrorMessage(){
    if(this.nombre.hasError('required')){
      return 'Debe rellenar el campo';
    }
    
      }
    
     
      telErrorMessage(){
        if(this.phoneNumber.hasError('minlength')|| this.phoneNumber.hasError('maxlength')){
          return 'Tiene que ingresar de 7 a 10 Numeros';
        }
    
        if(this.phoneNumber.hasError('pattern')){
          return 'Solo se Permiten Numeros';
        }
    
        return this.phoneNumber.hasError('required')?'Tiene que ingresar su Numero de Telefono':'';
      }
    
     
  getPaswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Debe Ingresar un Valor';
    }
  
    return this.password.hasError('minlength') ? 'Debe tener al menos 6 Caracteres' : '';
  }
  verifyPasswordConfirm(){
    if (this.passwordConfirm !== this.passwordOne){
      this.passwordConfirmInput.setErrors({notUnique:true});
      this.getPaswordConfirmErrorMessage();
      //this.passwordConfirmInput.setValue(false,{onlySelf:true, emitEvent:true, emitModelToViewChange:true,emitViewToModelChange:true});
    //this.passwordConfirmInput.updateValueAndValidity({onlySelf:true, emitEvent:true});
    }
   
  }
  getPaswordConfirmErrorMessage() {
    if (this.passwordConfirmInput.hasError('required')) {
      return 'Debe Ingresar un Valor';
    }
     
    return this.passwordConfirmInput.hasError('notUnique') ? 'El Campo no Coincide' : '';
    //return this.passwordInput.hasError('passwordConfirmInput') ? 'Debe tener al menos 6 Caracteres' : '';
  }
   getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debe Ingresar un Valor';
    }
  
    return this.email.hasError('email') ? 'Ingrese un Mail Valido' : '';
  }

  async onAddUser(register: FormGroup){
    this.authService.registerUser(register.value)
    .then(() => {
     
      this.authService.isAuthenticated().subscribe( user => {
        if (user){
          const userForm:Usuario=register.value;
          const userModel={
            id:user.uid,
            nombre: userForm.nombre,
            email: user.email,
            emailVerified: user.emailVerified,
            phoneNumber: userForm.phoneNumber,
            photoURL: this.inputImageUser.nativeElement.value
             }
          

        localStorage.setItem('UserData', JSON.stringify(userModel));

          this.authService.setImage(user.uid,this.inputImageUser.nativeElement.value);

                user.updateProfile({
                displayName: userForm.nombre,
                photoURL: this.inputImageUser.nativeElement.value

            }).then( () => {
              this.router.navigate(['/home']);
                console.log('USUARIO ACTUALIZADO');
            }).catch( (error) => 
                console.log('error', error));
            
        }
    });
      
        this.router.navigate(['/welcome'])

     

        
    }).catch((error) => {
      
      this.errorMessage=error;
      this.error=true;
      console.log(error);
    });

}
onUpload(e){
  //console.log('Subir', e.target.files[0]);
  const id = Math.random().toString(36).substring(2);
  const file = e.target.files[0];
  const filePath = `upload/${id}`;
  const ref = this.storage.ref(filePath);
  const task = this.storage.upload(filePath, file);
  this.uploadPercent = task.percentageChanges();

  task.snapshotChanges().pipe( finalize (() => this.urlImage = ref.getDownloadURL())).subscribe();
}
}