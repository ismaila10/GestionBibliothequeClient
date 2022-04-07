import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from './components/shared/security/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {
  constructor(private authService: AuthService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.isAdmin = this.authService.haveAdminAccess()
  }
  ngOnInit(): void {
    this.isLoggin = this.authService.isLoggedIn()
    this.isAdmin = this.authService.haveAdminAccess()
  }
  title = 'clientApp';
  isLoggin : boolean = true;
  isAdmin : boolean = false;

  logout(value : boolean) {
    this.isLoggin = !value;
    this.isAdmin = false;
    this.authService.logout()
  }
}
