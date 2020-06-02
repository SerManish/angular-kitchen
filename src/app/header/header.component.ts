import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from '../shared/database.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector : 'app-header',
    templateUrl : './header.component.html'
})
export class HeaderComponent implements OnInit,OnDestroy
{
    isAuthenticated = false;
    userSub:Subscription
    constructor(private database:DatabaseService, private auth:AuthService){}

    logout()
    {
        this.auth.logout();
    }

    saveData()
    {
        this.database.storeData();
    }

    fetchData()
    {
        this.database.fetchData().subscribe();
    }

    ngOnInit()
    {
        this.userSub = this.auth.user.subscribe(
            (user) => {
                this.isAuthenticated = !!user;
            }
        );
    }

    ngOnDestroy()
    {
        this.userSub.unsubscribe();
    }
}