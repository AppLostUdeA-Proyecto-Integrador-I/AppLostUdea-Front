import { Component, OnInit } from "@angular/core";
import { NotificationService } from "../service/notification.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "./../auth.service";
import { ApiServiceService } from "../service/api-service.service";

@Component({
  selector: "app-notificaciones",
  templateUrl: "./notificaciones.component.html",
  styleUrls: ["./notificaciones.component.css"],
})
export class NotificacionesComponent implements OnInit {
  notifications = [];
  filter = { paginacion: {} };
  limite = 3;

  constructor(
    private notificationService: NotificationService,
    private angularFireAuth: AngularFireAuth,
    private auth: AuthService
  ) {}

  //Retorna las notificaciones en caso de que el usuario este autenticado
  ngOnInit() {
    this.filter.paginacion = { limite: this.limite };
    this.auth.isAuth().subscribe(
      (isauth) => {
        if (isauth) {
          this.notificationService
            .getNotifications(isauth.email, this.filter)
            .subscribe(
              (data) => {
                this.notifications = data["notificaciones"];
              },
              (error) => console.log(error),
              () => {
                this.filter = { paginacion: {} };
              }
            );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getNextPage() {
    let ultimoObjeto = this.notifications[this.notifications.length - 1].id;
    this.filter.paginacion = {
      ultimoElemento: ultimoObjeto,
      limite: this.limite,
    };
    this.auth.isAuth().subscribe(
      (isauth) => {
        if (isauth) {
          this.notificationService
            .getNotifications(isauth.email, this.filter)
            .subscribe(
              (data) => {
                data["notificaciones"].forEach((notificacion) => {
                  this.notifications.push(notificacion);
                });
              },
              (error) => console.log(error),
              () => {
                this.filter = { paginacion: {} };
              }
            );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
