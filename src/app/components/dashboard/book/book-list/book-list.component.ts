import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BookDto } from 'src/app/components/shared/clientSwagger/onlineLibrary.client';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  @Input() items : BookDto[] = [];
  @Input() title : string = '';
  @Input() description : string = '';
  @Input() show : boolean = true;
  bookDto: BookDto = new BookDto();

  showFormAdd : boolean = false;
  showDetail : boolean = false;
  showSpinner : boolean = false;
  pageSlice :  BookDto[] = this.items.slice(0, 5);
  endIndex: number = 0;
  isAuthorForm: boolean = false;
  isBookForm: boolean = false;
  isBookUploadForm: boolean = false;

  ngOnInit(): void {
    if(this.items.length > 0){
      this.pageSlice = this.items.slice(0, 5);
    }
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
    if(this.endIndex > this.items.length){
      this.endIndex = this.items.length;
    }

    this.pageSlice = this.items.slice(startIndex, this.endIndex);
  }

}
