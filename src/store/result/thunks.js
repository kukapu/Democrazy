import { democracyApi } from "../../api/democracyApi"


export const getMyVotationsIds = ({ uid }) => {

    return async( dispatch ) => {
        
        try {
            const { data } = await democracyApi.post('/democracy/results', { uid }) 
            // console.log( data.votationParticipating )
            return data.votationParticipating

        } catch (error) {
            console.log( error )
        }

    }
}

export const gettingInfoVotationsFromUser = ({ uid }) => {

    return async( dispatch ) => {
        try {
            const { data } = await democracyApi.post('/democracy/results/info', { uid }) 
            // console.log( data )
            return data

        } catch (error) {
            console.log( error )
        }
    }
}

export const gettingInfoVotations = ({ votationId }) => {

    return async( dispatch ) => {
        
        try {
            const { data } = await democracyApi.post('/democracy/votations', { votationId }) 
            console.log( data )
            return data

        } catch (error) {
            console.log( error )
        }

    }
}

