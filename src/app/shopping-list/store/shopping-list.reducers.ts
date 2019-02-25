import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

const initialState = {
  ingredients : [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 10),
  ]
};

/** Automatically call by ngrx when an action is dispatched. */
export function shoppingListReducers(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payLoad]
      };
      default:
        return state;
  }
}
