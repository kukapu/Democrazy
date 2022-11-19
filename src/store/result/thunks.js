import { democracyApi } from "../../api/democracyApi"
import { toggleCharging } from "../auth"


export const getMyVotationsIds = ({ uid }) => {

    return async( dispatch ) => {
        
        try {
            const { data } = await democracyApi.post('/democracy/results', { uid }) 
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
            return data

        } catch (error) {
            console.log( error )
        }

    }
}

