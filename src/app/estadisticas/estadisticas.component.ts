import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js'
import { ApiServiceService } from '../service/api-service.service';
import { elementAt } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})

export class EstadisticasComponent implements OnInit {

  // Llevar a otro lado independiente
  colorList = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
  ]

  BAR_CHART_OPTIONS = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }

  // Función que añadirá colores al arreglo dependiendo de la carga de 
  // contenido que tenga la gráfica

  /* 
  Pasos:
   * Traer los datos (OK)
   * Crear los arreglos correspondientes (OK) 
   * Gráficas:
      - Pie: Cantidad vs Categoría (OK)
      - Barras: Cantidad vs Mes
   * Arreglo de colores correspondiente al número de objetos en la gráfica
   * Entregar las gráficas
   * Pintar (OK)
   * Refactor
  */
  
  listaCategorias = []
  array = []

  constructor(public api: ApiServiceService) { }

  ngOnInit() {
    const allObjects = this.api.getObjects()
    const allCategories = this.api.getCategories()

    var categoryAmount = [], uniqueCategoryId = [], categoryLabels = []

    combineLatest(allObjects, allCategories, (objects, categories) => ({objects, categories}))
    .subscribe(pair => {
      console.log("Objects: ", pair.objects)
      console.log("Categories: ", pair.categories)

      // Creamos un arreglo que toma todos los objetos
      // Y separa cada categoría
      pair.objects.forEach(element => {
        // Si el elemento ya existe en el discriminado de categorías
        // Se busca la posición en la que se almacena la cantidad y se suma 1
        if (uniqueCategoryId.includes(element.categoriasId)) {
          categoryAmount[uniqueCategoryId.indexOf(element.categoriasId)] += 1
        } else {
          // De lo contrario, se crea una nueva entrada y se inicia en 1
          uniqueCategoryId.push(element.categoriasId)
          categoryLabels.push(this.getCategoryNameById(element.categoriasId, pair.categories))
          categoryAmount.push(1)
        }
      });

      // Creamos la gráfica de dona
      this.createChart("pieChart", "doughnut", categoryLabels, "Cantidad por Categoría", categoryAmount, this.colorList)
    })
    

    // this.api.getObjects().subscribe((response: any) => {
    //   for (var item of response) {
    //     this.listaCategorias.push(item.nombre);
    //   }
    //   var myChart = new Chart("myChart", {
    //     type: 'doughnut',
    //     data: {
    //       labels: this.listaCategorias,
    //       datasets: [{
    //         label: '# of Votes',
    //         data: [12, 19, 3, 5, 2, 3],
    //         backgroundColor: this.colorList,
    //         borderWidth: 1
    //       }],
    //     },
    //   });
    //   console.log(response)
    // }, error => console.error(error));

    var myChart = new Chart("myChart2", {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        },
      ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  getCategoryNameById(id, categories) {
    for (var categoty of categories) {
      if (categoty.id === id)
        return categoty.nombre
    }
    return "N/A"
  }

  // Crea la tabla apartir de los parámetros entregados
  createChart(canvasId: any, chartType: String, labelList: String[], 
    chartLabel: String, data: Number[], colorList: String[], options: {} = {}) {
    return new Chart(canvasId, {
      type: chartType,
      data: {
        labels: labelList,
        datasets: [{
          label: chartLabel,
          data: data,
          backgroundColor: colorList,
          borderColor: colorList,
          borderWidth: 1
        }]
      },
      options: options
    });
  }

}
