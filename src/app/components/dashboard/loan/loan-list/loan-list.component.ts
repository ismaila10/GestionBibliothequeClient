import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { OnlineLibraryService } from 'src/app/components/shared/services/online-library.service';
import { BookDto, LoanDto } from '../../../shared/clientSwagger/onlineLibrary.client';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit {

  constructor(private onlineLibraryService: OnlineLibraryService) { }

  @Input() items : LoanDto[] = [];
  @Input() loan : LoanDto = new LoanDto();
  @Input() title : string = '';
  @Input() description : string = '';
  @Input() show : boolean = true;
  showDetail : boolean = false;
  loanList : LoanDto[] = [];
  pageSlice :  LoanDto[] = [];
  endIndex: number = 0;

  ngOnInit(): void {
    this.getLoans();
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

  public async getLoans() {
    this.onlineLibraryService.getAllLoans()
      .then(x => {
        this.loanList = x;
        this.pageSlice = this.loanList.slice(0, 5);
      })
      .catch(x => console.log(x));
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    this.endIndex = startIndex + event.pageSize;

    if(this.endIndex > this.loanList.length){
      this.endIndex = this.loanList.length;
    }

    this.pageSlice = this.loanList.slice(startIndex, this.endIndex);
  }
}
