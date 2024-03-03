import type { ReactNode } from 'react';
import { useReducer, useEffect, useCallback } from 'react';

import { userReducer } from './reducers';
import { UserStateContext, initialValues } from './utils';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialValues);

  const { user, token, loading } = state;

  const value = {
    user,
    token,
    loading,
    userDispatch: dispatch,
  };

  const tryFetchingNewToken = useCallback(async () => {
    try {
      console.log('Fetching new access token...');
      const response = await fetch('/api/auth/access-token', { method: 'POST', credentials: 'include' });
      if (!response.ok) {
        throw new Error('Unauthorized');
      }
      const data = await response.json();
      dispatch({ type: 'setToken', token: data.token });
    } catch (error) {
      dispatch({ type: 'setLoading', payload: false });
    }
  }, [dispatch]);

  const getUser = useCallback(async () => {
    try {
      const response = await fetch('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
      const data = await response.json();
      dispatch({ type: 'setUser', user: data.user });
    } catch (error) {
      tryFetchingNewToken();
    }
  }, [tryFetchingNewToken, token]);

  useEffect(() => {
    if (!user && loading) {
      getUser();
    }
  }, [getUser, user, loading])

  if (!user && loading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }
  return <UserStateContext.Provider value={value}>{children}</UserStateContext.Provider>;
};
