import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take,map } from 'rxjs/operators'

@Injectable({providedIn:'root'})
export class AuthGaurd implements CanActivate
{

    constructor(private auth:AuthService,private router:Router)
    {}

    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>
    {
        return this.auth.user.pipe(
            take(1),
            map(
                (user) => {
                    if(user)
                        return true;
                    else
                        return this.router.createUrlTree(['/auth']);
                }
            )
        );
    }   
}