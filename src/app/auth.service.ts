import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { UserIn } from 'src/app/user/user.model'; // optional

import * as firebase from 'firebase'
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { log } from 'util';
import { UserInterface } from './user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<any>(`usuario/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );

  }
  //user: UserInterface;

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

        this.router.navigate(['/home']);
      }
    }).catch(error=>{

      console.log(error);

    });

  }

  private updateUserData(user) {
    //Establece los datos del usuario en firestore al iniciar sesión
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usuario/${user.uid}`);
    const data: UserInterface ={
      uid: user.uid,
      correo: user.email,
      nombre: user.displayName,
      rol:{
        usuario: true
      }
    }
    return userRef.set(data, { merge: true })

  }
  isUseradministrador(userUid){
    return this.afs.doc<UserInterface>(`usuario/${userUid}`).valueChanges();
  }

  async signOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    })
  }
  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }


  async deleteUser(){
    var user = firebase.auth().currentUser;
    user.delete().then(function() {
      // User deleted.
    }).catch(function(error) {
      // An error happened.
    });
  }


}