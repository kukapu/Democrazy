import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { addvotationParticipating, gettingInfoVotations, getMyVotationsIds, gettingInfoVotationsFromUser, charging, charged, getallVotationsInfo, startDeleteVotation } from "../store"
import './Results.css'

export const Results = () => {

    const dispatch = useDispatch()
    const { user, isCharging } = useSelector( state => state.auth )
    const { allVotationsInfo } = useSelector( state => state.result )
    const [ allVotationList, setAllVotationList ] = useState( allVotationsInfo )
    const [showDelete, setShowDelete] = useState(false)

    const getInfoVotationFromUser = async( ) => {
        dispatch( charging() )

        const votationParticipating =  await dispatch( gettingInfoVotationsFromUser({ uid: user.uid }) )
        dispatch( getallVotationsInfo( votationParticipating.infoVotations ))
        // console.log( votationParticipating )
        const votationsIds = await dispatch( getMyVotationsIds({ uid: user.uid }))
        dispatch( addvotationParticipating( votationsIds ))

        dispatch( charged() )
    }

    useEffect(() => {

        getInfoVotationFromUser()
    
    }, [allVotationList])

    const onTaggleDelete = () => {
        setShowDelete( !showDelete )
        console.log(showDelete)
    }

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
            <button onClick={ onTaggleDelete }> Eliminar Votaciones </button>

            <ul className="listContainer">
                {
                    ( isCharging ) 
                        ? <h3> Cargando </h3>
                        : ( 
                            allVotationList.map( votation => {
                                return (
                                    <li key={ votation._id } className={`listItem ${ votation.type } listItemConteiner`}>
                                        <Link to={`/results/${votation._id}`} className="listLink">
                                            <span> { votation.type } </span>
                                            <span> { votation.title } </span>
                                        </Link>
                                        
                                        <button 
                                            className={`listDeleteButton ${showDelete ? 'show' : 'dispalyNone'}`}
                                            onClick={ () => votationDelete(votation._id, votation.uidParticipants )
                                        }> Eliminar </button>

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
