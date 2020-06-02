import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor
{
    constructor(private auth:AuthService){}

    intercept(req: HttpRequest<any>, next:HttpHandler)
    {
        const modifiedReq = req.clone({params:new HttpParams().set('auth',this.auth.getToken())});
        return next.handle(modifiedReq);
    }

}