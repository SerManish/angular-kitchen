import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailDefaultComponent } from './recipe-detail/recipe-detail-default/recipe-detail-default.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGaurd } from '../auth/auth.gaurd';
import { RecipeResolverService } from './recipe-resolver.service';
import { SharedModule } from 'src/shared.module';

@NgModule({
    declarations:[
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeDetailDefaultComponent,
        RecipeEditComponent
    ],
    imports:[
        RouterModule.forChild([ {path:'',component:RecipesComponent,canActivate:[AuthGaurd],children:[
            {path:'',component:RecipeDetailDefaultComponent,resolve:[RecipeResolverService]},
            {path:'new',component:RecipeEditComponent},
            {path:':id',component:RecipeDetailComponent ,resolve:[RecipeResolverService]},
            {path:':id/edit',component:RecipeEditComponent,resolve:[RecipeResolverService]}
        ]}]),
        CommonModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class RecipesModule
{

}