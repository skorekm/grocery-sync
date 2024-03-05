type Dispatch = (action: Action) => void;

export type UserRoleType = 'ADMIN' | 'MEMBER';

export interface UserInterface {
  email: string;
}

export type Action =
  | {
      type: 'setUser';
      user: UserInterface;
    }
  | {
      type: 'logout';
    }
  | {
      type: 'setToken';
      token: string;
    }
  | {
      type: 'setLoading';
      payload: boolean;
    };
  

export interface State {
  user: UserInterface;
  token: string;
  loading: boolean;
}

export interface UserContextInterface extends State {
  userDispatch: Dispatch;
}
