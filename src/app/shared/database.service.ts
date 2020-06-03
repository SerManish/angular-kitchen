import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.modal';
import { map, tap, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn:'root'
})
export class DatabaseService{

    constructor(private http:HttpClient,private recipeservice:RecipeService, private auth:AuthService)
    {}
    private url = "https://angular-kitchen-mg.firebaseio.com/";
    storeData()
    {
        this.http.put(this.url+"recipes.json",this.recipeservice.getRecipes()).subscribe();
    }

    fetchData()
    {
        return this.http.get<Recipe[]>(this.url+"recipes.json").pipe(
            map( (response) =>{
                return response.map( (response) => {
                    return {...response, ingredients : response.ingredients?response.ingredients:[]}
                })
             })
             ,tap(
                (response) => this.recipeservice.updateRecipes(response)
             )
        )
    }
}