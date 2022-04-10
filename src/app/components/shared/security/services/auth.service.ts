import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { OnlineLibraryClient, TokenRequest, UserLoginRequest, UserLoginResponse, UserRegistrationRequest } from '../../clientSwagger/onlineLibrary.client';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token : string = '';
  constructor(
    private onlineLibraryClient: OnlineLibraryClient,
    private jwtHelpService: JwtHelperService,
    private route: Router
    ) {
      this.token = this.getToken();
    }

  public login(body : UserLoginRequest): Promise<any> {
    return this.onlineLibraryClient.login("1", body).toPromise();
  }

  public getUserByEmail(body: string): Promise<any> {
    return this.onlineLibraryClient.email(body, "1").toPromise();
  }

  public register(body : UserRegistrationRequest): Promise<any> {
    return this.onlineLibraryClient.register("1", body).toPromise();
  }

  public generateRefreshToken(body : TokenRequest) : Promise<any> {
    return this.onlineLibraryClient.refreshToken("1", body).toPromise();
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['']);
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken') || '';
  }

  saveTokens(tokenData: UserLoginResponse){
    localStorage.setItem('token', tokenData.token);
    localStorage.setItem('refreshToken', tokenData.refreshToken);
    this.token = tokenData.token;
  }

  getDecodedToken() : string {
    let tokenPayload = JSON.stringify(this.jwtHelpService.decodeToken(this.token));
    console.log(tokenPayload)
    return tokenPayload;
  }

  getTokenExpirationDate() {
    //console.log("expirationDate => "+ this.jwtHelpService.getTokenExpirationDate(this.token))
    return this.jwtHelpService.getTokenExpirationDate(this.token);
  }

  isTokenExpired() : boolean {
    //console.log("expired => "+ !this.jwtHelpService.isTokenExpired(this.token))
    return !this.jwtHelpService.isTokenExpired(this.token);
  }

  haveAdminAccess() {
    //console.log("have Access Token => "+this.token);
    var tokenPayload = JSON.parse(this.getDecodedToken());
    if(tokenPayload?.role === 'admin')
      return true;
    else
      return false;
  }
}
