import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') addForm:NgForm;
  editMode = false; 
  indexEdited:number;
  editedIngredient:Ingredient;
  updateSubscription : Subscription;
  constructor(private shoppinglistservice:ShoppingListService) { }

  ngOnInit(): void {
    this.updateSubscription = this.shoppinglistservice.editanitem.subscribe(
      (index:number) => {
        this.editMode = true;
        this.indexEdited = index;
        this.editedIngredient = this.shoppinglistservice.getIngredient(index);
        this.addForm.setValue(
          {
            name:this.editedIngredient.name,
            amount:this.editedIngredient.amount
          }
        );
      }
    );
  }

  addItem()
  {
    if(this.editMode)
      this.shoppinglistservice.updateIngredient(this.indexEdited,{name:this.addForm.value.name,amount:this.addForm.value.amount});
    else
      this.shoppinglistservice.addIngredient({name:this.addForm.value.name,amount:this.addForm.value.amount});
    this.clearForm();
  }

  clearForm()
  {
    this.addForm.reset();
    this.editMode = false;
  }

  deleteItem()
  {
    this.shoppinglistservice.deleteIngredient(this.indexEdited);
    this.clearForm();
  }

  ngOnDestroy()
  {
    this.updateSubscription.unsubscribe();
  }
}
