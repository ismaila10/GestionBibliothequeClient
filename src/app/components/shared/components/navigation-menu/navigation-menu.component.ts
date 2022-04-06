import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AuthService } from '../../security/services/auth.service';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit, OnChanges {

  constructor(private authService: AuthService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.isLogin = this.authService.isLoggedIn();
    console.log(this.isLogin);

  }
  @Output() logoutUserClicked : EventEmitter<boolean> = new EventEmitter<boolean>();
  isLogin: boolean = false;

  ngOnInit(): void {
    this.isLogin = this.authService.isLoggedIn();
    console.log("init "+this.isLogin);
  }

  logout() : void {
    this.logoutUserClicked.emit(true);
    this.isLogin = false;
  }

}
