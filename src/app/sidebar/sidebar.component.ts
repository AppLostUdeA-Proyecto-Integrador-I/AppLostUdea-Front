import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  active = true;


  constructor(public afAuth: AngularFireAuth, public auth: AuthService) {}

  ngOnInit() {
  }
  showSidebar(){
    this.active = !this.active;
  }

}
