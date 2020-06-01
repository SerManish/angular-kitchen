import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.modal';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes:Recipe[] = []
  recipeSub:Subscription;

  constructor(private recipeservice:RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeservice.getRecipes();
    this.recipeSub = this.recipeservice.recipeChanged.subscribe(
      (newRecipes) => this.recipes = newRecipes
    );
  }

  ngOnDestroy()
  {
    this.recipeSub.unsubscribe();
  }

}
