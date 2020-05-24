import { OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from 'src/app/modelos/user';

export class permisos {

    constructor(public afAuth: AngularFireAuth, private authService: AuthService) { }
    public isadministrador: any = null;
    public userUid: string = null;

    isAdmin = async function () {
        let auth = await this.authService.isAuth().subscribe()
        console.log("holi",auth)
        if (auth) {
            this.userUid = auth.uid;
            console.log("este primerito",this.userUid)

        }


        //comprobar si el usuario esta logueado
        // await this.authService.isAuth().subscribe(auth => {
        //     if (auth) {
        //         this.userUid = auth.uid;
        //         console.log("este primerito")

        //     }
        // })
        console.log("este segundo")
        let x = await this.authService.isUseradministrador(this.userUid).subscribe(userRole => {
            console.log("este tercero", userRole)
            this.isadministrador = Object.assign({}, userRole.rol); //comprobar si en el objeto existe la propiedad isadministrador
            this.isadministrador = this.isadministrador.hasOwnProperty('administrador'); //comprobar con hasOwnPropert la propiedad isadministrador
        })
        console.log("este cuarto")
    }

}