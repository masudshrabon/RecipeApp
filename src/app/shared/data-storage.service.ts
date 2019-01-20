import { Recipe } from './../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';

@Injectable()
export class DataStorageService {
  constructor(
    private http: Http,
     private recipeService: RecipeService
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
}
