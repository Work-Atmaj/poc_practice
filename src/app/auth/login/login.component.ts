import { setErrorMessage, setLoadingSpinner } from './../../store/Shared/shared.actions';
import { loginStart } from './../state/auth.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { isUserStatus } from '../state/auth.selector';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit,OnDestroy{
  private authenticationStatusSubscription: Subscription | undefined;
  loginForm!: FormGroup;

  constructor(private store: Store<AppState>,private router: Router) {}
  

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onLoginSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
  
    // First, check the user status without subscribing
    this.store.select(isUserStatus(email, password)).pipe(
      take(1) // Take only one emission
    ).subscribe(result => {
      console.log(result.status);
  
      if (result.status) {
        // If the status is successful, then dispatch the login action
        this.store.dispatch(loginStart({ email, password }));
        this.router.navigate(['/']);
      } else {
        // If the status is unsuccessful, dispatch an error message action
        this.store.dispatch(setErrorMessage({ message: result.message }));
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authenticationStatusSubscription) {
      this.authenticationStatusSubscription.unsubscribe();
    }
  }
}



