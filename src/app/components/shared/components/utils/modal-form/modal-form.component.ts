import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Author, BookDto, Category, FileParameter } from '../../../clientSwagger/onlineLibrary.client';
import { OnlineLibraryService } from '../../../services/online-library.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit, OnChanges {

  constructor(
    private onlineLibraryService: OnlineLibraryService,
    private bookFormBuilder: FormBuilder,
    private authorFormBuilder: FormBuilder
  ) {
    this.bookForm = this.bookFormBuilder.group({
      category: [this.item?.category?.id, [Validators.required]],
      author: [this.item?.author?.id, [Validators.required]],
      title: [this.item?.title, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      quantity: [this.item?.quantity, ''],
      publishingHouse: [this.item?.publishingHouse, ''],
      publishDate: [this.item?.publishDate, ''],
      description: [this.item?.description, ''],
      image: [new String(), '']
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getAuthors();
    this.getCategories();
    console.log(this.item);
    if(this.item?.id){
      this.bookForm = this.formPatchValue()
      //this.showUpdateValue = false;
    }
    console.log(this.bookForm.get('author')?.value);
    console.log(this.bookForm.get('category')?.value);
  }

  @ViewChild('file') fileInputVariable: ElementRef = <ElementRef>{};
  @Input() showModal : boolean = true;
  @Input() isAuthorForm : boolean = false;
  @Input() isBookForm : boolean = false;
  @Input() isUploadForm : boolean = false;
  @Input() item : BookDto = new BookDto();
  @Input() showModalAnnuler : boolean = false;
  @Input() title : string = '';
  @Input() buttonTitle : string = 'Valider';
  @Input() taille : string = 'w-1/2';
  @Output() isCloseModal : EventEmitter<boolean> = new EventEmitter();
  @Output() isValidateModal : EventEmitter<boolean> = new EventEmitter();

  classTaille : string = '';
  message : string = '';
  isNotif: boolean = false;
  showSpinner : boolean = false;
  isSubmit: boolean = false;
  categories : Category[] = [];
  authors : Author[] = [];
  bookForm : any;
  file : File = <File>{};
  authorForm : FormGroup = this.formAuthorPatchValue();
  bookInfos: BookDto = new BookDto();
  authorInfos: Author = new Author();
  isValidForm: boolean = true;
  showUpdateValue: boolean = true;
  isFormatHasError: boolean = false;
  isFileUploaded: boolean = false;
  isReadyToRunProcess: boolean = false;
  isFileHeaderCorrect: boolean = false;
  isFileSuccess: boolean = true;
  fileValidHeader : Array<string> = [];
  errorMessage: string = '';
  isProcessSuccessed: boolean = true;

  ngOnInit(): void {

    this.getCategories();
    if(this.item?.id){
      alert(this.item?.title)
    }
    this.showSpinner = false;
    this.isValidForm = true;
    this.formPatchValue;
    this.bookForm = this.formPatchValue();
    this.authorForm = this.formAuthorPatchValue();
    this.getAuthors();
    this.classTaille = `relative ${this.taille} pt-3 my-6 mx-auto max-w-6xl`;
    this.isFileUploaded = false;
    this.isFormatHasError = false;
    this.isReadyToRunProcess = false;
    this.isFileHeaderCorrect = true;
    this.isFileSuccess = true;
  }

  formPatchValue(): FormGroup {
		return this.bookFormBuilder.group({
      category: [this.item?.category?.id, [Validators.required]],
      author: [this.item?.author?.id, [Validators.required]],
      title: [this.item?.title, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      quantity: [this.item?.quantity, ''],
      publishingHouse: [this.item?.publishingHouse, ''],
      publishDate: [this.item?.publishDate, ''],
      description: [this.item?.description, ''],
      image: [new String(), '']
    });
	}

  formAuthorPatchValue(): FormGroup {
    return this.authorFormBuilder.group({
      firstName: [new String(), [Validators.required]],
      lastName: [new String(), [Validators.required]],
      country: [new String(), ''],
      birthDay: [new Date(), '']
    });
  }

  onFileSelected(event: any) {
    this.resetForm();
    this.file = event.target.files[0];
    if(!this.file.name){
      this.fileInputVariable.nativeElement.value = "";
      return;
    }
    this.isReadyToRunProcess = true;
    this.fileValidHeader = ["titre", "maison_de_publication", "quantite", "statut", "description", "image", "date_de_publication", "prenom_auteur", "nom_auteur", "nationalite_auteur", "categorie"];
    this.checkHeaderFile(this.file, this.fileValidHeader);
  }

  private checkHeaderFile (fileToUpload : File, validHeader : Array<string>) : void {
		const reader = new FileReader();
		reader.readAsText(fileToUpload);
		reader.onload = () => {
			const csvData = reader.result;
			const csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
			const headersRow : Array<string> = this.getHeaderArray(csvRecordsArray);

			const equals = (a : any, b : any) : boolean => JSON.stringify(a) === JSON.stringify(b);
      const b = equals(headersRow, validHeader);
			if (!equals(headersRow, validHeader)) {
        this.errorMessage = "Les en-têtes du fichier chargé ne sont pas conformes";
        this.isFileHeaderCorrect = false;
        setTimeout(() => {
          this.isFileHeaderCorrect = true;
        }, 5000);
				this.isReadyToRunProcess = false;
			}
		};
	}

  private getHeaderArray(csvRecordsArr: Array<string>) : Array<string> {
		const headers = (<string>csvRecordsArr[0]).split(';');
		const headerArray = [];
		for (let j = 0; j < headers.length; j++) {
			headerArray.push(headers[j]);
		}
		return headerArray;
	}

  resetForm() {
    this.bookForm.reset();
    this.authorForm.reset();
    this.isFileUploaded = false;
    this.isFormatHasError = false;
    this.isFileSuccess = true;
    this.isReadyToRunProcess = false;
    this.showSpinner = false;
    this.isFileHeaderCorrect = true;
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

  closeModal() {
    this.resetForm();
    if(this.isUploadForm){
      this.fileInputVariable.nativeElement.value = "";
    }
    /*this.isBookForm = false;
    this.isAuthorForm = false;
    this.isUploadForm = false;*/
    this.item = new BookDto();
    this.isCloseModal.emit(false);
  }

  async validateForm() {
    if (this.bookForm.invalid) {
			alert("Form book invalid ");
      this.bookForm.reset();
      this.isValidForm = false;
      if(this.authorForm.invalid){
        alert("Form author invalid"+ this.authorForm.value);
        this.authorForm.reset();
      }else {
        this.showSpinner = true;
        alert(this.authorForm.value)
        this.authorInfos.firstName = this.authorForm.get('firstName')?.value;
        this.authorInfos.lastName = this.authorForm.get('lastName')?.value;
        this.authorInfos.country = this.authorForm.get('country')?.value;
        this.authorInfos.birthDay = new Date(this.authorForm.get('birthDay')?.value);
        this.onlineLibraryService.upsertAuthor(this.authorInfos)
        .then(x => {
          console.log(x + " ok insert");
          this.showSpinner = false;
        })
        .catch(x => {
          console.log(x + " Not ok insert");
          this.showSpinner = false;
        })
        this.authorForm.reset();
      }
		}else {
      this.showSpinner = true;
      await this.onlineLibraryService.getAuthorById(this.bookForm?.value?.author)
        .then(x => {
          this.bookInfos.author = x;
        })
        .catch(x => console.log(x));
      await this.onlineLibraryService.getCategoryById(this.bookForm?.value?.category)
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

      this.onlineLibraryService.addBook(this.bookInfos)
        .then(x => {
          console.log(x + " ok insert");
          this.showSpinner = false;
        })
        .catch(x => {
          console.log(x + " Not ok insert");
          this.showSpinner = false;
        })

        this.bookForm.reset();
        this.item = new BookDto();
    }
  }

  async importCsv() :Promise<void> {
    this.resetForm();
    this.showSpinner = true;
    const fileParameter : FileParameter = {
      data: this.file,
      fileName: this.file.name
    }
    if(!this.isFileHeaderCorrect && this.isReadyToRunProcess){
      if(this.isUploadForm){
        this.fileInputVariable.nativeElement.value = "";
      }
      this.showSpinner = false;
    }else {
      try{
        await this.onlineLibraryService.uploadBook(fileParameter)
          .then(x => {
            this.showSpinner = false;
            this.message = "Les livres ont été ajoutés avec succes";
            this.isFileSuccess = true;
            this.isNotif = true;
            setTimeout(() => {
              this.isNotif = false;
            }, 9000);
            this.fileInputVariable.nativeElement.value = "";
            console.log("then => "+x)
          }).catch(err => {
            console.log("catch err then => "+err.ErrorMessage)
            if(err.ErrorMessage || err.ErrorMessage == ''){
              this.showSpinner = false;
              this.message = "Erreur lors de l'ajout, le fichier contient un champ vide";
              this.isFileSuccess = false;
              this.isNotif = true;
              setTimeout(() => {
                this.isNotif = false;
              }, 9000);
            }else {
              this.showSpinner = false;
              this.message = "Les livres ont été ajoutés avec succes";
              this.isFileSuccess = true;
              this.isNotif = true;
              setTimeout(() => {
                this.isNotif = false;
              }, 9000);
              this.fileInputVariable.nativeElement.value = "";
            }

          })
      }
      catch (err : any) {
        console.log("catch err try => "+ err.toString())
				this.showSpinner = false;
				this.isFileSuccess = false;
			}
    }
  }

  validateModal() {
    this.isValidateModal.emit(true);
  }
}
