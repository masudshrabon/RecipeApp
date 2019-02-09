import { Route, ActivatedRoute, Router } from '@angular/router';
import { Recipe } from './../recipes/recipe.model';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, EventEmitter, Output, OnChanges } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(
    private dataStorageService: DataStorageService,
    private router: Router,
    private autheService: AuthService
  ) {}

  onSaveData() {
    if (this.router.url.includes('/recipes')) {
      this.dataStorageService.storeRecipes().subscribe(
        (response) => console.log(response),
        (errror) => console.log(errror)
      );
    } else if (this.router.url.includes('/shopping-list')) {
      this.dataStorageService.storeShoppingListIngredients().subscribe(
        (response) => console.log(response),
        (errror) => console.log(errror)
      );
    }
  }

  onFetchData() {
    if (this.router.url.includes('/recipes')) {
      this.dataStorageService.getRecipes();
    } else if (this.router.url.includes('/shopping-list')) {
      this.dataStorageService.getShoppingListIngredients();
    }
  }

  isAuthenticated() {
    return this.autheService.isAuthenticated();
  }

  onLogout() {
    this.autheService.logout();
  }

}
