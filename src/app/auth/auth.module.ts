import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';

@NgModule({
    declarations:[
        AuthComponent,
        LoadingSpinnerComponent
    ],
    imports:[
        RouterModule.forChild([{path:'', component:AuthComponent}]),
        CommonModule,
        FormsModule,
    ],
    exports:[

    ]
})
export class AuthModule
{

}