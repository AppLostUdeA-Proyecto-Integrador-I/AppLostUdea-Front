import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface } from '../modelos/user';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class FirebaseService {
    collectionName = 'usuario';
    //subCollectionName = 'Certificados';
    userDocument : AngularFirestoreDocument<UserInterface>;
    user : Observable<UserInterface>;

    constructor(
        public firebase: AngularFirestore) { 
        }
    
        public async getUser(cedula: string){
            console.log("2")
            //Se busca el usuario en la base de datos
            this.userDocument = this.firebase.collection(this.collectionName).doc(cedula);
            console.log("3",this.userDocument)
            //Se encarga de tomar el ID de los documentos en la base de datos.
            await this.userDocument.snapshotChanges().forEach(changes => {
                console.log("4")
                const data = changes.payload.data() as UserInterface;
                data.uid = changes.payload.id;
                console.log("98",data)
                return data;
            }) ;
        }

        // console.log("Retrieving list of documents in collection");
        // let documents = this.firebase.collection('usuario').doc(cedula).get()
        //     .map(snapshot => {
        //         snapshot.data(doc => {
        //             console.log("Parent Document ID: ", doc.id);

        //         });
        //     }).catch(err => {
        //         console.log("Error getting documents", err);
        //     });



}
