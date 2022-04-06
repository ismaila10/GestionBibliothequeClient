import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BookDto, LoanDto } from '../../../clientSwagger/onlineLibrary.client';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnChanges {

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    //console.log("on change => "+this.item.title)
  }

  @Input() showModal : boolean = true;
  @Input() item : BookDto = new BookDto();
  @Input() loan : LoanDto = new LoanDto();
  @Input() showModalAnnuler : boolean = false;
  @Input() title : string = '';
  @Input() buttonTitle : string = 'Valider';
  @Input() taille : string = 'w-1/2';
  @Output() isCloseModal : EventEmitter<boolean> = new EventEmitter();
  @Output() isValidateModal : EventEmitter<boolean> = new EventEmitter();
  classTaille : string = '';

  ngOnInit(): void {
    this.classTaille = `relative ${this.taille} pt-3 my-6 mx-auto max-w-6xl`;
  }

  closeModal() {
    this.isCloseModal.emit(false);
  }

}
