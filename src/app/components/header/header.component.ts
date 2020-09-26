import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() userLevel:number;
  show:boolean=false;
  @Output() toggleSidenav= new EventEmitter<void>()
  @Output() logOutEvent=new EventEmitter<void>()

  constructor(private as:AuthenticationService,
              private route:Router) { }

  ngOnInit(): void {
   
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
  }

}
