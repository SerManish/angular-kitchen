import { Component, OnInit, ElementRef } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppinglistservice:ShoppingListService) { }

  ngOnInit(): void {
  }

  addItem(itemname:string,itemamount:number)
  {
    this.shoppinglistservice.addIngredient({name:itemname,amount:itemamount});
  }
}
