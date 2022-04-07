import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BookComponent } from './components/dashboard/book/book.component';
import { BookListComponent } from './components/dashboard/book/book-list/book-list.component';
import { BookDetailComponent } from './components/dashboard/book/book-list/book-detail/book-detail.component';
import { LoanComponent } from './components/dashboard/loan/loan.component';
import { LoanDetailComponent } from './components/dashboard/loan/loan-list/loan-detail/loan-detail.component';
import { LoanListComponent } from './components/dashboard/loan/loan-list/loan-list.component';
import { ContactComponent } from './components/contact/contact.component';
import { NavigationMenuComponent } from './components/shared/components/navigation-menu/navigation-menu.component';
import { AccesDeniedComponent } from './components/shared/security/acces-denied/acces-denied.component';
import { Page404Component } from './components/shared/security/page404/page404.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/shared/components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { DashboardCardComponent } from './components/shared/components/dashboard-card/dashboard-card.component';
import { CardItemComponent } from './components/shared/components/utils/card-item/card-item.component';
import { ListItemComponent } from './components/shared/components/utils/list-item/list-item.component';
import { API_BASE_URL, OnlineLibraryClient } from './components/shared/clientSwagger/onlineLibrary.client';
import { OnlineLibraryService } from './components/shared/services/online-library.service';
import { BookFormComponent } from './components/shared/components/book-form/book-form.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { UserComponent } from './components/dashboard/user/user.component';
import { UserListComponent } from './components/dashboard/user/user-list/user-list.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptorService } from './components/shared/security/services/auth-interceptor.service';
import { ModalComponent } from './components/shared/components/utils/modal/modal.component';
import { UserDetailComponent } from './components/dashboard/user/user-list/user-detail/user-detail.component';
import { ModalFormComponent } from './components/shared/components/utils/modal-form/modal-form.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { BookUserComponent } from './components/book-user/book-user.component';
import { BookUserDetailComponent } from './components/book-user/book-user-detail/book-user-detail.component';
import { FooterComponent } from './components/shared/components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { NotificationComponent } from './components/shared/components/utils/notification/notification.component';
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookComponent,
    BookListComponent,
    BookDetailComponent,
    LoanComponent,
    LoanDetailComponent,
    LoanListComponent,
    ContactComponent,
    NavigationMenuComponent,
    AccesDeniedComponent,
    Page404Component,
    DashboardComponent,
    HomeComponent,
    SidebarComponent,
    DashboardCardComponent,
    CardItemComponent,
    ListItemComponent,
    BookFormComponent,
    UserComponent,
    UserListComponent,
    RegisterComponent,
    ModalComponent,
    UserDetailComponent,
    ModalFormComponent,
    BookUserComponent,
    BookUserDetailComponent,
    FooterComponent,
    AboutComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
		], { relativeLinkResolution: 'legacy' }),
    AppRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    BrowserAnimationsModule
  ],
  providers: [OnlineLibraryClient, OnlineLibraryService, JwtHelperService,
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
