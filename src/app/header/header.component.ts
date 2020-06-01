import { Component } from '@angular/core';
import { DatabaseService } from '../shared/database.service';

@Component({
    selector : 'app-header',
    templateUrl : './header.component.html'
})
export class HeaderComponent
{
    constructor(private database:DatabaseService){}

    saveData()
    {
        this.database.storeData();
    }

    fetchData()
    {
        this.database.fetchData().subscribe();
    }
}