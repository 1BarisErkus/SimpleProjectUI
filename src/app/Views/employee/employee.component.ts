import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/Controller/employee.service';
import { Employee } from 'src/app/Models/employee';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
  ) { }

  employees: Employee[] = [];
  displayedColumns: string[] = [];
  dataSource: any;
  selection: any;
  txtInput: string = "";

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(txt: string = "") {
    //* Eğer gelen bir değer varsa filtrele 
    if (txt) {
      this.employeeService.searchEmployee(txt).subscribe({
        next: data => {
          this.employees = data;
          this.dataSource = new MatTableDataSource<Employee>(this.employees);
        },
        error: error => {

        }
      });
    }
    //* Gelen bir değer yoksa tümünü yazdır.
    else {
      this.employeeService.getEmployees().subscribe((data) => {
        this.employees = data;
        this.displayedColumns = ['select', 'name', 'mission', 'age', 'salary', 'update-button', 'delete-button', 'details-button'];
        this.dataSource = new MatTableDataSource<Employee>(this.employees);
        this.selection = new SelectionModel<Employee>(true, []);
      });
    }
  }


  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee({
      Id: id,
      Name: '',
      Mission: '',
      Age: 0,
      Salary: 0
    }).subscribe({
      next: data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Kayıt Başarıyla Silindi.',
          showConfirmButton: false,
          timer: 1500
        })
        this.getEmployees();
      },
      error: error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Bir şeyler ters gitti',
        })
      }
    });
  }

  updateEmployee(id: number) {
    localStorage.setItem('employeeIdForUpdate', id.toString());
    this.router.navigateByUrl('employee-add');
  }

  detailsEmployee(id: number) {
    localStorage.setItem('employeeIdForDetails', id.toString());
    this.router.navigateByUrl('movement');
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

}
