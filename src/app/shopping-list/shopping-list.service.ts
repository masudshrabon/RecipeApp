import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {

  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 10),
  ];

  getIngredients() {
    return this.ingredients;
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

}
