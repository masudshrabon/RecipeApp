import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  /**
   * @ViewChild('nameInput') provides ElementRef of the nativeElement,
   * which contains the nativeElement.
  */
  @ViewChild('nameInput') ingredientNameInputRef: ElementRef;
  @ViewChild('amountInput') ingredientAmountInputRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddIngredient(form: NgForm) {
    /* Template Driven Form Approach */
    this.shoppingListService.addIngredient(new Ingredient(form.value.name, form.value.amount));
    /* const ingredientName = this.ingredientNameInputRef.nativeElement.value;
    const ingredientAmount = this.ingredientAmountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);
    this.shoppingListService.addIngredient(newIngredient); */
  }

}
