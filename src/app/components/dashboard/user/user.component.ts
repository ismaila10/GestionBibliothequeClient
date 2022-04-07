import { Component, OnInit } from '@angular/core';
import { User, UserDto } from '../../shared/clientSwagger/onlineLibrary.client';
import { OnlineLibraryService } from '../../shared/services/online-library.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private onlineLibraryService: OnlineLibraryService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  userList : UserDto[] = [];

  public async getUsers() {
    this.onlineLibraryService.getAllUsers()
      .then(x => {
        this.userList = x;
        console.log(this.userList)
      })
      .catch(x => console.log(x));
  }

}
