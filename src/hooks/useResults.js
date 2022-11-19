import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addvotationParticipating, getMyVotationsIds, gettingInfoVotationsFromUser, getallVotationsInfo, toggleCharging } from "../store"


export const useResults = () => {

    const dispatch = useDispatch()
    const { allVotationsInfo } = useSelector( state => state.result )
    const { user } = useSelector( state => state.auth )
    const [ allVotationList, setAllVotationList ] = useState(allVotationsInfo)

    const getInfoVotationFromUser = async( ) => {
        dispatch( toggleCharging( true ) )

        const votationParticipating =  await dispatch( gettingInfoVotationsFromUser({ uid: user.uid }) )
        dispatch( getallVotationsInfo( votationParticipating.infoVotations ))
        
        // const votationsIds = await dispatch( getMyVotationsIds({ uid: user.uid }))
        // dispatch( addvotationParticipating( votationsIds ))
        

        dispatch( toggleCharging( false ) )
    }


    return {
        allVotationList,
        setAllVotationList,

        getInfoVotationFromUser
    }
}
