import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createContext } from 'react';

export interface IUserContext extends FirebaseAuthTypes.User {}

export const UserContext = createContext({} as IUserContext);