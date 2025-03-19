import { ChartOptions } from '@/app/common/apexchart.model'
import { Component } from '@angular/core'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'app-report',
  imports: [NgApexchartsModule, NgbDropdownModule],
  templateUrl: './report.component.html',
  styles: ``,
})
export class ReportComponent {
  ReportChart: Partial<ChartOptions> = {
    series: [
      {
        name: 'Income',
        data: [2.7, 2.2, 1.3, 2.5, 1, 2.5, 1.2, 1.2, 2.7, 1, 3.6, 2.1],
      },
      {
        name: 'Expense',
        data: [
          -2.3, -1.9, -1, -2.1, -1.3, -2.2, -1.1, -2.3, -2.8, -1.1, -2.5, -1.5,
        ],
      },
    ],
    chart: {
      toolbar: {
        show: false,
      },
      type: 'bar',
      fontFamily: 'inherit',
      foreColor: '#adb0bb',
      height: 370,
      stacked: true,
      offsetX: -15,
      zoom: {
        allowMouseWheelZoom: false,
      },
    },
    colors: ['var(--bs-success)', 'rgba(155, 171, 187, .25)'],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '80%',
        columnWidth: '20%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      show: true,
      strokeDashArray: 3,
      padding: {
        top: 0,
        bottom: 0,
        right: 0,
      },
      borderColor: 'rgba(0,0,0,0.05)',
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      min: -5,
      max: 5,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    // yaxis: {
    //   tickAApprox: 4,
    //   labels: {
    //     show: true,
    //     formatter: function (val) {
    //       return "$" + val + "k";
    //     }
    //   }
    // },
  }
}
