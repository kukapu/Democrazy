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
        charging: ( state ) => {
            state.isCharging = true
        },
        charged: ( state ) => {
            state.isCharging = false
        },
        addvotationParticipating: ( state, { payload }) => {
            state.votationParticipating = payload
        }
    }
});


export const { login, logout, charging, charged, addvotationParticipating } = authSlice.actions;