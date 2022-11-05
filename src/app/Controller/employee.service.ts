import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
  ) { }

  apiUrl = 'http://localhost:5044/Employee/';

  getEmployees(id: number = 0) {
    return this.http.get<Employee[]>(this.apiUrl + '?id=' + id.toString());
  }

  searchEmployee(txt: string){
    return this.http.get<Employee[]>(this.apiUrl + 'search?txt=' + txt)
  }

  deleteEmployee(employee: Employee) {
    return this.http.post(this.apiUrl + 'delete', employee);
  }

  addEmployee(employee: Employee){
    return this.http.post(this.apiUrl + 'add', employee);
  }

  updateEmployee(employee: Employee){
    return this.http.put(this.apiUrl, employee);
  }

}
