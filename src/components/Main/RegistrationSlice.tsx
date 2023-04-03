import { createSlice } from '@reduxjs/toolkit';

const registrationSlice = createSlice({
    name: 'registration',
    initialState: null,
    reducers: {
        register: (state, action) => action.payload
    }
});

export default registrationSlice.reducer;
export const { register } = registrationSlice.actions;