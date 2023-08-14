import { User } from './../../models/user.model';
export interface AuthState {
  user: User[];
  selected: User|null;
}

export const initialState: AuthState = {
  user: [new User("test@test.com", "123456", true)],
  selected: null
};
