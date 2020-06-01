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
    // recipes:Recipe[] = [
    //     new Recipe("A Test Recipe","a tasty dish",
    //     "https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-set-of-fast-food-vector-illustration-isolated-on-white-background-fast-png-image_1805155.jpg",
    //     [
    //         new Ingredient("Bread",12),
    //         new Ingredient("Milk",20)
    //     ]),
    //     new Recipe("Rajma Chawal","not so tasty dish",
    //     "https://i.graphicmama.com/blog/wp-content/uploads/2016/12/20132838/burger-vector-illustration.jpg",
    //     [
    //         new Ingredient("Rice",40),
    //         new Ingredient("Rajma",24)
    //     ])
    //   ];
      
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