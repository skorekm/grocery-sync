import { createContext } from 'react';

import type { UserContextInterface, State } from './types';

export const UserStateContext = createContext<UserContextInterface | undefined>(undefined);

export const initialValues = {
  user: null,
  token: '',
  loading: true,
} as unknown as State;
