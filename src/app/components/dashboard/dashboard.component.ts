import { Component, OnInit } from '@angular/core';
import { Statistique } from 'src/app/interfaces/statistiques';
import { BookDto, Loan, LoanDto, User } from '../shared/clientSwagger/onlineLibrary.client';
import { OnlineLibraryService } from '../shared/services/online-library.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private onlineLibraryService: OnlineLibraryService) { }

  bookStats : Statistique[] = [];
  userStats : Statistique[] = [];
  loanStats : Statistique[] = [];
  books : BookDto[] = [];
  loans : LoanDto[] = [];
  users : User[] = [];

  icons : any = [
    { value: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", crease: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" },
    { value: "M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76", crease: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" },
    { value: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122", crease: "M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" }
  ];

  ngOnInit(): void {
    this.getStatistiques();
  }

  public async getStatistiques(){
    await this.onlineLibraryService.getAllBooks()
      .then(x => {
        this.books = x;
        this.bookStats.push({title: "Total Livres", stat: this.books.length+'', icon: "https://cdn-icons-png.flaticon.com/512/1191/1191642.png"});

        this.bookStats.push({title: "Livre en pret", stat: this.books.filter(x => x.status == 1).length+'', icon: "https://cdn-icons-png.flaticon.com/512/1191/1191642.png"});
        let prc = this.books.filter(x => x.status == 1).length/this.books.length *100;

        this.bookStats.push({title: "Pourcentge de livres en pret", stat: prc+'%', icon: "https://cdn-icons-png.flaticon.com/512/1191/1191642.png"});
      })
      .catch(x => console.log(x));

    await this.onlineLibraryService.getAllLoans()
      .then(x => {
        this.loans = x;
        this.loanStats.push({title: "Total Pret", stat: this.loans.length+'', icon: "https://cdn-icons-png.flaticon.com/512/1719/1719275.png"});

        this.loanStats.push({title: "Pret en cours", stat: this.loans.filter(x => x.status == 1).length+'', icon: "https://cdn-icons-png.flaticon.com/512/1719/1719275.png"});
        let prc = this.loans.filter(x => x.status == 1).length/this.loans.length *100;

        this.loanStats.push({title: "Pourcentage pret en cours", stat: prc+'%', icon: "https://cdn-icons-png.flaticon.com/512/1719/1719275.png"});
      })
      .catch(x => console.log(x))

    await this.onlineLibraryService.getAllUsers()
      .then(x => {
        this.users = x;
        this.userStats.push({title: "Total Utilisateur", stat: this.users.length+'', icon: "https://cdn-icons.flaticon.com/png/512/998/premium/998392.png?token=exp=1648993289~hmac=9181aaf91a4b2fb9a3549921150d78dc"});

        this.userStats.push({title: "Utilisateur Connecté", stat: this.users.filter(x => x.status == 1).length+'', icon: "https://cdn-icons.flaticon.com/png/512/998/premium/998392.png?token=exp=1648993289~hmac=9181aaf91a4b2fb9a3549921150d78dc"});
        let prc = this.users.filter(x => x.status == 1).length/this.users.length *100;

        this.userStats.push({title: "Pourcentage d'utilisateur Connecté", stat: prc+'%', icon: "https://cdn-icons.flaticon.com/png/512/998/premium/998392.png?token=exp=1648993289~hmac=9181aaf91a4b2fb9a3549921150d78dc"});
      })
      .catch(x => console.log(x))
  }

}
