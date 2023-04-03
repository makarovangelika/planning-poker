import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './components/Main/RegistrationSlice';

export const store = configureStore({reducer: {
    registration: registrationReducer
}});