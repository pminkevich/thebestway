import { Component, OnInit } from '@angular/core';
import { Usuario } from './models/user';
import { VersionApp } from './models/version';
import { AuthenticationService } from './service/authentication.service';
import { VersionService } from './service/version.service';


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
  versionData:VersionApp= new VersionApp() ;
  newVersion:boolean=false;
  constructor(private as:AuthenticationService,
              private vs:VersionService){
   
  }
  ngOnInit(): void {
    this.as.usuario.subscribe(resp=>{
     
       this.user=resp;
     
    })
    this.vs.getVersion().subscribe(resp=>{
      if(resp.exists){
  const version= JSON.stringify(resp.data());
   this.versionData=JSON.parse(version);
  console.log(this.versionData.id);
  const versionLocal= localStorage.getItem('AppVersion');
  const userExist= localStorage.getItem('UserData');
  
  if(userExist){
    if(this.versionData.id!== versionLocal){
  
      this.as.signOut();
      localStorage.setItem('AppVersion', this.versionData.id);
      this.newVersion=true;
    }
  }else{
    localStorage.setItem('AppVersion', this.versionData.id);
  }
  
  
  
      }
    });
  }
  logOut(){
    this.as.signOut();
  }

  closeViewVersion(){
    this.newVersion=false;
  }
  
}
