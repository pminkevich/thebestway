import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/models/countries';
import { DataService } from 'src/app/service/data.service';
import {Relic} from '../../../models/relic';

@Component({
  selector: 'app-up-objects',
  templateUrl: './up-objects.component.html',
  styleUrls: ['./up-objects.component.css']
})
export class UpObjectsComponent implements OnInit {
  newObjectForm:FormGroup;
  relic:Relic;
 // countries: Country[];

  get name() {return this.newObjectForm.get('name');}
  get descripcion() { return this.newObjectForm.get('descripcion');}
  get madeIn() {return this.newObjectForm.get('madeIn');}
  get anio() {return this.newObjectForm.get('anio');}
  get valor() {return this.newObjectForm.get('valor');}


  constructor(private fb:FormBuilder,
              private ds:DataService) { }

  ngOnInit(): void {
    this.newObjectForm=this.fb.group({
      name: ['',Validators.required],
      descripcion:['',Validators.required],
      madeIn:['', Validators.required],
      anio:['',Validators.required],
      valor:['',Validators.required]

    })
  //  this.countries= this.getCountries();

  }
  loadObject(newRelic:Relic){
    
console.log(newRelic);
  }
  getCountries():Country[]{
 return this.ds.getCountries();
  }

}
