import { Component, Input, OnInit } from '@angular/core';
import { BookDto } from '../../../clientSwagger/onlineLibrary.client';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  constructor() { }

  show: boolean = false;

  ngOnInit(): void {
  }

  menu : any[] = [
    { id:1,link: "dashboard/", title: "DashBoard", icon:'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'},
    { id:2,link: "dashboard/book", title: "Livres", icon:'M4 6h16M4 10h16M4 14h16M4 18h16' },
    { id:3,link: "dashboard/loan", title: "Prets", icon:'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id:4,link: "dashboard/user", title: "Utilisateurs", icon:'M4 6h16M4 10h16M4 14h16M4 18h16' }
  ]


  public showDrop() {
    this.show = !this.show;
  }

}
