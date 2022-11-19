import { useSelector } from "react-redux"
import { democracyApi } from "../../api/democracyApi"
import { addvotationParticipating, login, toggleCharging } from "./authSlice"

export const startLogin = ({ email, password }) => {


    return async( dispatch ) => {
        dispatch( toggleCharging ( true ) )

        try {
            const { data } = await democracyApi.post('/auth',{ email, password })

            dispatch( login({ name: data.name, uid: data.uid }))

        } catch (error) {
            console.log(error)
        }



        dispatch( toggleCharging ( false ) )
    }
}

export const startRegister = ({ name, email, password }) => {

    return async( dispatch ) => {
        dispatch( toggleCharging ( true ) )

        try {
            const { data } = await democracyApi.post('/auth/register',{ name, email, password })
            

            dispatch( login({ name: data.name, uid: data.uid }))

        } catch (error) {
            console.log(error)
        }


        dispatch( toggleCharging ( false ) )
    }
}

export const startInviteNewParticipants = ( newParticipant ) => {

    return async( dispatch ) => {

        try {
            const { data } = await democracyApi.post('/new', newParticipant )
            return data


        } catch (error) {
            console.log(error)
        }
    }

}

export const startGetAllUsers = () => {

    return async( dispatch ) => {

        try {
            const { data } = await democracyApi.post('/new/getAllParticipants')
            return data
            
        } catch (error) {
            console.log(error)
        }

    }
}