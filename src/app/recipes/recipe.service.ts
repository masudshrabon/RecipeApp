
import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Test Recipe',
      'The is a test recipe.',
      'src/assets/images/testRecipe.png',
      [new Ingredient('Test Ingredient1', 1), new Ingredient('Test Ingredient2', 2)]
    ),
    new Recipe('Beef Pasta',
      'The recipe is tasty.',
      'src/assets/images/pasta.png',
      [new Ingredient('Beef', 1), new Ingredient('Pasta', 1), new Ingredient('Tomato', 2)]
    ),
    new Recipe('Vegetable Noodles',
      'The recipe is awesome.',
      'src/assets/images/vegetableNoodles.png',
      [new Ingredient('Noodles', 1), new Ingredient('Tomato', 2), new Ingredient('Potato', 2), new Ingredient('Carrot', 2)]
    )
  ];

  getRecipes() {
    return this.recipes.slice(); // slice() function provides a copy of the this.recipes; untouched this.recipes.
  }
}
