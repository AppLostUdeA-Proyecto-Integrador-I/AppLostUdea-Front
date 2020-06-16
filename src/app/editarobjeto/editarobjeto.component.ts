import { Component, OnInit } from '@angular/core';
import { Objeto } from '../modelos/Objeto';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-editarobjeto',
  templateUrl: './editarobjeto.component.html',
  styleUrls: ['./editarobjeto.component.css']
})



export class EditarobjetoComponent implements OnInit {


  optionValue: string;
  options: any[] = [
    //{ id: 1, name: 'Elije una opción' },
    { id: 1, name: 'Reportado' },
    { id: 2, name: 'Entregado' },
  ];

  public usuario: any = null;
  public categoria: any = null;
  public isObjeto : Objeto
  params : Subscription

  constructor(private route: ActivatedRoute,public api: ApiServiceService,) {
    
   }

  ngOnInit() {
    this.params = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        console.log("paulini4",id)
        this.api.getObjects2(id).subscribe(
          (response: any) => {
            console.log("response1",response)
            this.isObjeto = response;
            this.getUser();
            this.getCategoria();
          },
          (error) => console.error(error)
        );// consulta al api
      }
    });
  }

  async getUser() {
    await ( this.api.getUserById(this.isObjeto.usuariosId)).forEach(
      value =>{ this.usuario = value
  }     
  )}

  async getCategoria() {
    await ( this.api.getCategories2(this.isObjeto.categoriasId)).forEach(
      value1 =>{ this.categoria = value1
  }     
  )}
}
