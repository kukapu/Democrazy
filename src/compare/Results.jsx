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
    const { allVotationList, setAllVotationList, getInfoVotationFromUser, getFisrtRender, votationDelete } = useResults()
    

    useEffect(() => {
        
        getFisrtRender()
    
    }, [])

    useEffect(() => {
        
        getInfoVotationFromUser()
    
    }, [allVotationList])
    
    const onTaggleDelete = () => {
        setShowDelete( !showDelete )
    }

  
 
    return (
        <div className="center">
            <div className="headerPart">
                <h1>Votaciones</h1>
                { (!allVotationList.length === 0) && <button className="input-button" onClick={ onTaggleDelete }> Eliminar votaciones </button> }
            </div>

            {   
                (allVotationList.length === 0)
                    ? <div> No participas en ninguna votacion </div>
                : <ul className="listContainer">
                    {
                        ( isCharging ) 
                            ? <h3> Cargando </h3>
                            : ( 
                                allVotationList.map( votation => {
                                    return (
                                        <li key={ votation?._id } className={`listItem ${ votation?.type } listItemConteiner`}>
                                            <Link to={`/results/${votation?._id}`} className="listLink">
                                                <span> { votation?.title } </span>
                                                <span> {` (${ votation?.type })`} </span>
                                            </Link>
                                            
                                            <button 
                                                className={`delete-result listDeleteButton ${showDelete ? 'show' : 'dispalyNone'}`}
                                                onClick={ () => votationDelete(votation._id, votation.uidParticipants )
                                            }> Eliminar </button>

                                        </li>
                                    )
                                })
                            )
                    }
                </ul>
            }
            
          
        </div>
    )
}
