import { Component, OnInit } from '@angular/core';
import { Usuario } from './models/user';
import { AuthenticationService } from './service/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'thebestway';
  showFiller = false;
  autenticate:boolean=false;
  user:Usuario=new Usuario();
  constructor(private as:AuthenticationService){
   
  }
  ngOnInit(): void {
    this.as.usuario.subscribe(resp=>{
     
       this.user=resp;
     
    })
  }
  logOut(){
    this.as.signOut();
  }

  
  
}
