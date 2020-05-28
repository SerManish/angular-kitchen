import { Recipe } from './recipe.modal';
import { Output, EventEmitter } from '@angular/core';

export class RecipeService
{
    @Output() selected = new EventEmitter<Recipe> ();
    recipes:Recipe[] = [
        new Recipe("A Test Recipe","a tasty dish","https://p1.pxfuel.com/preview/548/595/580/gastronomy-food-dishes-eat.jpg"),
        new Recipe("Rajma Chawal","not so tasty dish","https://p1.pxfuel.com/preview/548/595/580/gastronomy-food-dishes-eat.jpg")
      ];
    
      getRecipes()
      {
          return this.recipes.slice();
      }
}