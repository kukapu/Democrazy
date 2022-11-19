import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogged: false,
        isCharging: false,
        user: {},
        votationParticipating: []
    },
    reducers: {
        login: ( state, { payload }) => {
            state.isLogged = true
            state.user = payload
        },
        logout: ( state ) => {
            state.isLogged = false
            state.user = {}
        }, 
        toggleCharging: ( state, { payload } ) => {
            state.isCharging = payload
        },
        addvotationParticipating: ( state, { payload }) => {
            state.votationParticipating = payload
        }
    }
});


export const { login, logout, toggleCharging, addvotationParticipating } = authSlice.actions;