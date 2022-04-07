import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BookDto } from 'src/app/components/shared/clientSwagger/onlineLibrary.client';
import { OnlineLibraryService } from 'src/app/components/shared/services/online-library.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  constructor(private onlineLibraryService: OnlineLibraryService) {

  }
  itemBooks : BookDto[] = [];
  filteredBooks : BookDto[] = [];
  @Input() title : string = '';
  @Input() description : string = '';
  @Input() show : boolean = true;
  bookDto: BookDto = new BookDto();
  _bookFilter = '';
  showFormAdd : boolean = false;
  showDetail : boolean = false;
  showSpinner : boolean = false;
  pageSlice :  BookDto[] = [];
  endIndex: number = 0;
  isAuthorForm: boolean = false;
  isBookForm: boolean = false;
  isBookUploadForm: boolean = false;

  ngOnInit(): void {
    this.getBooks();
    this.bookFilter = ""
  }

  public async getBooks() {
    await this.onlineLibraryService.getAllBooks()
      .then(x => {
        this.itemBooks = x;
        this.filteredBooks = this.itemBooks;
        this.pageSlice = this.itemBooks.slice(0, 5);
      })
      .catch(x => console.log(x));
  }

  public get bookFilter(): string {
    return this._bookFilter;
  }

  public set bookFilter(filter: string) {
    this._bookFilter = filter;

    this.filteredBooks = this.bookFilter ? this.filterBooks(this.bookFilter) : this.itemBooks;
  }

  private filterBooks(criteria: string): BookDto[] {
    criteria = criteria.toLocaleLowerCase();

    const response = this.itemBooks.filter(x =>
      x?.title.toLocaleLowerCase().indexOf(criteria) != -1 ||
      x?.author?.firstName.toLocaleLowerCase().indexOf(criteria) != -1 ||
      x?.author?.lastName.toLocaleLowerCase().indexOf(criteria) != -1
      );
    return response;
  }

  showFormModal(isAuthorForm: boolean){
    if(isAuthorForm){
      this.isBookForm = false;
      this.isBookUploadForm = false;
      this.isAuthorForm = true;
      this.showFormAdd = true;
    }else {
      this.isAuthorForm = false;
      this.isBookUploadForm = false;
      this.isBookForm = true;
      this.showFormAdd = true;
    }
  }

  showUploadFormModal(){
    this.isAuthorForm = false;
    this.isBookForm = false;
    this.isBookUploadForm = true;
    this.showFormAdd = true;
  }

  showDetailModal(book : BookDto){
    this.bookDto = book;
    this.showDetail = true;
  }

  closeModal(event : boolean) : boolean {
    this.showFormAdd = event;
    this.showDetail = event;
    return false;
  }

  setBook(book : BookDto, isAuthorForm: boolean){
    this.bookDto = book;
    this.isAuthorForm = isAuthorForm;
    this.isBookForm = true;
    this.showFormAdd = true;
  }

  public SwitchStatus(status : number | undefined) : string {
    if(status == 1)
      return "Disponible";

      return "Rupture";
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    this.endIndex = startIndex + event.pageSize;

    if(this.endIndex > this.filteredBooks.length){
      this.endIndex = this.filteredBooks.length;
    }

    this.pageSlice = this.filteredBooks.slice(startIndex, this.endIndex);
  }

}
