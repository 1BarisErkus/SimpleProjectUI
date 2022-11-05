import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { 
    this.localText = NavbarComponent.text;
    this.localLink = NavbarComponent.link;
  }

   localText = '';
   localLink = '';

  static text: string = 'Add Employee ->';
  static link: string = 'employee-add';

  ngOnInit(): void {
  }

}
