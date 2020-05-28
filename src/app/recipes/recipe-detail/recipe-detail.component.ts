import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.modal';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe:Recipe;
  constructor(private recipeservice:RecipeService) { }

  ngOnInit(): void {
    this.recipeservice.selected.subscribe(
      (recipe:Recipe) => this.selectedRecipe = recipe
    );
  }

}
