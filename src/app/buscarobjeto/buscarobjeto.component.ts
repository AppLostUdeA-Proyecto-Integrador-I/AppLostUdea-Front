import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { ApiServiceService } from "../service/api-service.service";

@Component({
  selector: "app-buscarobjeto",
  templateUrl: "./buscarobjeto.component.html",
  styleUrls: ["./buscarobjeto.component.css"],
})
export class BuscarObjetoComponent implements OnInit {
  listaObjetos = [];
  listaCategorias = [];

  constructor(public afAuth: AngularFireAuth, public api: ApiServiceService) {}

  ngOnInit() {
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
