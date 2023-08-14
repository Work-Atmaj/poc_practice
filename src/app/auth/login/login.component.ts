import { setErrorMessage, setLoadingSpinner } from './../../store/Shared/shared.actions';
import { loginStart } from './../state/auth.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { isUserStatus } from '../state/auth.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;


  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onLoginSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
  
    // const check$ = this.store.select(isUserStatus(email, password));
  
    // check$.subscribe(errorMsgs => {
  
    //   if (errorMsgs) {
    //     this.store.dispatch(loginStart({ email, password }));
    //   }else{
    //   this.store.dispatch(setErrorMessage({ message: errorMsgs }));
    //   }
    // });
        this.store.dispatch(loginStart({ email, password }));
  
    this.store.dispatch(setErrorMessage({ message: '' }));
  }
  handleButtonClick(id:string){
    console.log(id);
  }
}
