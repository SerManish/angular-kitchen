import { Recipe } from './recipe.modal';
import { Output, EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService
{
    @Output() selected = new EventEmitter<Recipe> ();
    recipes:Recipe[] = [
        new Recipe("A Test Recipe","a tasty dish",
        "https://p1.pxfuel.com/preview/548/595/580/gastronomy-food-dishes-eat.jpg",
        [
            new Ingredient("Bread",12),
            new Ingredient("Milk",20)
        ]),
        new Recipe("Rajma Chawal","not so tasty dish",
        "https://p1.pxfuel.com/preview/548/595/580/gastronomy-food-dishes-eat.jpg",
        [
            new Ingredient("Rice",40),
            new Ingredient("Rajma",24)
        ])
      ];
      
      constructor(private shoppinglistservice:ShoppingListService)
      {}

      getRecipes()
      {
          return this.recipes.slice();
      }

      addToShoppingList(ingredients:Ingredient[])
      {
           this.shoppinglistservice.addIngredients(ingredients);
      }
}