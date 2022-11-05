import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAddComponent } from './Views/employee/employee-add/employee-add.component';
import { EmployeeComponent } from './Views/employee/employee.component';
import { MovementAddComponent } from './Views/movement/movement-add/movement-add.component';
import { MovementComponent } from './Views/movement/movement.component';

const routes: Routes = [
  {
    path: 'employee-add',
    component: EmployeeAddComponent
  },
  {
    path: 'employee',
    component: EmployeeComponent
  },
  {
    path: 'movement-add',
    component: MovementAddComponent
  },
  {
    path: 'movement',
    component: MovementComponent
  },
  {
    path: '**',
    component: EmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
