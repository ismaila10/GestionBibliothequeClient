import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Author, BookDto, Category } from '../../clientSwagger/onlineLibrary.client';
import { OnlineLibraryService } from '../../services/online-library.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit, OnChanges {

  constructor(
    private onlineLibraryService: OnlineLibraryService,
    private bookFormBuilder: FormBuilder) {
      this.bookForm = this.bookFormBuilder.group({
        category: [new Number(), [Validators.required]],
        author: [new Number(), [Validators.required]],
        title: [new String(), [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        quantity: [new Number, ''],
        publishingHouse: [new String, ''],
        publishDate: [new Date(), ''],
        description: [new String, ''],
        image: [new String(), '']
      });
    }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.item?.id){
      this.bookForm = this.formPatchValue();
    }
    if(this.submit){
      this.AddBook();
      this.submit = false;
    }
  }

  categories : Category[] = [];
  authors : Author[] = [];
  bookForm : any;
  bookInfos: BookDto = new BookDto();
  @Input() item : BookDto = new BookDto();
  isValidForm: boolean = true;
  @Input() submit : boolean = false;

  ngOnInit(): void {
    this.getCategories();
    if(this.item?.id){
      alert(this.item?.title)
    }
    this.isValidForm = true;
    this.formPatchValue;
    this.bookForm = this.formPatchValue();
    this.getAuthors();
  }

  formPatchValue(): FormGroup {
		return this.bookFormBuilder.group({
      category: this.item?.category?.id,
      author: this.item?.author?.id,
      title: this.item?.title,
      quantity: this.item?.quantity,
      publishingHouse: this.item?.publishingHouse,
      publishDate: this.item?.publishDate,
      description: this.item?.description,
      image: ''
    });
	}

  resetForm() {
    this.bookForm.reset();
  }

  public async getCategories(){
    this.onlineLibraryService.getAllCategories()
      .then(x => {
        this.categories = x;
      })
      .catch(x => console.log(x));
  }

  public async getAuthors(){
    this.onlineLibraryService.getAllAuthors()
      .then(x => {
        this.authors = x;
      })
      .catch(x => console.log(x));
  }

  public async AddBook(){
    if (this.bookForm.invalid) {
			console.log("Form invalid");
			alert("Form invalid");
      this.isValidForm = false;
      return;
		}
    console.log("author " + this.bookForm.value.author);
    console.log("categorie " + this.bookForm.value.category);
    await this.onlineLibraryService.getAuthorById(this.bookForm.value.author)
      .then(x => {
        this.bookInfos.author = x;
      })
      .catch(x => console.log(x));
    await this.onlineLibraryService.getCategoryById(this.bookForm.value.category)
      .then(x => {
        this.bookInfos.category = x;
      })
      .catch(x => console.log(x));

    this.bookInfos.title = this.bookForm.value?.title;
    this.bookInfos.description = this.bookForm.value?.description;
    this.bookInfos.image = this.bookForm.value?.image;
    this.bookInfos.publishDate = new Date(this.bookForm.value?.publishDate);
    this.bookInfos.publishingHouse = this.bookForm.value?.publishingHouse;
    this.bookInfos.quantity = this.bookForm.value?.quantity;

    console.log(this.bookInfos);
    this.onlineLibraryService.addBook(this.bookInfos)
      .then(x => {
        console.log(x + " ok insert");
      })
      .catch(x => {
        console.log(x + " Not ok insert");
      })
  }

}
