import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.modal';
import { DatabaseService } from '../shared/database.service';
import { RecipeService } from './recipe.service';

@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>
{
    constructor(private database:DatabaseService,private recipeservice:RecipeService)
    {}

    resolve(activelink:ActivatedRouteSnapshot,state:RouterStateSnapshot)
    {
        const recipes = this.recipeservice.getRecipes();
        if(recipes.length === 0)
            return this.database.fetchData();
        else
            return recipes;
    }
}