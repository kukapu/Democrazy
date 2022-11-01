import { createSlice } from '@reduxjs/toolkit';

export const resultSlice = createSlice({
    name: 'result',
    initialState: {
        type: '',
        title: '',
        votation: {},
        uidParticipants: [],
        id: '',
        allVotationsInfo: []
    },
    reducers: {
        getInfoResults: ( state, {payload} ) => {
            state.title = payload.title
            state.votation = payload.votation
            state.type = payload.type
            state.uidParticipants = payload.uidParticipants
            state.id = payload._id
        },
        getallVotationsInfo: ( state, { payload }) => {
            state.allVotationsInfo = payload
        }
    }
});


export const { getInfoResults, getallVotationsInfo } = resultSlice.actions;