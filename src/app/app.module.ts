import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import{MatInputModule} from'@angular/material/input';
import{MatFormFieldModule} from '@angular/material/form-field';
import { AuthenticationService } from './service/authentication.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { TutorialComponent } from './components/pages/tutorial/tutorial.component';
import { SeeObjectsComponent } from './components/shared/see-objects/see-objects.component';
import { MyAccountComponent } from './components/users/my-account/my-account.component';
import { MyPanelComponent } from './components/users/my-panel/my-panel.component';
import { UpObjectsComponent } from './components/objects/up-objects/up-objects.component';

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
  {path: 'upload', component:UpObjectsComponent}

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
    UpObjectsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    RouterModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
    
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
