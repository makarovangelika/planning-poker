import { createSlice } from '@reduxjs/toolkit';
import { Registration } from '../../models';
import { loadFromLocalStorage } from '../../localStorage';

let initialState: Registration | null = loadFromLocalStorage();

const registrationSlice = createSlice({
    name: 'registration',
    initialState: initialState,
    reducers: {
        register: (state, action) => action.payload
    }
});

export default registrationSlice.reducer;
export const { register } = registrationSlice.actions;