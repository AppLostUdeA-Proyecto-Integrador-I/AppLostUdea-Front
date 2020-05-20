import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EncontreObjetoComponent } from './encontreobjeto/encontreobjeto.component';
import { BuscarObjetoComponent } from './buscarobjeto/buscarobjeto.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// importar los módulos que planeamos usar en nuestra aplicación Auth and Firestor
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { EditarobjetoComponent } from './editarobjeto/editarobjeto.component';
import { AuthService } from './auth.service';
import { MessagingService } from './service/messaging.service';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { UserService } from './service/user.service';
import { NotificationService } from './service/notification.service';


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
      BuscarObjetoComponent,
      SidebarComponent,
      EditarobjetoComponent,
      NotificacionesComponent,
      EstadisticasComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      //Initialize
     AngularFireModule.initializeApp(config),
     AngularFirestoreModule, // firestore
     AngularFireAuthModule, // auth
     AngularFireStorageModule, // storage
     AngularFireMessagingModule,//messagging
      RouterModule,
      MDBBootstrapModule.forRoot(),
      HttpClientModule
   ],
   providers: [MessagingService, AsyncPipe,UserService,NotificationService],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

