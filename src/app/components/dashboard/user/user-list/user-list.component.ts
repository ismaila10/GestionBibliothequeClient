import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BookDto, User, UserDto } from 'src/app/components/shared/clientSwagger/onlineLibrary.client';
import { OnlineLibraryService } from 'src/app/components/shared/services/online-library.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private onlineLibraryService: OnlineLibraryService) { }
  
  userList : UserDto[] = [];
  @Input() user : UserDto = new User();
  @Input() title : string = '';
  @Input() description : string = '';
  @Input() show : boolean = true;
  pageSlice :  UserDto[] = [];
  endIndex: number = 0;
  isNotif: boolean = false;
  showDetail : boolean = false;

  ngOnInit(): void {
    this.getUsers()
    console.log(this.pageSlice)
  }

  public async getUsers() {
    this.onlineLibraryService.getAllUsers()
      .then(x => {
        this.userList = x;
        this.pageSlice = this.userList.slice(0, 5);
      })
      .catch(x => console.log(x));
  }

  public SwitchStatus(status : number | undefined) : string {
    if(status == 1)
      return "En ligne";
    if(status == 2)
      return "Hors ligne";

    return "bloqué"
  }

  showModal(item: User){
    this.showDetail = true;
    this.user = item;
  }

  closeModal(event : boolean) : boolean {
    this.showDetail = event;
    return false;
  }

  validateModal(event : boolean) {
    this.showDetail = false;
  }

  bloquer() {
    this.isNotif = true;
    setTimeout(() => {
      this.isNotif = false;
    }, 7000);
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    this.endIndex = startIndex + event.pageSize;

    if(this.endIndex > this.userList.length){
      this.endIndex = this.userList.length;
    }

    this.pageSlice = this.userList.slice(startIndex, this.endIndex);
  }

}
