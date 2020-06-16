import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EncontreObjetoComponent } from './encontreobjeto/encontreobjeto.component';
import { BuscarObjetoComponent } from './buscarobjeto/buscarobjeto.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EditarobjetoComponent } from './editarobjeto/editarobjeto.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { NotificacionModalComponent } from './notificacion-modal/notificacion-modal.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'encontreobjeto',
    component: EncontreObjetoComponent
  },
  {
    path: 'buscarobjeto',
    component: BuscarObjetoComponent
  },
  {
    path: 'sidebar',
    component: SidebarComponent
  },
  {
    path: 'editarobjeto/:id',
    component: EditarobjetoComponent
  },
  {
    path: 'notificaciones',
    component: NotificacionesComponent
  },
  {
    path: 'estadisticas',
    component: EstadisticasComponent
  },
  {
    path: 'notificacion-modal',
    component: NotificacionModalComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
