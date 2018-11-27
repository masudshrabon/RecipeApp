
import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'src/assets/images/testRecipe.png'),
    new Recipe('A Test Recipe2', 'This is simply another test', 'src/assets/images/testRecipe.png')
  ];

  getRecipes() {
    return this.recipes.slice(); // slice() function provides a copy of the this.recipes; untouched this.recipes.
  }
}
