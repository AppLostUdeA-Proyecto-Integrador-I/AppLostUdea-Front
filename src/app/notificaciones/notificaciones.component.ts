import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../service/notification.service';

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

  notifications = []

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
  this.notificationService.getNotifications("dolly.jimenez@udea.edu.co").subscribe(data =>{
    console.log(data['notificaciones'])
    this.notifications = data['notificaciones']
  })

  }

}
