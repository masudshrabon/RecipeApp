import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from './../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const token = this.authService.getToken();
    return this.httpClient.put('https://ng-recipe-app-project-id.firebaseio.com/recipes.json?auth=' + token,
      this.recipeService.getRecipes(), {
        observe: 'body'
      });
  }

  getRecipes() {
    const token = this.authService.getToken();
    // return this.httpClient.get<Recipe[]>('https://ng-recipe-app-project-id.firebaseio.com/recipes.json?auth=' + token)
    return this.httpClient.get<Recipe[]>('https://ng-recipe-app-project-id.firebaseio.com/recipes.json?auth=' + token, {
      observe: 'body', // default configuration
      responseType: 'json' // default configuration
    })
      .pipe(map(
        (recipes) => {
          console.log(recipes);
          recipes.forEach(recipe => {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          });
          return recipes;
        }
      ))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }

  storeShoppingListIngredients() {
    const token = this.authService.getToken();
    return this.httpClient.put('https://ng-recipe-app-project-id.firebaseio.com/ingredients.json?auth=' + token,
    this.shoppingListService.getIngredients());
  }

  getShoppingListIngredients() {
    const token = this.authService.getToken();
    return this.httpClient.get<Ingredient[]>('https://ng-recipe-app-project-id.firebaseio.com/ingredients.json?auth=' + token)
      .subscribe(
        (ingredients) => {
          this.shoppingListService.setIngredients(ingredients);
        }
      );
  }

}
