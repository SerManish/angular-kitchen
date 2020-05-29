import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailDefaultComponent } from './recipes/recipe-detail/recipe-detail-default/recipe-detail-default.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const routes:Routes = [
    {path:'',redirectTo:'/recipe',pathMatch:'full'},
    {path:'recipe',component:RecipesComponent,children:[
        {path:'',component:RecipeDetailDefaultComponent},
        {path:'new',component:RecipeEditComponent},
        {path:':id',component:RecipeDetailComponent},
        {path:':id/edit',component:RecipeEditComponent}
    ]},
    {path:'shoppinglist',component:ShoppingListComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule
{

}