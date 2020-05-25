import { OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from 'src/app/modelos/user';
import { ApiServiceService } from '../service/api-service.service';

export class permisos {

    public isadministrador: boolean = false;

    constructor(public afAuth: AngularFireAuth, private authService: AuthService, public api: ApiServiceService) { }

    async isAdmin() {
        await this.api.getUserById("1imlDcwDiqemutYvo6cOq3w26DU2").subscribe(
            value => this.isadministrador = value.rol.hasOwnProperty('administrador')
        )
    }

}