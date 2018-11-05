import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

  @Output()
  navigateToEvent = new EventEmitter<{navigatedValue: string}>();

  onClickRecipes() {
    this.navigateToEvent.emit({navigatedValue: 'recipes'});
  }

  onClickShoppingList() {
    this.navigateToEvent.emit({navigatedValue: 'shoppingList'});
  }

}
