import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/modelos/user'; // optional

import * as firebase from 'firebase'
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { log } from 'util';
import { permisos } from 'src/app/service/admin.service';
import { ApiServiceService } from './service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public api: ApiServiceService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );

  }
  public roles = new permisos(this.api)

  async googleSignin() { //Activa la ventana emergente de inicio de sesión de Google y autentica al usuario
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    await firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token.
      //var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      //validacion de correo univercitario
      // si lo quiere hacer mas bonito llame un metodo que lo valide y retorne un booleano
      //passed, stringified email login
      var emailString = user.email;
      //the domain you want to whitelist
      var yourDomain = '@udea.edu.co';
      //check the x amount of characters including and after @ symbol of passed user login.
      //This means '@google.com' must be the final set of characters in the attempted login 
      var domain = emailString.substr(emailString.length - yourDomain.length);
      //I send the user back to the login screen if domain does not match 
      if (domain != yourDomain) {
        //buscar como borrar de la base de datos :V
        alert("te dije que con correo de la U")
        this.deleteUser()

      }
      else {
        this.updateUserData(result.user);
        const lastLogin = result.user.metadata.creationTime

        //const b = user.metadata['b'] // <- Typescript does not allow '.' operator
        //console.log(`${ user.email } last logged in ${ lastLogin } (${ b }).`)
        const lastSignedInAt = result.user.metadata.lastSignInTime
        console.log(lastSignedInAt)
        console.log(lastLogin)
        this.router.navigate(['/home']);
      }
    }).catch(error => {

      console.log(error);

    });

  }
  async updateUserData(user) {
    //Verificar si el usuario es un administrador
    const admin = await this.roles.isAdmin(user.uid)
    if (admin == false) {
      //Establece los datos del usuario en firestore al iniciar sesión
      const userRef: AngularFirestoreDocument<UserInterface> = this.afs.doc(`usuario/${user.uid}`);
      const data: UserInterface = {
        uid: user.uid,
        correo: user.email,
        nombre: user.displayName,
        rol: {
          usuario: true
        }
      }
      return userRef.set(data, { merge: true })
    }
  }

  isUseradministrador(userUid) {
    //console.log("Tatiana2",this.afs.doc<UserInterface>(`usuario/${userUid}`).valueChanges())
    return this.afs.doc<UserInterface>(`usuario/${userUid}`).valueChanges();
  }
  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  async signOut() {
    //await this.afAuth.auth.signOut();  
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    })
    //this.router.navigate(['']);
  }

  async deleteUser() {
    var user = firebase.auth().currentUser;
    user.delete().then(function () {
      // User deleted.
    }).catch(function (error) {
      // An error happened.
    });
  }



}