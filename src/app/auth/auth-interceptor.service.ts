import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor
{
    constructor(private auth:AuthService){}

    intercept(req: HttpRequest<any>, next:HttpHandler)
    {
        let token:string = null;
        this.auth.user.pipe(take(1),tap((data)=>{
            if(data)
                token=data.token;
        })).subscribe();
        if(token)
        {
            const modifiedReq = req.clone({params:new HttpParams().set('auth',token)});
            return next.handle(modifiedReq);
        }
        return next.handle(req);
        
    }

}