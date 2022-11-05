import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { async } from 'rxjs';
import { EmployeeService } from 'src/app/Controller/employee.service';
import { Employee } from 'src/app/Models/employee';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  constructor(
    private employeeService: EmployeeService
  ) { }

  employee = new Employee();
  employeeRef = 0;

  ngOnInit(): void {
    this.employeeRef = Number(localStorage.getItem('employeeIdForUpdate'));
    localStorage.removeItem('employeeIdForUpdate');
    if (this.employeeRef > 0) {
      this.getEmployee();
    }
  }

  formGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    mission: new FormControl(''),
    age: new FormControl(''),
    salary: new FormControl(''),
  });

  modelToForm() {
    this.formGroup.controls.id.setValue(this.employee.Id.toString());
    this.formGroup.controls.name.setValue(this.employee.Name);
    this.formGroup.controls.mission.setValue(this.employee.Mission);
    this.formGroup.controls.age.setValue(this.employee.Age.toString());
    this.formGroup.controls.salary.setValue(this.employee.Salary.toString());
  }

  formToModel() {
    this.employee.Id = Number(this.formGroup.controls.id.value);
    this.employee.Name = this.formGroup.controls.name.value || '';
    this.employee.Mission = this.formGroup.controls.mission.value || '';
    this.employee.Age = Number(this.formGroup.controls.age.value);
    this.employee.Salary = Number(this.formGroup.controls.salary.value);
  }

  clearInputs() {
    this.formGroup.controls.name.setValue("");
    this.formGroup.controls.mission.setValue("");
    this.formGroup.controls.age.setValue("");
    this.formGroup.controls.salary.setValue("");
  }

  updateEmployee() {
    this.formToModel();
    this.employeeService.updateEmployee(this.employee).subscribe({
      next: result => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Kayıt Düzenlendi',
          showConfirmButton: false,
          timer: 1500
        })
        this.clearInputs();
      },
      error: error => {
        Swal.fire(
          'Kayıt Düzenleme Başarısız',
          error.error,
          'error');
      }
    });
  }

  addEmployee() {
    this.formToModel();
    this.employeeService.addEmployee(this.employee).subscribe({
      next: result => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Kayıt Başarıyla eklendi.',
          showConfirmButton: false,
          timer: 1500
        })
        this.clearInputs();
      },
      error: error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Bir şeyler ters gitti',
        })
      }
    })
  }

  add_update() {
    if (this.employeeRef > 0) {
      this.updateEmployee();
    } else {
      this.addEmployee();
    }
  }

  yazdir(){
    console.log(this.employee);
  }

  async getEmployee() {
    await this.employeeService.getEmployees(this.employeeRef)
      .subscribe({
        next: data => {
          this.employee = data[0];
          console.log(this.employee);
          this.modelToForm()
        },
        error: error => {
        }
      });
      this.yazdir();
  }
}
