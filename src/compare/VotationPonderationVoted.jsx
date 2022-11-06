import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getInfoResults, meVoted } from "../store"
import { VotationPonderation } from "./VotationPonderation"

export const VotationPonderationVoted = ({ votationId }) => {

    const dispatch = useDispatch()
    const { user, didIVote } = useSelector( state => state.auth )
    const { uidParticipants } = useSelector( state => state.votation )
    const { allVotationsInfo } = useSelector( state => state.result )

    const [ votationDone, setVotationDone ] = useState(true)
    

    useEffect(() => {
        allVotationsInfo.map( votation => {
            if( votation._id === votationId ) {
                // console.log( votationId )
                // console.log( votation )
                dispatch( getInfoResults( votation ) )
                dispatch( meVoted() )
            }
        })
        // console.log( votationId )
    }, [])
    
    const toggleVotation = () => {
        setVotationDone( !votationDone )
    }

    return (
        <>  
            {
                ( votationDone )
                    ? (
                        <>
                            <h3> Ya has votado </h3>
                            <h3> Esperando Resultados... </h3>
                            <button onClick={ toggleVotation }> EDITAR VOTACION </button>
                        </>
                    )
                    : (
                        <>
                            <VotationPonderation votationId={ votationId } />
                            <button onClick={ toggleVotation }> DEJAR DE EDITAR </button>
                        </>
                    )
            }
            
        </>
    )
}
