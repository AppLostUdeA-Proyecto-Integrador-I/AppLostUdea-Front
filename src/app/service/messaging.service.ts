import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs'
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../service/user.service';

@Injectable()
export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(
    private angularFireDB: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging,
    private userService:UserService) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }

  /**
   * update token in firebase database
   *
   * @param userId userId as a key
   * @param token token as a value
   */
  updateToken(userId, token) {
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(
      () => {
        const data = {};
        console.log(data);
        if (token!=undefined && token!=null){
        data[userId] = token
        this.userService.UpdateToken({
          valor: data[userId],
          usuarioId: this.angularFireAuth.auth.currentUser.email
        }).subscribe(res => {
          console.log(res);
        });

        //this.angularFireDB.collection('fcmTokens').add(data)
      }
      })
  }

  /**
   * request permission for notification from firebase cloud messaging
   *
   * @param userId userId
   */
  requestPermission(userId) {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        this.updateToken(userId, token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        //console.log("nuevo mensaje recibido ", payload);
        this.currentMessage.next(payload);
      },
      (err) => {
        console.error('Unable to get message', err);
      })
  }
}
