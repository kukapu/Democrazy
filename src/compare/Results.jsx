import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useResults } from "../hooks/useResults"
import { addvotationParticipating, getMyVotationsIds, gettingInfoVotationsFromUser, getallVotationsInfo, startDeleteVotation, toggleCharging } from "../store"
import './Results.css'

export const Results = () => {

    const dispatch = useDispatch()
    const { isCharging } = useSelector( state => state.auth )
    const [ showDelete, setShowDelete ] = useState(false)
    const { allVotationList, setAllVotationList, getInfoVotationFromUser } = useResults()
    
    useEffect(() => {
        
        getInfoVotationFromUser()
    
    }, [allVotationList])

    const onTaggleDelete = () => {
        setShowDelete( !showDelete )
    }

    const votationDelete = ( votationId, uidParticipants ) => {
        dispatch( toggleCharging( true ) )
        dispatch( startDeleteVotation({ votationId, uidParticipants }))
        setAllVotationList( () => allVotationList.filter( votation => votation._id !== votationId ))
        dispatch( toggleCharging( false ) )
    }
 
    return (
        <div className="center">
            <div className="headerPart">
                <h1>Votaciones</h1>
                <button onClick={ onTaggleDelete }> Eliminar Votaciones </button>
            </div>

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
          
        </div>
    )
}
