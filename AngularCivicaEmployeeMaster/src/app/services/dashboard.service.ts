import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Employee {
  id: number;
  department: string;
  salary: number;
}

interface DepartmentDistribution {
  [key: string]: number;
}

interface SalaryRanges {
  '0-30k': number;
  '30k-50k': number;
  '50k-80k': number;
  '80k+': number;
}

interface EmployeeStats {
  totalEmployees: number;
  departmentDistribution: DepartmentDistribution;
  salaryRanges: SalaryRanges;
  monthlyPayroll: number[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://localhost:5000/api'; // Update this with your actual API URL

  constructor(private http: HttpClient) { }

  getEmployeeStats(): Observable<EmployeeStats> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employees`).pipe(
      map((employees: Employee[]) => {
        return {
          totalEmployees: employees.length,
          departmentDistribution: this.getDepartmentDistribution(employees),
          salaryRanges: this.getSalaryRanges(employees),
          monthlyPayroll: this.getMonthlyPayroll(employees)
        };
      })
    );
  }

  private getDepartmentDistribution(employees: Employee[]): DepartmentDistribution {
    const departments: DepartmentDistribution = {};
    employees.forEach(emp => {
      if (departments[emp.department]) {
        departments[emp.department]++;
      } else {
        departments[emp.department] = 1;
      }
    });
    return departments;
  }

  private getSalaryRanges(employees: Employee[]): SalaryRanges {
    const ranges: SalaryRanges = {
      '0-30k': 0,
      '30k-50k': 0,
      '50k-80k': 0,
      '80k+': 0
    };

    employees.forEach(emp => {
      const salary = emp.salary;
      if (salary <= 30000) ranges['0-30k']++;
      else if (salary <= 50000) ranges['30k-50k']++;
      else if (salary <= 80000) ranges['50k-80k']++;
      else ranges['80k+']++;
    });

    return ranges;
  }

  private getMonthlyPayroll(employees: Employee[]): number[] {
    // Mock monthly payroll data for the last 6 months
    return Array(6).fill(0).map(() => 
      employees.reduce((sum, emp) => sum + emp.salary, 0)
    );
  }
} 