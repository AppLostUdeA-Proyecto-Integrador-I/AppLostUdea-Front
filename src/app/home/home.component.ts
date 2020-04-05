import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service'
import { AuthService } from './../auth.service';
import { MessagingService } from "../service/messaging.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data;
  message;
  show : boolean = true;


  constructor(private apiService: ApiServiceService, public auth: AuthService, private messagingService: MessagingService) {
    // this.getCategoriasjeje();
  }

  ngOnInit() {
    const userId = 'user001';
    this.messagingService.requestPermission(userId)
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
  }

  // getCategoriasjeje() {
  //   this.apiService.getCategories().subscribe(res =>{
  //     this.data = res;
  //     console.log(this.data)
  //   })
  // }

}
