import { Component, Input, OnInit } from '@angular/core';
import { BookDto, User } from 'src/app/components/shared/clientSwagger/onlineLibrary.client';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor() { }

  @Input() items : User[] = [];
  @Input() title : string = '';
  @Input() description : string = '';
  @Input() show : boolean = true;
  showDetail : boolean = false;

  ngOnInit(): void {
  }

  public SwitchStatus(status : number | undefined) : string {
    if(status == 1)
      return "En ligne";
    if(status == 2)
      return "Hors ligne";

    return "bloqué"
  }

  showModal(){
    this.showDetail = true;
  }

  closeModal(event : boolean) : boolean {
    this.showDetail = event;
    return false;
  }

  validateModal(event : boolean) {
    this.showDetail = false;
  }

}
