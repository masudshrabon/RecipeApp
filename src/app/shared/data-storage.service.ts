import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from './../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable()
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    // const token = this.authService.getToken();
    // const headers = new HttpHeaders().set('Authorization', 'Bearer xyzFirebaseAuthNotNotWorkHereViaAuthorization');
    /* return this.httpClient.put('https://ng-recipe-app-project-id.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(), {
        observe: 'body',
        params: new HttpParams().set('auth', token)
        // headers: headers
      }); */
    /* const req = new HttpRequest('PUT', 'https://ng-recipe-app-project-id.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      { reportProgress: true, params: new HttpParams().set('auth', token) });
      return this.httpClient.request(req); */

      /* auth token is now handled by a way: interceptor in order to avoid it using in every request. It's cool.
         angular automatically takes care of intercepting every request (as we use HTTP_INTERCEPTORS)
      */
      const req = new HttpRequest('PUT', 'https://ng-recipe-app-project-id.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      { reportProgress: true });
      return this.httpClient.request(req);
  }

  getRecipes() {
    const token = this.authService.getToken();
    // return this.httpClient.get<Recipe[]>('https://ng-recipe-app-project-id.firebaseio.com/recipes.json')
    return this.httpClient.get<Recipe[]>('https://ng-recipe-app-project-id.firebaseio.com/recipes.json', {
      observe: 'body', // default configuration
      responseType: 'json', // default configuration
      params: new HttpParams().set('auth', token)
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
