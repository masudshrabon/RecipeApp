import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Recipe App';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDf1ShCrMxHdxDgmmY45RP8ps1DV55Bl8s',
      authDomain: 'ng-recipe-app-project-id.firebaseapp.com'
    });
  }
}
