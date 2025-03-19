import { ChartOptions } from '@/app/common/apexchart.model'
import { Component } from '@angular/core'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'app-stats',
  imports: [NgApexchartsModule],
  templateUrl: './stats.component.html',
  styles: ``,
})
export class StatsComponent {
  statChart: Partial<ChartOptions> = {
    chart: {
      height: 205,
      type: 'donut',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },

    series: [50, 25],
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      floating: false,
      fontSize: '13px',
      fontFamily: 'Be Vietnam Pro, sans-serif',
      offsetX: 0,
      offsetY: 0,
    },
    labels: ['Ingresos', 'Egresos'],
    colors: ['#2b3eb1', '#fc7100'],

    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            donut: {
              customScale: 0.2,
            },
          },
          chart: {
            height: 240,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    tooltip: {
      y: {
        formatter: function (val) {
          return val + ' %'
        },
      },
    },
  }
}
