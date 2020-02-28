import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data;

  constructor(private apiService: ApiServiceService) {
    this.getCategoriasjeje();
  }

  ngOnInit() {
  }

  getCategoriasjeje() {
    this.apiService.getCategories().subscribe(res =>{
      this.data = res;
      console.log(this.data)
    })
  }

}
