import { createSlice } from '@reduxjs/toolkit';

export const compareSlice = createSlice({
    name: 'compare',
    initialState: {
        didIVote: false,
        didAllVote: false,
        votation: [],
        result: undefined,
        uidParticipants: []
    },
    reducers: {
        voting: ( state, { payload } ) => {
            state.didIVote = true
            state.votation = payload
        },
        addNewParticipant: ( state, { payload }) => {
            state.uidParticipants.push( payload )
        },
        meVoted: ( state ) => {
            state.didIVote = true
        }

    }
});


export const { voting, addNewParticipant, meVoted } = compareSlice.actions;