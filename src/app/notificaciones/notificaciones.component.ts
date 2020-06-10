import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../service/notification.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './../auth.service';

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

  constructor(private notificationService: NotificationService,private angularFireAuth: AngularFireAuth
    , private auth: AuthService) { }

  ngOnInit() {
    this.auth.isAuth().subscribe(isauth => {
      if (isauth) {
        this.notificationService.getNotifications(isauth.email).subscribe(data =>{
          this.notifications = data['notificaciones']
        })
      }
    })


  }

}
