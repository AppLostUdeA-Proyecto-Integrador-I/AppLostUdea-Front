import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from 'src/app/user/user.model'; // optional


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
    console.log("llegaste hasta")
    this.authService.isAuth().subscribe(auth => {
      if(auth){
        console.log("llegaste hasta")
        this.userUid = auth.uid;
        console.log("llegas a 33")
        this.authService.isUseradministrador(this.userUid).subscribe(userRole =>{
          this.isadministrador = Object.assign({}, userRole.rol);
          console.log("llegas a 3")
          console.log(userRole.rol)
          this.isadministrador = this.isadministrador.hasOwnProperty('administrador');
        })
      }
    })
  }
  showSidebar(){
    this.active = !this.active;
  }

}
