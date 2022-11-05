import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Entities/material/material.module';
import { NavbarComponent } from './Views/navbar/navbar.component';
import { EmployeeComponent } from './Views/employee/employee.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeAddComponent } from './Views/employee/employee-add/employee-add.component';
import { MovementComponent } from './Views/movement/movement.component';
import { MovementAddComponent } from './Views/movement/movement-add/movement-add.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmployeeComponent,
    EmployeeAddComponent,
    MovementComponent,
    MovementAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
