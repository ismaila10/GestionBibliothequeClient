import { Component, Input, OnInit } from '@angular/core';
import { UserDto } from 'src/app/components/shared/clientSwagger/onlineLibrary.client';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  constructor() { }

  @Input() user: UserDto = new UserDto()

  ngOnInit(): void {
  }

}
