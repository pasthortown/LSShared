import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-institution-admin',
  templateUrl: './institution-admin.component.html',
  styleUrls: ['./institution-admin.component.scss']
})
export class InstitutionAdminComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
  
  }
}
