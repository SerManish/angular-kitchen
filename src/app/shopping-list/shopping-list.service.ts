import { Ingredient } from '../shared/ingredient.model';
import { Output } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService
{
    @Output() editanitem = new Subject<number> ();
    ingredients:Ingredient[] = [
        new Ingredient('Apple',5),
        new Ingredient('Tomatoes',10)
      ];
    
    getIngredients()
    {
        return this.ingredients;
    }
    getIngredient(index:number)
    {
        return this.ingredients[index];
    }
    addIngredient(item:Ingredient)
    {
        this.ingredients.push(item);
    }
    addIngredients(items:Ingredient[])
    {
        this.ingredients.push(...items);
    }
    updateIngredient(index:number,ingredient:Ingredient)
    {
        this.ingredients[index] = ingredient;
    }
    deleteIngredient(index:number)
    {
        this.ingredients.splice(index,1);
    }
}