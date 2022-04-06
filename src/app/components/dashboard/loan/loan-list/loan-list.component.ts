import { Component, Input, OnInit } from '@angular/core';
import { BookDto, LoanDto } from '../../../shared/clientSwagger/onlineLibrary.client';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit {

  constructor() { }

  @Input() items : LoanDto[] = [];
  @Input() loan : LoanDto = new LoanDto();
  @Input() title : string = '';
  @Input() description : string = '';
  @Input() show : boolean = true;
  showDetail : boolean = false;

  ngOnInit(): void {
  }

  showModal(item: LoanDto){
    this.loan = item;
    this.showDetail = true;
  }

  closeModal(event : boolean) : boolean {
    this.showDetail = event;
    return false;
  }

  validateModal(event : boolean) {
    this.showDetail = false;
  }

  public SwitchStatus(status : number | undefined) : string {
    if(status == 1)
      return "En pret";

      return "Rendu";
  }
}
