import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginMode = true;
  isLoading = false;
  error = "";
  @ViewChild('f') authForm:NgForm;

  constructor(private authservice:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  switchMode()
  {
    this.loginMode = !this.loginMode;
  }

  onSubmit()
  {
    this.error = "";
    this.isLoading = true;
    if(this.loginMode)
    {
      this.authservice.login(this.authForm.value.email,this.authForm.value.password).subscribe(
        (response) => {
          console.log(response);
          this.isLoading = false;
          this.router.navigate(['/recipe']);
        },
        (error) => {
          console.log(error);
          this.error = error;
          this.isLoading = false;
        }
        );
    }
    else
    {
    this.authservice.signup(this.authForm.value.email,this.authForm.value.password).subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipe']);
      },
      (error) => {
        console.log(error);
        this.error = error;
        this.isLoading = false;
      }
      );
    this.authForm.reset();
  }
    
  }
}
