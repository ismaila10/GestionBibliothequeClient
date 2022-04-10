import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../clientSwagger/onlineLibrary.client';
import { AuthService } from '../../security/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  show: boolean = false;
  user: User = new User;
  showDetail: boolean = false;
  email: string = '';
  menu : any[] = [
    { id:1, link: "dashboard/", title: "DashBoard", icon:'https://cdn-icons.flaticon.com/png/512/4399/premium/4399641.png?token=exp=1649000111~hmac=ca9b08dd119daf5ac3c0cb210bae26e0'},
    { id:2, link: "dashboard/book", title: "Livres", icon:'https://cdn-icons.flaticon.com/png/512/3330/premium/3330300.png?token=exp=1648995567~hmac=5ef899d5e133cf6b713579d6471fd34a' },
    { id:3, link: "dashboard/loan", title: "Prets", icon:'https://cdn-icons.flaticon.com/png/512/3130/premium/3130444.png?token=exp=1648995712~hmac=0f524ba763271bd271fa3163125ed9c5' },
    { id:4, link: "dashboard/user", title: "Utilisateurs", icon:'https://cdn-icons.flaticon.com/png/512/3239/premium/3239045.png?token=exp=1648997864~hmac=cf897bb5adc6a2a1ecb6006faecd4cda' }
  ]

  data: any[] = [
    {id:1, link:"", title:"Livres", class:"w-2.5 h-2.5 mr-4 bg-indigo-500 rounded-full"},
    {id:1, link:"", title:"Prets", class:"w-2.5 h-2.5 mr-4 bg-green-500 rounded-full"},
    {id:1, link:"", title:"Utilisateurs", class:"w-2.5 h-2.5 mr-4 bg-yellow-500 rounded-full"}
  ]

  ngOnInit(): void {
    this.email = JSON.parse(this.authService.getDecodedToken())?.email;
    this.getUser();
  }

  @Output() logoutClicked : EventEmitter<boolean> = new EventEmitter<boolean>();

  public showDrop() {
    this.show = !this.show;
  }

  async getUser() {
    await this.authService.getUserByEmail(this.email)
      .then(x => {
        this.user = x;
      })
      .catch(x => console.log(x));
  }

  logout() : void {
    this.logoutClicked.emit(true);
  }

}
