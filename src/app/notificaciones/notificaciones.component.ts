import { Component, OnInit } from '@angular/core';

interface Country {
  titulo: string;
  descripcion: string;
  fecha: number;
}



@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  COUNTRIES: Country[] = [
    {
      titulo: 'Nuevo Objeto',
      descripcion: 'Se ha reportado un nuevo objeto encontrado',
      fecha: 17075200,
    },
    {
      titulo: 'Objeto reclamado',
      descripcion: 'Se ha reclamado un objeto que registraste',
      fecha: 9976140,
    },
    {
      titulo: 'Nuevo Objeto',
      descripcion: 'Se ha reportado un nuevo objeto encontrado',
      fecha: 9629091,
    },
    {
      titulo: 'Objeto reclamado',
      descripcion: 'Se ha reclamado un objeto que registraste',
      fecha: 9596960,
    }
  ];



  constructor() { }

  ngOnInit() {
  }

}
