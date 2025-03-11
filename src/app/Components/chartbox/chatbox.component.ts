import { Component } from '@angular/core';
import { Chart, ChartConfiguration, registerables, TooltipItem, Point } from 'chart.js';

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [],
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChartboxComponent {

  revenueChart!: Chart<"line", (number | Point | null)[], unknown>;

  constructor() { }

  ngOnInit(): void {
    // Register Chart.js components
    Chart.register(...registerables);

    // Initial chart data for "Month" view
    const initialData = this.getMonthlyData();

    // Chart configuration
    const config: ChartConfiguration<'line', (number | Point | null)[], unknown> = {
      type: 'line',
      data: initialData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value: number | string) {
                return '' + value + ' ft';
              }
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(tooltipItem: TooltipItem<'line'>) {
                return 'Steps: ' + tooltipItem.formattedValue + ' ft';
              }
            }
          }
        }
      }
    };

    // Render the chart
    const chartContext = document.getElementById('revenueChart') as HTMLCanvasElement;
    this.revenueChart = new Chart(chartContext, config);
  }

  // Update the chart based on the selected timeframe
  updateChart(timeframe: string): void {
    switch (timeframe) {
      case 'today':
        this.revenueChart.data = this.getTodayData();
        break;
      case 'week':
        this.revenueChart.data = this.getWeeklyData();
        break;
      case 'month':
        this.revenueChart.data = this.getMonthlyData();
        break;
      case 'year':
        this.revenueChart.data = this.getYearlyData();
        break;
    }
    this.revenueChart.update();
  }

  // Example data for each timeframe
  getTodayData() {
    return {
      labels: ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM'],
      datasets: [{
        label: 'Steps Today',
        data: [300, 500, 450, 600, 700, 800, 750],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        fill: true
      }]
    };
  }

  getWeeklyData() {
    return {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [{
        label: 'Steps This Week',
        data: [5000, 7000, 6500, 7200, 5800, 9000, 7800],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        fill: true
      }]
    };
  }

  getMonthlyData() {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'Steps This Month',
        data: [46470, 50500, 77780, 40000, 30000, 25000, 50000],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
        fill: true
      }]
    };
  }

  getYearlyData() {
    return {
      labels: ['2020', '2021', '2022', '2023'],
      datasets: [{
        label: 'Steps This Year',
        data: [450000, 500000, 470000, 320000],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderWidth: 2,
        fill: true
      }]
    };
  }
}
