import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
import { authGuard } from './guards/auth.guard';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { UpdateEmployeeComponent } from './components/employee/update-employee/update-employee.component';
import { MonthlysalaryreportComponent } from './components/reports/monthlysalaryreport/monthlysalaryreport.component';
import { YearlysalaryreportComponent } from './components/reports/yearlysalaryreport/yearlysalaryreport.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MonthlyeachemployeeComponent } from './components/reports/monthlyeachemployee/monthlyeachemployee.component';
import { EachemployeesalaryslipmonthlyComponent } from './components/reports/eachemployeesalaryslipmonthly/eachemployeesalaryslipmonthly.component';
import { TaxdeductionmonthlyreportComponent } from './components/reports/taxdeductionmonthlyreport/taxdeductionmonthlyreport.component';
import { TaxdeductionemployeemonthlyreportComponent } from './components/reports/taxdeductionemployeemonthlyreport/taxdeductionemployeemonthlyreport.component';
import { TaxdeductionemployeemonthlyreportresultComponent } from './components/reports/taxdeductionemployeemonthlyreportresult/taxdeductionemployeemonthlyreportresult.component';
import { YearlyeachemployeesalaryComponent } from './components/reports/yearlyeachemployeesalary/yearlyeachemployeesalary.component';
import { HomeComponent } from './components/home/home.component';
import { ReportdeciderComponent } from './components/shared/reportdecider/reportdecider.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: 'employee', component: EmployeeListComponent },
    { path: 'employee/addemployee', component: AddEmployeeComponent , canActivate: [authGuard]},
    { path: 'employee/employeedetails/:employeeId', component: EmployeeDetailsComponent , canActivate: [authGuard]},
    { path: 'employee/updateemployee/:employeeId', component: UpdateEmployeeComponent , canActivate: [authGuard]},
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'forgotpassword', component: ForgotPasswordComponent },
    { path: 'changepassword', component: ChangePasswordComponent, canActivate: [authGuard] },
    {path:'monthlysalaryreport', component:MonthlysalaryreportComponent},
    {path:'yearlysalaryreport', component:YearlysalaryreportComponent},
    {path:'textdeductionreport',component:TaxdeductionmonthlyreportComponent},
    {path:'textdeductionemployeereport',component:TaxdeductionemployeemonthlyreportComponent},
    {path:'textmontalyeachemployee/:employeeId',component:TaxdeductionemployeemonthlyreportresultComponent},
    { path: 'reportdecider/:reportDeciderVal', component: ReportdeciderComponent, canActivate: [authGuard] },

    
    {path:'monthlyeachemployee', component:MonthlyeachemployeeComponent},
    {path:'eachemployeesalaryslip/:employeeId', component:EachemployeesalaryslipmonthlyComponent},
    {path:'yearlyeachemployeesalary/:employeeId',component:YearlyeachemployeesalaryComponent},
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }
];




@NgModule({
  imports: [RouterModule.forRoot(routes),NgbDropdownModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
