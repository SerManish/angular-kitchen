import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.modal';
import { Router } from '@angular/router';

export interface AuthResponse
{
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered ?:string;
}


@Injectable({providedIn:'root'})
export class AuthService{

    user = new BehaviorSubject<User>(null);
    private token:string = null;
    private timer:any;

    constructor(private http:HttpClient,private router:Router)
    {}

    autoLogin()
    {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if(userData)
        {
            const retUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
            if(retUser.token)
            {
                this.autoLogout(new Date(userData._tokenExpirationDate).getTime()-new Date().getTime());
                this.user.next(retUser); 
            }
        }
    }

    autoLogout(expireTime:number)
    {
       this.timer = setTimeout(()=>
       {
        this.logout();
       },expireTime);
    }

    signup(email:string,password:string)
    {
        return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCBc-yesBHXdU8cGEOgsneGTH3kBlJ5544",{
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(catchError(this.errorHandler),
        tap((res)=>this.userHandler(res.email,res.localId,res.idToken,res.expiresIn)));
    }

    login(email:string,password:string)
    {
        return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCBc-yesBHXdU8cGEOgsneGTH3kBlJ5544",{
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(catchError(this.errorHandler),
        tap((res)=>this.userHandler(res.email,res.localId,res.idToken,res.expiresIn)));
    }

    logout()
    {
        this.user.next(null);
        localStorage.removeItem("userData");
        this.router.navigate(['/auth']);
        this.timer = null;
    }

    getToken()
    {
        return this.token;
    }

    userHandler(email:string, localId:string, idToken:string,expiresIn:string)
    {
        const newExpirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email,localId,idToken,newExpirationDate);
        this.token = idToken;
        this.user.next(user);
        this.autoLogout(+expiresIn*1000);
        localStorage.setItem('userData',JSON.stringify(user));
    }

    errorHandler(errorResponse:HttpErrorResponse)
    {
        let errorMessage = "An unknown error Occurred";
        if(errorResponse.error.error )
        {
            if(errorResponse.error.error.message=='EMAIL_EXISTS')
                errorMessage = "The email id already exists";
            else if(errorResponse.error.error.message=='EMAIL_NOT_FOUND')
                errorMessage = "You have entered a wrong email";
            else if(errorResponse.error.error.message=='INVALID_PASSWORD')
                errorMessage = "You have entered an incorrect password";
            else if(errorResponse.error.error.message=='USER_DISABLED')
                errorMessage = "You have been banned from this application";
        }
        return throwError(errorMessage);
    }
}