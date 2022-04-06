import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { BookUserComponent } from './components/book-user/book-user.component';
import { ContactComponent } from './components/contact/contact.component';
import { BookComponent } from './components/dashboard/book/book.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoanComponent } from './components/dashboard/loan/loan.component';
import { UserComponent } from './components/dashboard/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BookFormComponent } from './components/shared/components/book-form/book-form.component';
import { AccesDeniedComponent } from './components/shared/security/acces-denied/acces-denied.component';
import { Page404Component } from './components/shared/security/page404/page404.component';
import { AuthGuard } from './components/shared/security/services/auth.guard';
import { RoleGuard } from './components/shared/security/services/role.guard';

const routes: Routes = [
  {
    path: 'erreur',
    children: [
      { path: 'access-refuse', component: AccesDeniedComponent },
    ]
  },
  {
    path: 'dashboard',
    children: [
      { path: '', component: DashboardComponent },
      { path: 'book', component: BookComponent },
      { path: 'loan', component: LoanComponent },
      { path: 'book/form', component: BookFormComponent },
      { path: 'user', component: UserComponent }
    ], canActivate:[RoleGuard]
  },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'book', component: BookUserComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
