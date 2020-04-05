import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editarobjeto',
  templateUrl: './editarobjeto.component.html',
  styleUrls: ['./editarobjeto.component.css']
})
export class EditarobjetoComponent implements OnInit {

  optionValue: string;
  options: any[] = [
    { id: 1, name: 'Elije una opción' },
    { id: 2, name: 'Reportado' },
    { id: 3, name: 'Entregado' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
