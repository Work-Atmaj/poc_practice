import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeoutInterval: any;
  constructor(private store: Store<AppState>) {}

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
        return 'Email already exists';
      default:
        return 'Unknown error occurred. Please try again';
    }
  }

  // setUserInLocalStorage(user: User) {
  //   localStorage.setItem('userData', JSON.stringify(user));
  // }

  // getUserFromLocalStorage() {
  //   const userDataString = localStorage.getItem('userData');
  //   if (userDataString) {
  //     const userData = JSON.parse(userDataString);
  //     const expirationDate = new Date(userData.expirationDate);
  //     const user = new User(
  //       userData.email,
  //       userData.isAdmin,
  //     );
  //     return user;
  //   }
  //   return null;
  // }

  logout() {
    localStorage.removeItem('userData');
  }
}
