import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.modal';
import { RecipeService } from '../../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe:Recipe;
  @Input('index') id:number;
  constructor(private recipeservice:RecipeService,private router:Router,private activelink:ActivatedRoute){}

  ngOnInit(): void {
  }
}
