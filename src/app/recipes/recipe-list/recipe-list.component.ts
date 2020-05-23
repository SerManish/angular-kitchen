import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.modal';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes:Recipe[] = [
    new Recipe("A Test Recipe","a tasty dish","https://p1.pxfuel.com/preview/548/595/580/gastronomy-food-dishes-eat.jpg"),
    new Recipe("A Test Recipe","a tasty dish","https://p1.pxfuel.com/preview/548/595/580/gastronomy-food-dishes-eat.jpg")
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
