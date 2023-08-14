import { loginSuccess, loginFailed, signupStart, loginStart } from './auth.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { AuthState, initialState } from './auth.state';

const _authReducer = createReducer(
  initialState,
  on(loginStart, (state, action) => {    
     const user =state.user.filter(sUser => sUser.email === action.email && sUser.password === action.password)
     if (user.length<0) {
      return {
        ...state,
      };
    }else{
      return {
        ...state,
       selected:user[0]
      };
    }
  }),
  on(signupStart, (state, action) => {
    console.log(state,action);
    
    return {
      ...state,
      user: [...state.user,action.user],
    };
  }),
  on(loginFailed, (state,action) => {
    return {
      ...state,
      user:[...state.user],
    };
  }
));

export function AuthReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
