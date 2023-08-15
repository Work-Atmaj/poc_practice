import { signupStart } from './../state/auth.actions';
import { setErrorMessage, setLoadingSpinner } from './../../store/Shared/shared.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { User } from 'src/app/models/user.model';
import { Subscription, take } from 'rxjs';
import { Router } from '@angular/router';
import { checkUserExist } from '../state/auth.selector';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit,OnDestroy {
  signUpForm!: FormGroup;
  isAdmin: boolean = false;
  private authenticationStatusSubscription: Subscription | undefined;

  constructor(private store: Store<AppState>,private router:Router) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSignUpSubmit() {
    if (!this.signUpForm.valid) {
      return;
    }
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    const isAdminsignup = this.isAdmin;
    this.store.select(checkUserExist(email)).pipe(
      take(1) 
    ).subscribe(result => {
      if (result.status) {
      this.store.dispatch(signupStart({ user: new User(email,password,isAdminsignup)}));
      this.router.navigate(['/auth/login']);
      this.store.dispatch(setErrorMessage({ message: "" }));
      } else {
        this.store.dispatch(setErrorMessage({ message: result.message }));
      }
    });
  }
  selectAdmin(){
    this.isAdmin=!this.isAdmin;
  }

  ngOnDestroy(): void {
    if (this.authenticationStatusSubscription) {
      this.authenticationStatusSubscription.unsubscribe();
    }
  }
}
