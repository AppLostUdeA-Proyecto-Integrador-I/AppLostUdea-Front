import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/modelos/user';
import * as firebase from 'firebase';
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
          return this.afs.doc<any>(`usuario/${user.uid}`).valueChanges();
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
      //passed, stringified email login
      var emailString = user.email;
      //the domain you want to whitelist
      var yourDomain = '@udea.edu.co';
      //check the x amount of characters including and after @ symbol of passed user login.
      //This means '@google.com' must be the final set of characters in the attempted login
      var domain = emailString.substr(emailString.length - yourDomain.length);
      //I send the user back to the login screen if domain does not match
      if (domain != yourDomain) {
        alert("Solo se permite correo institucional udea")
        this.deleteUser()

      }
      else {
        this.updateUserData(result.user);
        const lastLogin = result.user.metadata.creationTime
        const lastSignedInAt = result.user.metadata.lastSignInTime
        console.log(lastSignedInAt)
        console.log(lastLogin)
        this.router.navigate(['/home']);
      }
    }).catch(error => {

      console.log(error);

    });

  }
  updateUserData(user) {

    const userRef: AngularFirestoreDocument<UserInterface> = this.afs.doc(`usuario/${user.uid}`);
    const data: UserInterface = {
      uid: user.uid,
      correo: user.email,
      nombre: user.displayName,
      permiteNotificaciones: true,
      rol: {
        usuario: true
      }
    }
    return userRef.set(data, { merge: true })
  }

  isUseradministrador(userUid) {
    return this.afs.doc<UserInterface>(`usuario/${userUid}`).valueChanges();
  }
  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  async signOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    })
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
