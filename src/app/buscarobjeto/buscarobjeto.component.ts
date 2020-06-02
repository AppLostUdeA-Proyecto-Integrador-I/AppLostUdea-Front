import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';
import { AuthService } from '../auth.service'
import { permisos } from 'src/app/service/admin.service';
import { async } from '@angular/core/testing';

@Component({
  selector: "app-buscarobjeto",
  templateUrl: "./buscarobjeto.component.html",
  styleUrls: ["./buscarobjeto.component.css"],
})
export class BuscarObjetoComponent implements OnInit {
  listaObjetos = [];
  listaCategorias = [];
  public isadministrador: any = null;
  public userUid: string = null;
  public roles = new permisos(this.api)

  constructor(public api: ApiServiceService, public authService: AuthService) { }

  ngOnInit() {

    this.authService.isAuth().subscribe(isauth => {
      if (isauth) {
        this.userUid = isauth.uid
        this.getCurrentUser();
      }
    })

    this.api.getCategories().subscribe(
      (response: any) => {
        this.listaCategorias = response;
      },
      (error) => console.error(error)
    );

    this.api.getObjects(null,null).subscribe(
      (response: any) => {
        this.listaObjetos = response;
      },
      (error) => console.error(error)
    );

  }

  async getCurrentUser() {
    this.isadministrador = await this.roles.isAdmin(this.userUid)
  }


  onSubmit(formData) {
    console.log(formData)
    let filter = { filtros: [] };
    let idObjeto = null;
    //Filtro por categoria
    if (formData.categoriasId) {
      let categoryFilter = { categoriasId: { "==": formData.categoriasId } };
      filter.filtros.push(categoryFilter);
    }
    //filtro por estado
    if (formData.estado) {
      let estadoFilter = { estado: { "==": formData.estado } };
      filter.filtros.push(estadoFilter);
    }
    //filtro por fecha
    if(formData.fechaInicial && formData.fechaFinal){
      let fechaInicialFilter = { fechaEncontrado: { ">=": formData.fechaInicial } };
      filter.filtros.push(fechaInicialFilter);
      let fechaFinalFilter = { fechaEncontrado: { "<=": formData.fechaFinal } };
      filter.filtros.push(fechaFinalFilter);
    }
    //filtro por id del objeto
    if (formData.idObjeto) {
      console.log(formData.idObjeto)
      idObjeto = formData.idObjeto
      filter = null
    }

    console.log(JSON.stringify(filter))
    //llama al provider getObjects
    this.api.getObjects(filter,idObjeto).subscribe(
      (response: any) => {
        if(response instanceof Array){
          this.listaObjetos = response;
        }else{
          this.listaObjetos = [response];
        }

      },
      (error) => console.error(error)
    );
  }
}
