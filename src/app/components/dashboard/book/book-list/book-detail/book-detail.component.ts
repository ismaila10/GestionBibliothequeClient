import { SlicePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BookDto, Category } from 'src/app/components/shared/clientSwagger/onlineLibrary.client';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit, OnChanges {

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.item?.id){
      this.showSpinner = false;
    }else{
      this.showSpinner = true;
    }
    console.log("ngcontent on change => "+this.item.title)
  }

  @Input() item: BookDto = new BookDto();
  showSpinner: boolean = true;
  @Input() title: string = '';
  description: string = '' ;

  ngOnInit(): void {
  }

}
