import { useContext } from 'react';

import { UserStateContext } from './utils';

const useUser = () => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

export { useUser };

export { UserProvider } from './user';