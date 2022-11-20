import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addvotationParticipating, getMyVotationsIds, gettingInfoVotationsFromUser, getallVotationsInfo, toggleCharging, startDeleteVotation } from "../store"


export const useResults = () => {

    const dispatch = useDispatch()
    const { allVotationsInfo } = useSelector( state => state.result )
    const { user } = useSelector( state => state.auth )
    const [ allVotationList, setAllVotationList ] = useState([])

    const getFisrtRender = async() => {
        dispatch( toggleCharging( true ) )

        const { infoVotations } =  await dispatch( gettingInfoVotationsFromUser({ uid: user.uid }) )
        setAllVotationList( infoVotations )

        dispatch( toggleCharging( false ) )
    }

    const getInfoVotationFromUser = async( ) => {
        dispatch( toggleCharging( true ) )

        const { infoVotations } =  await dispatch( gettingInfoVotationsFromUser({ uid: user.uid }) )

        dispatch( getallVotationsInfo( infoVotations ))
        
        const votationsIds = await dispatch( getMyVotationsIds({ uid: user.uid }))
        dispatch( addvotationParticipating( votationsIds ))
        

        dispatch( toggleCharging( false ) )
    }

    const votationDelete = ( votationId, uidParticipants ) => {
        dispatch( startDeleteVotation({ votationId, uidParticipants }))
        setAllVotationList( allVotationList.filter( votation => votation._id !== votationId ))
    }

    return {
        allVotationList,
        setAllVotationList,

        getInfoVotationFromUser,
        getFisrtRender,
        votationDelete
    }
}
