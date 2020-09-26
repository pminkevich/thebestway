import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import{AuthenticationService} from '../../../service/authentication.service';
import{Usuario} from '../../../models/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  public email: string ='';
  public password: string= '';
  
  error:boolean;
  errorMessage:string='';
  hide = true;
  user: Usuario;
  loading:boolean=false;

  login=new FormGroup({
    emailInput: new FormControl('', [Validators.required, Validators.email]),
    passwordInput: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

get emailInput(){return this.login.get('emailInput');}
get passwordInput(){return this.login.get('passwordInput');}

  constructor(private authService:AuthenticationService,
              private router:Router) { 

  

}  
ngOnInit(): void {
  this.user= JSON.parse(localStorage.getItem('UserData'));
   
  if(this.user){
      this.router.navigate(['/home']);
  }
  }
  getPaswordErrorMessage() {
    
    if (this.passwordInput.hasError('required')) {
      return 'Debe Ingresar un Valor';
    }
  
    return this.passwordInput.hasError('minlength') ? 'Debe tener al menos 6 Caracteres' : '';
  }
   getErrorMessage() {
    if (this.emailInput.hasError('required')) {
      return 'Debe Ingresar un Valor';
    }
  
    return this.emailInput.hasError('email') ? 'Ingrese un Mail Valido' : '';
  }
  
     
  
      async loadUser(){
        this.authService.loginEmailUser(this.email, this.password)
        .then(() => {
          this.loading=true;
          
          setTimeout(() => {
            console.log('cargando...');
            this.router.navigate(['/my-panel']);
            // this.user= this.authService.otrouser;
            //console.log(this.user);
           
          
            
          }, 2000);
  
         
          
         
  
        }).catch((error) => {
            // console.log(error);
            this.loading=false;
            this.errorMessage=error;
            this.error=true;
            //alert('El usuario no esta registrado.');
        });
      }
}
