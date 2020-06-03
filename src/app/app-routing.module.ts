import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailDefaultComponent } from './recipes/recipe-detail/recipe-detail-default/recipe-detail-default.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGaurd } from './auth/auth.gaurd';

const routes:Routes = [
    {path:'',redirectTo:'/recipe',pathMatch:'full'},
    {path:'recipe',component:RecipesComponent,canActivate:[AuthGaurd],children:[
        {path:'',component:RecipeDetailDefaultComponent,resolve:[RecipeResolverService]},
        {path:'new',component:RecipeEditComponent},
        {path:':id',component:RecipeDetailComponent },
        {path:':id/edit',component:RecipeEditComponent}
    ]},
    {path:'shoppinglist',component:ShoppingListComponent},
    {path:'auth', component:AuthComponent},
    {path:'**',redirectTo:'/recipe'}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule
{

}