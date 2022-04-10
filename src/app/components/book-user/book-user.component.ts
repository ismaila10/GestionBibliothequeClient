import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BookDto } from '../shared/clientSwagger/onlineLibrary.client';
import { OnlineLibraryService } from '../shared/services/online-library.service';

@Component({
  selector: 'app-book-user',
  templateUrl: './book-user.component.html',
  styleUrls: ['./book-user.component.scss']
})
export class BookUserComponent implements OnInit {

  constructor(private onlineLibraryService: OnlineLibraryService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  bookList : BookDto[] = [];
  filteredBooks : BookDto[] = [];
  _bookFilter = '';
  showSpinner: boolean = false;

  public async getBooks() {
    this.showSpinner = true;
    this.onlineLibraryService.getAllBooks()
      .then(x => {
        this.bookList = x;
        this.filteredBooks = this.bookList;
        this.showSpinner = false;
      })
      .catch(x => console.log(x));
      this.showSpinner = false;
  }

  public get bookFilter(): string {
    return this._bookFilter;
  }

  public set bookFilter(filter: string) {
    this._bookFilter = filter;

    this.filteredBooks = this.bookFilter ? this.filterBooks(this.bookFilter) : this.bookList;
  }

  private filterBooks(criteria: string): BookDto[] {
    criteria = criteria.toLocaleLowerCase();

    const response = this.bookList.filter(x =>
      x?.title.toLocaleLowerCase().indexOf(criteria) != -1
      );
    return response;
  }

  onPageChange(event: PageEvent) {}

}
