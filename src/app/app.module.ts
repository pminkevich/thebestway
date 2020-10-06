//modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule} from '@angular/fire/firestore';

//MODULOS MATERIAL
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import{MatInputModule} from'@angular/material/input';
import{MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';


//COMPONENTES PROPIOS

import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { TutorialComponent } from './components/pages/tutorial/tutorial.component';
import { SeeObjectsComponent } from './components/shared/see-objects/see-objects.component';
import { MyAccountComponent } from './components/users/my-account/my-account.component';
import { MyPanelComponent } from './components/users/my-panel/my-panel.component';
import { UpObjectsComponent } from './components/objects/up-objects/up-objects.component';
import { ReleaseComponent } from './components/release/release.component';

//SERVICIOS
import {AuthenticationService } from './service/authentication.service';
import {VersionService} from './service/version.service';
import{DataService} from './service/data.service';
import {BaulService} from './service/baul.service';
import {RelicService} from './service/relic.service';
import {RoomService} from './service/room.service';

//entorno
import { environment } from 'src/environments/environment';


const appRoutes:Routes = [
  {path: '', redirectTo:'/home', pathMatch: 'full'},
  //hacer redirec
  //{path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'welcome', component:WelcomeComponent},
  {path:'my-panel', component:MyPanelComponent},
  {path:'my-account', component:MyAccountComponent},
  {path:'objects', component:SeeObjectsComponent},
  {path: 'upload', component:UpObjectsComponent},
  {path:'tutorial', component:TutorialComponent}

];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    WelcomeComponent,
    TutorialComponent,
    SeeObjectsComponent,
    MyAccountComponent,
    MyPanelComponent,
    UpObjectsComponent,
    ReleaseComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    //modulos material
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    //************* */
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  
    
  ],
  providers: [AuthenticationService,
              VersionService,
              DataService,
              BaulService,
              RelicService,
              RoomService],
              // {provide: BUCKET, useValue:'gs://thebestway-fc5e3.appspot.com'}],
  bootstrap: [AppComponent]
 
})
export class AppModule { }
