import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.modal';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe:Recipe;
  constructor(private recipeservice:RecipeService,private activelink:ActivatedRoute) { }

  id:number;

  ngOnInit(): void {
    this.activelink.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.selectedRecipe = this.recipeservice.getRecipe(this.id);
      }
    ); 
  }
  toShoppingList()
  {
    this.recipeservice.addToShoppingList(this.selectedRecipe.ingredients);
  }
}
