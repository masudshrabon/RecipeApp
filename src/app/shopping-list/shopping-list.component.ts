import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  // ingredients: Ingredient[];
  // private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
  ) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
    /* this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    ); */
  }

  onEditIngredient(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}
