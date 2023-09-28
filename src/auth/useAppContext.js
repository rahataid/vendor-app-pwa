import { useContext } from 'react';
//
import { AppContext } from './AppContext';
// import { AuthContext } from './Auth0Context';
// import { AuthContext } from './FirebaseContext';
// import { AuthContext } from './AwsCognitoContext';
// ----------------------------------------------------------------------

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) throw new Error('useAppContext context must be use inside AppProvider');

  return context;
};
