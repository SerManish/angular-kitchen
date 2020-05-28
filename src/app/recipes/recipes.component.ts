import { Component } from '@angular/core';
import { RecipeService } from './recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Component({
    selector : 'app-recipes',
    templateUrl : './recipes.component.html',
    styleUrls : ['./recipes.component.html'],
    providers:[RecipeService]
})
export class RecipesComponent
{
    
}