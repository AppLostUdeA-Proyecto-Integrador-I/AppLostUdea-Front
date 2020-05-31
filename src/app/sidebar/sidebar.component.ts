import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './../auth.service';
import { permisos } from 'src/app/service/admin.service';
import { async } from '@angular/core/testing';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  active = true;

  constructor(public afAuth: AngularFireAuth,public api: ApiServiceService,private auth: AuthService) {console.log("estoy en el sidebar",afAuth.auth.currentUser)} //borrar mas tarde 
  public isadministrador: any = null;
  public userUid: string = null;
  public roles = new permisos(this.api)

  ngOnInit() {
    this.auth.isAuth().subscribe(isauth => {
      if (isauth) {
        this.userUid = isauth.uid
        this.getCurrentUser();
      }
    })
  }
  async getCurrentUser() {
    this.isadministrador = await this.roles.isAdmin(this.userUid)
  }
  showSidebar(){
    this.active = !this.active;
  }

}
