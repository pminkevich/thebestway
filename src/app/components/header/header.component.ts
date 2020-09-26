import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() userLevel:number;
  show:boolean=false;
  user:Usuario=new Usuario();
  imageUrl:string='../../../assets/icons/perfil.jpg';
  @Output() toggleSidenav= new EventEmitter<void>()
  @Output() logOutEvent=new EventEmitter<void>()

  constructor(private as:AuthenticationService,
              private route:Router) { }

  ngOnInit(): void {
   this.user=JSON.parse(localStorage.getItem('UserData'));
   if(this.user){
    this.imageUrl=this.user.photoURL;
   }
   
  }
  onToggleSidenav(): void{
    this.toggleSidenav.emit();
  }
  logOut(){
    this.logOutEvent.emit();
    this.show=false;
  }
  viewMenu(){
    this.show=!this.show;
    if(this.show){
      setTimeout(() => {
        
             this.show=false;
        
      }, 10000);
    }
  }

}
