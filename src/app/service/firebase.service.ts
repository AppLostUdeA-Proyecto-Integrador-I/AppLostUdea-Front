import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface } from '../modelos/user';
import { Observable } from 'rxjs';
import { database } from 'firebase';

@Injectable()
export class FirebaseService {
    collectionName = 'usuario';
    userDocument : AngularFirestoreDocument<UserInterface>;
    user : Observable<UserInterface>;

    constructor(
        public firebase: AngularFirestore) { 
        }
    
        public async getUser(cedula: string){
            console.log("1")
            //Se busca el usuario en la base de datos
            this.userDocument = this.firebase.collection(this.collectionName).doc(cedula);
            //Se encarga de tomar el ID de los documentos en la base de datos.
            console.log("2")
            await this.userDocument.snapshotChanges().forEach(changes => {
                const data = changes.payload.data() as UserInterface;
                data.uid = changes.payload.id;
                console.log("98",data.rol.administrador)
                return data;
            });//return this.user
        }
}
