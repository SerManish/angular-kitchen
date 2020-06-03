import { NgModule } from '@angular/core';
import { DropdownDirective } from './app/shared/dropdown.directive';

@NgModule({
    declarations:[
        DropdownDirective
    ],
    exports:[
        DropdownDirective
    ]
})
export class SharedModule{

}