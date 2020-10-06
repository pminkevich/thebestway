import{Injectable, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { VersionApp } from '../models/version';


@Injectable({
    providedIn: 'root'
})

export class VersionService implements OnInit{
    
    constructor(private fs:AngularFirestore){

    }
    
    
    ngOnInit(): void {
      
    }
 getVersion(){
     return  this.fs.doc<VersionApp>('version/release').get()
 }

}