# ClientApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.

Deployment of the app on heroku => https://onlinelibrary-client.herokuapp.com/

## Project structure:
app/components/dashboard => Groups all the components of the admin dasboard (sidebar, data tables, ...).

app/components => Groups all the components of the simple user(home, about, contact ...)

app/components/shared => Groups all shared or reusable layers.

app/components/shared/components => Groups all reusable components like modals, forms, sidebar, navBar, footer and card-items and list-items

app/components/shared/clientSwagger => With NSwag, you don't need an existing API. you can use third-party APIs that embed Swagger and generate a client 
implementation. NSwag allows you to speed up the development cycle and easily adapt to API changes.
Nswag Studio is a software to generate a TypeScript or .net client from the swagger endPoint of my api. I'm using it on this project to generate a Typescript client that I'm going to use in my services by injecting it. This strongly typed Client Type script contains all my models and interfaces created on my api and also all endpoints and return types exposed in the api's controllers.

app/components/shared/security => This layer contains all the security part of the API, i.e.: 
-authService => which manages all that is authentication (decode token, getExpirationDta, getUserInfosByTokenPayload, login, logout, getUserRole ....)

-authGuard => Allows to manage everything that is securing the routes of my application with the CanActivate interface which is implemented. This service is used to manage access based on authentication.

roleGuard => Allows to manage everything that is securing the routes of my application with the CanActivate interface which is implemented. This service is used to manage access based on authentication. This service makes it possible to manage access according to the roles of the users.

app/components/shared/services => Angular service methods can be invoked from any component of Angular, like Controllers, Directives, etc. This helps in dividing the web application into small, different logical units that can be reused.

The dependencies used => Tailwind css, Angular Material, eslint


## Description of how the application works:

An interface for displaying book, user and loan statistics
A display interface for books, users and loans with the ability to view details, add or modify an item in a modal open on click
An interface allowing to load a file in csv format and to insert the books contained in this file. With checks on file headers, file format (.csv), and validation rules implemented on the api side.
A search bar on each interface to filter data
User login and logout interface

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
