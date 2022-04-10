import { Component, OnInit } from '@angular/core';
import { BookDto } from '../../shared/clientSwagger/onlineLibrary.client';
import { OnlineLibraryService } from '../../shared/services/online-library.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  constructor(private onlineLibraryService: OnlineLibraryService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  bookList : BookDto[] = [];

  public async getBooks() {
    await this.onlineLibraryService.getAllBooks()
      .then(x => {
        this.bookList = x;
        console.log(this.bookList)
      })
      .catch(x => console.log(x));
  }

}
