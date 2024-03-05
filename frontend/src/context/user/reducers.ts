import { initialValues } from './utils';

import type { Action, State } from './types';

export function userReducer(state: State, action: Action) {
  switch (action.type) {
    case 'setUser': {
      return {
        ...state,
        user: action.user,
      };
    }
    case 'setToken': {
      return {
        ...state,
        token: action.token,
      };
    }
    case 'setLoading': {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case 'logout': {
      return {
        ...state,
        initialValues,
      };
    }
    default: {
      throw new Error('Error - unknown action type');
    }
  }
}
