import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('departmentChart') departmentChart!: ElementRef;
  @ViewChild('salaryChart') salaryChart!: ElementRef;
  @ViewChild('payrollChart') payrollChart!: ElementRef;

  totalEmployees: number = 0;
  loading: boolean = true;
  error: string | null = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  ngAfterViewInit(): void {
    // Charts will be initialized after data is fetched
  }

  private fetchDashboardData(): void {
    this.loading = true;
    this.dashboardService.getEmployeeStats().subscribe({
      next: (data) => {
        this.totalEmployees = data.totalEmployees;
        this.initializeCharts(data);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading dashboard data';
        this.loading = false;
        console.error('Dashboard error:', error);
      }
    });
  }

  private initializeCharts(data: any): void {
    this.createDepartmentChart(data.departmentDistribution);
    this.createSalaryRangeChart(data.salaryRanges);
    this.createPayrollChart(data.monthlyPayroll);
  }

  private createDepartmentChart(departmentData: any): void {
    const labels = Object.keys(departmentData);
    const values = Object.values(departmentData);

    new Chart(this.departmentChart.nativeElement, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right'
          },
          title: {
            display: true,
            text: 'Department Distribution'
          }
        }
      }
    });
  }

  private createSalaryRangeChart(salaryData: any): void {
    const labels = Object.keys(salaryData);
    const values = Object.values(salaryData);

    new Chart(this.salaryChart.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Employees',
          data: values,
          backgroundColor: '#36A2EB'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Salary Distribution'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }

  private createPayrollChart(payrollData: number[]): void {
    const labels = Array(6).fill(0).map((_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - i));
      return date.toLocaleString('default', { month: 'short' });
    });

    new Chart(this.payrollChart.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Monthly Payroll',
          data: payrollData,
          borderColor: '#4BC0C0',
          tension: 0.1,
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Monthly Payroll Trend'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
