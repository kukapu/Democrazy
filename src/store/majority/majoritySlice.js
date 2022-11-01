import { createSlice } from '@reduxjs/toolkit';

export const majoritySlice = createSlice({
    name: 'majority',
    initialState: {
        voting: {},

    },
    reducers: {
        add: ( state, { payload } ) => {
            state.voting.push( payload )
        },
    }
});


export const { add  } = majoritySlice.actions;