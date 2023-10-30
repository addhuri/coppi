# Coppi

A tool to quickly Copy (Coppi) your text to clipboard on one click

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

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

## ToDos

- [ ] Option to copy the workspace, page and section as a text
- [ ] Download workspace and page as a JSON file
  - [ ] with name and version
  - [ ] download individual JSON files
  - [ ] download all JSON files
- [ ] To the same for uploading
- [ ] Add dark theme

## Commands

```bash
# Create new project
npx -p @angular/cli@16 ng new coppi
ng generate environments
# Install bootstrap
ng add @ng-bootstrap/ng-bootstrap
npm i bootstrap-icons

npm i @ngrx/store@16 --save

# Create new components
ng generate component components/sidebar
ng generate component components/home
ng generate component components/input-form
ng generate component components/new-page-form

ng generate service services/app
```
