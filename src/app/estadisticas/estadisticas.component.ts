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
    'rgba(255, 99, 132, 0.3)',
    'rgba(54, 162, 235, 0.3)',
    'rgba(255, 206, 86, 0.3)',
    'rgba(75, 192, 192, 0.3)',
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

  constructor(public api: ApiServiceService) { }

  ngOnInit() {
    const allObjects = this.api.getObjectsAll()
    const allCategories = this.api.getCategories()

    var statusAmount = [], uniqueStatus = []
    var categoryAmount = [], uniqueCategory = [], categoryLabels = []
    const monthsLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    var monthsAmount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    // Sincroniza las respuestas de ambas promesas para ejecutar una vez terminen
    combineLatest(allObjects, allCategories, (objects, categories) => ({objects, categories}))
    .subscribe(pair => {

      console.log("Objects: ", pair.objects)
      console.log("Categories: ", pair.categories)
      
      var currentYear = new Date().getFullYear()

      // Creamos un arreglo que toma todos los objetos
      // Y separa cada categoría
      pair.objects.forEach(element => {
        
        // Si el elemento ya existe en el discriminado de categorías
        // Se busca la posición en la que se almacena la cantidad y se suma 1
        if (uniqueStatus.includes(element.estado)) {
          statusAmount[uniqueStatus.indexOf(element.estado)] += 1
        } else {
          // De lo contrario, se crea una nueva entrada y se inicia en 1
          uniqueStatus.push(element.estado)
          statusAmount.push(1)
        }

        if (uniqueCategory.includes(element.categoriasId)) {
          categoryAmount[uniqueCategory.indexOf(element.categoriasId)] += 1
        } else {
          uniqueCategory.push(element.categoriasId)
          categoryLabels.push(this.getCategoryNameById(element.categoriasId, pair.categories))
          categoryAmount.push(1)
        }

        var dateSplit = element.fechaEncontrado.split('-', 3)
        if (dateSplit[0] == currentYear)
          monthsAmount[parseInt(dateSplit[1]) - 1] += 1
      });

      // Creamos la gráfica de dona
      this.createChart("pieChart", "doughnut", uniqueStatus, "Cantidad por Estado", statusAmount, this.createColors(statusAmount))

      // Creamos la gráfica de barras
      this.createChart("barChart", "bar", categoryLabels, "Cantidad por Categoría", categoryAmount, this.createColors(categoryAmount), true, this.BAR_CHART_OPTIONS)

      
      // Creamos la gráfica de lineas
      this.createChart("lineChart", "line", monthsLabels, "Cantidad por Mes", monthsAmount, this.createColors(monthsAmount), false)
    })
    
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
    chartLabel: String, data: Number[], colorList: String[], fill: boolean = true, options: {} = {}): Chart {
    return new Chart(canvasId, {
      type: chartType,
      data: {
        labels: labelList,
        datasets: [{
          label: chartLabel,
          data: data,
          backgroundColor: colorList,
          borderColor: colorList,
          borderWidth: 3,
          fill: fill
        }]
      },
      options: options
    });
  }

  createColors(data: Number[]){
    var colors = []
    var count = 0
    for (var i = 0; i < data.length; i++) {
      if (count % this.colorList.length == 0)
        count = 0    
      colors.push(this.colorList[count++])
    }
    console.log(colors)
    return colors
  }

}
