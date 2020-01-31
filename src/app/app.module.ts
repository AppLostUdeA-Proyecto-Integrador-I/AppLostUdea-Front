import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EncontreObjetoComponent } from './encontreobjeto/encontreobjeto.component';
import { BuscarObjetoComponent } from './buscarobjeto/buscarobjeto.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

// importar los módulos que planeamos usar en nuestra aplicación Auth and Firestor
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

// agregar las credenciales de la BD
const config = {
   apiKey: "AIzaSyBYT6m9DxhHDGwPCggZxvCGy-Nn1x6y-6c",
   authDomain: "findmylost-5250f.firebaseapp.com",
   databaseURL: "https://findmylost-5250f.firebaseio.com",
   projectId: "findmylost-5250f",
   storageBucket: "findmylost-5250f.appspot.com",
   messagingSenderId: "810726371318",
   appId: "1:810726371318:web:7c93cd501eadab3a6161d7",
   measurementId: "G-9MTTLS7R7P"
};

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      LoginComponent,
      EncontreObjetoComponent,
      BuscarObjetoComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      MDBBootstrapModule.forRoot(),
      //Initialize
     AngularFireModule.initializeApp(config),
     AngularFirestoreModule, // firestore
     AngularFireAuthModule, // auth
     AngularFireStorageModule // storage

   ],
  // declarations: [AppComponent],
   providers: [],
   bootstrap: [
      AppComponent
   ]})
export class AppModule { }

