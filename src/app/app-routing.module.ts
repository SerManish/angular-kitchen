import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'

const routes:Routes = [
    {path:'',redirectTo:'/recipe',pathMatch:'full'},
    {path:'recipe',loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)},
    {path:'shoppinglist',loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
    {path:'auth',loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
    imports:[RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
    exports:[RouterModule]
})
export class AppRoutingModule
{

}