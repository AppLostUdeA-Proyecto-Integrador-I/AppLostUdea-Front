import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EncontreObjetoComponent } from './encontreobjeto/encontreobjeto.component';
import { BuscarObjetoComponent } from './buscarobjeto/buscarobjeto.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

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
      MDBBootstrapModule.forRoot()
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
