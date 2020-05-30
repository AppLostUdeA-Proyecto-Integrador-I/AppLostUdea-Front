import { OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from 'src/app/modelos/user';
import { ApiServiceService } from '../service/api-service.service';

export class permisos {

    public isadministrador: boolean = false;

    constructor(public afAuth: AngularFireAuth, private authService: AuthService, public api: ApiServiceService) { }

    async isAdmin(id) {
        //console.log("Tatiana2000", this.authService.isTatiana)
        await (await this.api.getUserById(id)).forEach(
            value =>{ this.isadministrador = value.rol.hasOwnProperty('administrador')

            console.log("el estado es",this.isadministrador)
        }
            
        )
        return this.isadministrador
    }

}