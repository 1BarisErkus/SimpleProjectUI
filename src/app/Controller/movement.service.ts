import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movement } from '../Models/movement';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  constructor(
    private http: HttpClient
  ) { }

  apiUrl = 'http://localhost:5044/Movement/';

  getMovements(id: number = 0) {
    return this.http.get<Movement[]>(this.apiUrl + '?id=' + id);
  }

  // searchMovement(txt: string){
  //   return this.http.get<Movement[]>(this.apiUrl + 'search?txt=' + txt)
  // }

  deleteMovement(movement: Movement) {
    return this.http.post(this.apiUrl + 'delete', movement);
  }

  addMovement(movement: Movement){
    return this.http.post(this.apiUrl + 'add', movement);
  }

  updateMovement(movement: Movement){
    return this.http.put(this.apiUrl, movement);
  }

}
