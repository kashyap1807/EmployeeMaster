import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/helpers/auth.service';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './components/employee/update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonthlysalaryreportComponent } from './components/reports/monthlysalaryreport/monthlysalaryreport.component';
import { YearlysalaryreportComponent } from './components/reports/yearlysalaryreport/yearlysalaryreport.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaxdeductionmonthlyreportComponent } from './components/reports/taxdeductionmonthlyreport/taxdeductionmonthlyreport.component';
import { TaxdeductionemployeemonthlyreportComponent } from './components/reports/taxdeductionemployeemonthlyreport/taxdeductionemployeemonthlyreport.component';
import { TaxdeductionemployeemonthlyreportresultComponent } from './components/reports/taxdeductionemployeemonthlyreportresult/taxdeductionemployeemonthlyreportresult.component';
import { MonthlyeachemployeeComponent } from './components/reports/monthlyeachemployee/monthlyeachemployee.component';
import { EachemployeesalaryslipmonthlyComponent } from './components/reports/eachemployeesalaryslipmonthly/eachemployeesalaryslipmonthly.component';
import { YearlyeachemployeesalaryComponent } from './components/reports/yearlyeachemployeesalary/yearlyeachemployeesalary.component';
import { HomeComponent } from './components/home/home.component';
import { ReportdeciderComponent } from './components/shared/reportdecider/reportdecider.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    SignupComponent,
    SigninComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    FooterComponent,
    NavbarComponent,
    PrivacyComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    EmployeeDetailsComponent,
    MonthlysalaryreportComponent,
    MonthlyeachemployeeComponent,
    EachemployeesalaryslipmonthlyComponent,
    YearlysalaryreportComponent,
    TaxdeductionmonthlyreportComponent,
    TaxdeductionemployeemonthlyreportComponent,
    TaxdeductionemployeemonthlyreportresultComponent,
    YearlyeachemployeesalaryComponent,
    HomeComponent,
    ReportdeciderComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [DatePipe,TitleCasePipe,AuthService,{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
