import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  autenticate:boolean=false;
  
  constructor(private as:AuthenticationService) { }

  ngOnInit(): void {
   this.as.isAuthenticated().subscribe(resp=>{
     console.log(resp);
     if(resp){
      this.autenticate=true;
     }
     else{
       this.autenticate=false;
     }
   })
  }

}
