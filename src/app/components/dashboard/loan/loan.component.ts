import { Component, OnInit } from '@angular/core';
import { LoanDto } from '../../shared/clientSwagger/onlineLibrary.client';
import { OnlineLibraryService } from '../../shared/services/online-library.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {

  constructor(private onlineLibraryService: OnlineLibraryService) { }

  ngOnInit(): void {
    this.getLoans();
  }

  loanList : LoanDto[] = [];

  public async getLoans() {
    this.onlineLibraryService.getAllLoans()
      .then(x => {
        this.loanList = x;
        console.log(this.loanList)
      })
      .catch(x => console.log(x));
  }

}
