import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service'
import { AuthService } from './../auth.service';
import { MessagingService } from "../service/messaging.service";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificacionModalComponent } from '../notificacion-modal/notificacion-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data;
  message;
  private bodyText: string;



  constructor(private apiService: ApiServiceService, public auth: AuthService,
    private messagingService: MessagingService, private matDialog: MatDialog) {
    // this.getCategoriasjeje();
  }

  ngOnInit() {
    const userId = 'user001';
    this.messagingService.requestPermission(userId)
    this.messagingService.receiveMessage()
     this.messagingService.currentMessage.subscribe( data =>{
       if(data && data.notification){
         console.log(data.notification)
          this.openModal(data.notification)
       }
     })
  }

  openModal(notificacion:any) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      body:notificacion.body
    }
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(NotificacionModalComponent, dialogConfig);
  }

}
