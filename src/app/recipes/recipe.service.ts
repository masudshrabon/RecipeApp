
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe []>();

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

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice(); // slice() function provides a copy of the this.recipes; untouched this.recipes.
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

}
