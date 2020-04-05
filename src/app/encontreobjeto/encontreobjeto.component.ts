import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {ApiServiceService} from '../service/api-service.service';

@Component({
  selector: 'app-encontreobjeto',
  templateUrl: './encontreobjeto.component.html',
  styleUrls: ['./encontreobjeto.component.css']
})
export class EncontreObjetoComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth,public api: ApiServiceService) { }

  ngOnInit() {
  }

}
