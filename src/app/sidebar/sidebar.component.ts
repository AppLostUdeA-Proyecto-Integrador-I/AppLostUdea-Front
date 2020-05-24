import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from 'src/app/modelos/user'; // optional


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  active = true;


  constructor(public afAuth: AngularFireAuth, public auth: AuthService, private authService: AuthService) {}
  public isadministrador: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getCurrentUser();
  }
  getCurrentUser(){
    this.authService.isAuth().subscribe(auth => {
      if(auth){
        this.userUid = auth.uid;
        this.authService.isUseradministrador(this.userUid).subscribe(userRole =>{
          this.isadministrador = Object.assign({}, userRole.rol);
          this.isadministrador = this.isadministrador.hasOwnProperty('administrador');
          //console.log("aqui:", this.isadministrador)
        })
      }
    })
  }
  showSidebar(){
    this.active = !this.active;
  }

}
