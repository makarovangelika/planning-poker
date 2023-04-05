import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './components/Main/RegistrationSlice';
import { saveToLocalStorage } from './localStorage';

export const store = configureStore({reducer: {
    registration: registrationReducer
}});



store.subscribe(() => saveToLocalStorage(store.getState().registration));
