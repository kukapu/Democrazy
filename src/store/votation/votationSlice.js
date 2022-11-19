import { createSlice } from '@reduxjs/toolkit';

export const votationSlice = createSlice({
    name: 'votation',
    initialState: {
        didIVote: false,
        votation: [],
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


export const { voting, addNewParticipant, meVoted } = votationSlice.actions;