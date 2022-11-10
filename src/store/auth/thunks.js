import { democracyApi } from "../../api/democracyApi"
import { addvotationParticipating, charged, charging, login } from "./authSlice"

export const startLogin = ({ email, password }) => {

    return async( dispatch ) => {
        dispatch( charging )

        try {
            const { data } = await democracyApi.post('/auth',{ email, password })

            

            dispatch( login({ name: data.name, uid: data.uid }))

        } catch (error) {
            console.log(error)
        }



        dispatch( charged )
    }
}

export const startRegister = ({ name, email, password }) => {

    return async( dispatch ) => {
        dispatch( charging )

        try {
            const { data } = await democracyApi.post('/auth/register',{ name, email, password })
            

            dispatch( login({ name: data.name, uid: data.uid }))

        } catch (error) {
            console.log(error)
        }


        dispatch( charged )
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
