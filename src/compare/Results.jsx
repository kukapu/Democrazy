import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { addvotationParticipating, gettingInfoVotations, getMyVotationsIds, gettingInfoVotationsFromUser, charging, charged, getallVotationsInfo, startDeleteVotation } from "../store"

export const Results = () => {

    const dispatch = useDispatch()
    const { user, isCharging } = useSelector( state => state.auth )
    const { allVotationsInfo } = useSelector( state => state.result )
    const [ allVotationList, setAllVotationList ] = useState( allVotationsInfo )

    const getInfoVotationFromUser = async( ) => {
        dispatch( charging() )

        const votationParticipating =  await dispatch( gettingInfoVotationsFromUser({ uid: user.uid }) )
        dispatch( getallVotationsInfo( votationParticipating.infoVotations ))
        // console.log( votationParticipating )
        const votationsIds = await dispatch( getMyVotationsIds({ uid: user.uid }))
        dispatch( addvotationParticipating( votationsIds ))

        dispatch( charged() )
    }

    const getInfoVotationFromUserRender = async( ) => {
        const votationParticipating =  await dispatch( gettingInfoVotationsFromUser({ uid: user.uid }) )
        dispatch( getallVotationsInfo( votationParticipating.infoVotations ))
    }

    useEffect(() => {

        getInfoVotationFromUser()
    
    }, [])

    useEffect(() => {

        getInfoVotationFromUserRender()
    
    }, [allVotationList])
    

    const votationDelete = ( votationId, uidParticipants ) => {
        // console.log(votationId)
        dispatch( charging() )
        dispatch( startDeleteVotation({ votationId, uidParticipants }))
        // console.log(renderList)
        // console.log(renderList.filter( votation => votation._id !== votationId ))
        setAllVotationList( allVotationList.filter( votation => votation._id !== votationId ))
        dispatch( charged() )
    }

    // const prueba = () => {
    //     console.log( allVotationsInfo )
    // }
 
    return (
        <div className="center">
            <h1>Votaciones</h1>

            <ul>
                {
                    ( isCharging ) 
                        ? <h3> Cargando </h3>
                        : ( 
                            allVotationList.map( votation => {
                                return (
                                    <li key={ votation._id }>
                                        <Link to={`/results/${votation._id}`}>
                                            { votation.title }
                                            <span> { votation.type } </span>
                                        </Link>
                                        
                                        <button onClick={ () => votationDelete(votation._id, votation.uidParticipants ) }> - </button>

                                    </li>
                                )
                            })
                        )
                }
            </ul>
          
            {/* <button onClick={ prueba }> PRESS </button> */}
            
        </div>
    )
}
