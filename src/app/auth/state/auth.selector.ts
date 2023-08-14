import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';
export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthState, (state) => {
  return state.selected ? true : false;
});

export const isUserStatus = (email: string, password: string) =>
  createSelector(
    getAuthState, 
    (state) => {
      const user = state.user.find(sUser => sUser.email === email);

      if (!user) {
        return { status: false, message: 'User Does Not Exist' };
      } else if (user.password !== password) {
        return { status: false, message: 'Incorrect Password' };
      }

      return { status: true, message: 'Success' };
    }
  );


export const isAdmin = createSelector(getAuthState, (state) => {
  return state.selected ? state.selected.isAdmin:false;
});


