import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.modal';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode = false;
  constructor(private activelink:ActivatedRoute, private recipeservice:RecipeService, private router:Router) { }
  currentRecipe : Recipe;
  editForm:FormGroup;
  array:FormArray;

  ngOnInit(): void {
    this.activelink.params.subscribe(
      (params : Params) => {
        this.id = params['id'];
        this.editMode = this.id != null;
        this.initForm();
        this.array =  (<FormArray>this.editForm.get('ingredients'));
      }
    );
  }

  initForm()
  {
    let recipeName = "";
    let recipePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);
    if(this.editMode)
    {
      this.currentRecipe = this.recipeservice.getRecipe(this.id);
      recipeName = this.currentRecipe.name;
      recipePath = this.currentRecipe.imagePath;
      recipeDescription = this.currentRecipe.description;
      for (let ingredient of this.currentRecipe.ingredients)
      {
        recipeIngredients.push(
          new FormGroup({
            'name':new FormControl(ingredient.name,Validators.required),
            'amount':new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
          })
        );
      }
    }
    this.editForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(recipePath,Validators.required),
      'description':new FormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients
    });
  }

  clearForm()
  {
    this.editForm.reset();
    this.router.navigate(["../"],{relativeTo:this.activelink});
  }

  onSubmit()
  {
    if(this.editMode)
      this.recipeservice.updateRecipe(this.id,this.editForm.value);
    else
      this.recipeservice.addRecipe(this.editForm.value);
    this.clearForm();
  }

  removeIngredient(index:number)
  {
    this.array.controls.splice(index,1);
    this.editForm.value['ingredients'].splice(index,1);
    this.recipeservice.updateRecipe(this.id,this.editForm.value);
    console.log(this.editForm.value);
  }

  addNewIngredient()
  {
    (<FormArray>this.editForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }
}
