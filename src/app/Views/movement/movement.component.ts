import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MovementService } from 'src/app/Controller/movement.service';
import { Movement } from 'src/app/Models/movement';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent implements OnInit {

  constructor(
    private movementService: MovementService,
    private router: Router
  ) { }

  movements: Movement[] = [];
  displayedColumns: string[] = [];
  dataSource: any;
  selection: any;
  employeeIdForDetails: number = 0;

  ngOnInit(): void {
    this.employeeIdForDetails = Number(localStorage.getItem('employeeIdForDetails'));
    localStorage.removeItem('employeeIdForDetails');
    this.getMovements();
  }

  getMovements() {
      this.movementService.getMovements(this.employeeIdForDetails).subscribe((data) => {
        this.movements = data;
        this.displayedColumns = ['select', 'checkInTime', 'checkOutTime', 'inOut', 'departureTime', 'employeeRef', 'update-button', 'delete-button'];
        this.dataSource = new MatTableDataSource<Movement>(this.movements);
        this.selection = new SelectionModel<Movement>(true, []);
      });
  }

  deleteMovement(id: number) {
    this.movementService.deleteMovement({
      Id: id,
      CheckinTime: new Date(),
      CheckoutTime: new Date(),
      InOut: -1,
      DepartureTime: new Date(),
      EmployeeRef: -1
    }).subscribe({
      next: data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Kayıt Başarıyla Silindi.',
          showConfirmButton: false,
          timer: 1500
        })
        this.getMovements();
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

  updateMovement(id: number) {
    localStorage.setItem('movementIdForUpdate', id.toString());
    this.router.navigateByUrl('movement-add');
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
