import { democracyApi } from "../../api/democracyApi"
import { voting } from "./compareSlice"


// export const startCreateTemplate = ( wannaDo ) => {
//     return async ( dispatch ) => {
//     }
// }

export const startCreateCompare = ( { type, title, votation, uidParticipants } ) => {

    return async ( dispatch ) => {
        
        
        try {

            dispatch( voting( votation ))
            // console.log({ wannaDo, votation } )
            const resp = await democracyApi.post('/democracy/compare', { type, title, votation, uidParticipants })
        
            console.log(resp)
            // const votationID = resp.data.id

        } catch (error) {
            console.log(error)
        }

    }
}

export const startAddNewVote = ({ votationId, votation, uid }) => {

    return async ( dispatch ) => {

        try {
            
            const resp = await democracyApi.post('/democracy/compare/add', { votationId, votation, uid })
            // console.log(resp)


        } catch (error) {
            console.log( error )
        }


    }
}

export const startCreateMajority = ({ type, title, votation, uidParticipants }) => {

    return async ( dispatch ) => {

        try {
            
            const resp = await democracyApi.post('/democracy/majority', { type, title, votation, uidParticipants })
            console.log(resp)
            



        } catch (error) {
            console.log( error )
        }
    }
}

export const startCreateVotation = ({ type, title, votation, uidParticipants }) => {

    return async ( dispatch ) => {

        try {
            
            const resp = await democracyApi.post('/democracy/createVotation', { type, title, votation, uidParticipants })
            console.log(resp)
            



        } catch (error) {
            console.log( error )
        }
    }
}

export const startDeleteVotation = ({ votationId, uidParticipants }) => {

    return async ( dispatch ) => {

        try {
            
            const { data } = await democracyApi.post('/democracy/delete', { votationId, uidParticipants })
            console.log(data)
            



        } catch (error) {
            console.log( error )
        }
    }
}
