import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from './../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class DataStorageService {
  constructor(
    private http: Http,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService
  ) {}

  storeRecipes() {
    return this.http.put('https://ng-recipe-app-project-id.firebaseio.com/recipes.json',
    this.recipeService.getRecipes());
  }

  getRecipes() {
    return this.http.get('https://ng-recipe-app-project-id.firebaseio.com/recipes.json')
      .pipe(map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
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
    return this.http.put('https://ng-recipe-app-project-id.firebaseio.com/ingredients.json',
    this.shoppingListService.getIngredients());
  }

  getShoppingListIngredients() {
    return this.http.get('https://ng-recipe-app-project-id.firebaseio.com/ingredients.json')
      .subscribe(
        (response: Response) => {
          const ingredient: Ingredient[] = response.json();
          this.shoppingListService.setIngredients(ingredient);
        }
      );
  }

}
