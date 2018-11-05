import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RecipeApp';
  navigationTo = 'recipes';

  onNavigationClicked(navigationToValue: {navigatedValue: string}) {
    this.navigationTo = navigationToValue.navigatedValue;
    console.log(this.navigationTo);
  }
}
