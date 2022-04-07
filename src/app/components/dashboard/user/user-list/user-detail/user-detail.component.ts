import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User, UserDto } from 'src/app/components/shared/clientSwagger/onlineLibrary.client';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnChanges {

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.item?.id){
      this.showSpinner = false;
    }else{
      this.showSpinner = true;
    }
    console.log(this.item)
  }

  @Input() item: UserDto = new User();
  showSpinner: boolean = true;
  @Input() title: string = '';
  description: string = '' ;

  ngOnInit(): void {
  }

}
