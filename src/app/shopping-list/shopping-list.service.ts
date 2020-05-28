import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService
{
    ingredients:Ingredient[] = [
        new Ingredient('Apple',5),
        new Ingredient('Tomatoes',10)
      ];
    
    getIngredients()
    {
        return this.ingredients;
    }

    addIngredient(item:{name:string,amount:number})
    {
        this.ingredients.push(item);
    }
}