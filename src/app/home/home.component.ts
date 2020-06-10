import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service'
import { AuthService } from './../auth.service';
import { MessagingService } from "../service/messaging.service";
import { ModalService } from '../service/modal.service';

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
    private messagingService: MessagingService, private modalService : ModalService) {
    // this.getCategoriasjeje();
  }

  ngOnInit() {
    const userId = 'user001';
    this.messagingService.requestPermission(userId)
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
    this.bodyText = 'This text can be updated in modal 1';
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
