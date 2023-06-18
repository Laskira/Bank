import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
//My components
import { ListUsersComponent } from './components/list-users/list-users.component';
import { FormUsersComponent } from './components/form-users/form-users.component';
import { LoginComponent } from './components/login/login.component';
//Library
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SlideMenuModule } from 'primeng/slidemenu';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    FormUsersComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    InputTextModule,
    CalendarModule,
    SlideMenuModule,
    ToastModule,
    PasswordModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
