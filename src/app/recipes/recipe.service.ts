import { Recipe } from './recipe.modal';
import {  Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService
{
    recipeChanged = new Subject<Recipe[]>();

    recipes:Recipe[] = [];
      
      constructor(private shoppinglistservice:ShoppingListService)
      {}

      getRecipes()
      {
          return this.recipes;
      }

      getRecipe(index:number)
      {
          return this.recipes[index];
      }

      addToShoppingList(ingredients:Ingredient[])
      {
           this.shoppinglistservice.addIngredients(ingredients);
      }

      addRecipe(recipe:Recipe)
      {
        this.recipes.push(recipe);
      }

      updateRecipe(index:number,recipe:Recipe)
      {
        this.recipes[index] = recipe;
      }

      deleteRecipe(index:number)
      {
        this.recipes.splice(index,1);
      }

      updateRecipes(newRecipes:Recipe[])
      {
        this.recipes = newRecipes;
        this.recipeChanged.next(this.recipes);
      }
}