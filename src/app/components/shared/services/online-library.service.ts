import { Injectable } from '@angular/core';
import { OnlineLibraryClient, BookDto, Loan, Category, UserLoginRequest, Author, FileParameter } from '../clientSwagger/onlineLibrary.client';

@Injectable({
  providedIn: 'root'
})
export class OnlineLibraryService {

  constructor(private onlineLibraryClient: OnlineLibraryClient) { }

  // BOOKS
  public getAllBooks(): Promise<any> {
    return this.onlineLibraryClient.booksAll("1").toPromise();
  }

  public addBook(book : BookDto) : Promise<any> {
    return this.onlineLibraryClient.booksPOST("1", book).toPromise();
  }

  public upsertBook(book : BookDto) : Promise<any> {
    return this.onlineLibraryClient.booksPUT("1", book).toPromise();
  }

  public uploadBook(file : FileParameter) : Promise<any> {
    return this.onlineLibraryClient.upload("1", file).toPromise();
  }

  public getBookByParam(idAuthor? : number, idCat? : number, status?: number, titre?: string, publishHouse?: string, publishDate?: Date) : Promise<any> {
    return this.onlineLibraryClient.params(idAuthor, idCat, status, titre, publishHouse, publishDate ,"1").toPromise();
  }

  // AUTHORS
  public getAllAuthors() : Promise<any> {
    return this.onlineLibraryClient.authorsAll("1").toPromise();
  }

  public addAuthor(author: Author): Promise<any> {
    return this.onlineLibraryClient.authorsPOST("1", author).toPromise();
  }

  public upsertAuthor(author : Author) : Promise<any> {
    return this.onlineLibraryClient.authorsPUT("1", author).toPromise();
  }

  public getAuthorById(id : number) : Promise<any> {
    return this.onlineLibraryClient.authorsGET(1, "1").toPromise();
  }

  // CATEGORIES
  public getAllCategories(): Promise<any> {
    return this.onlineLibraryClient.categoriesGET("1").toPromise();
  }

  public getCategoryById(id : number): Promise<any> {
    return this.onlineLibraryClient.categoriesGET2(id, "1").toPromise();
  }

  // LOANS
  public getAllLoans(): Promise<any> {
    return this.onlineLibraryClient.loansAll("1").toPromise();
  }

  public getLoanById(id: number): Promise<any> {
    return this.onlineLibraryClient.loansGET(id, "1").toPromise();
  }

  // USERS
  public getAllUsers(): Promise<any> {
    return this.onlineLibraryClient.usersAll("1").toPromise();
  }

  public getuserById(id: number): Promise<any> {
    return this.onlineLibraryClient.users(id, "1").toPromise();
  }

  // SETUP
  
}
