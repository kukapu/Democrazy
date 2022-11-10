import { democracyApi } from "../../api/democracyApi"

export const startCreateVotation = ({ type, title, votation, uidParticipants }) => {

    return async ( dispatch ) => {

        try {
            
            const resp = await democracyApi.post('/democracy/createVotation', { type, title, votation, uidParticipants })

        } catch (error) {
            console.log( error )
        }
    }
}

export const startAddNewVote = ({ votationId, votation, uid }) => {

    return async ( dispatch ) => {

        try {
            
            const resp = await democracyApi.post('/democracy/addVotation', { votationId, votation, uid })


        } catch (error) {
            console.log( error )
        }


    }
}

export const startDeleteVotation = ({ votationId, uidParticipants }) => {

    return async ( dispatch ) => {

        try {
            
            const { data } = await democracyApi.post('/democracy/delete', { votationId, uidParticipants })
            



        } catch (error) {
            console.log( error )
        }
    }
}
