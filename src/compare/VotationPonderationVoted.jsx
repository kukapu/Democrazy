import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getInfoResults, meVoted } from "../store"
import { VotationPonderation } from "./VotationPonderation"
import { VotationPonderationResult } from "./VotationPonderationResult"
import '../index.css'


export const VotationPonderationVoted = ({ votationId }) => {

    const dispatch = useDispatch()
    const { user, didIVote } = useSelector( state => state.auth )
    const { uidParticipants } = useSelector( state => state.votation )
    const { allVotationsInfo } = useSelector( state => state.result )

    const [ votationDone, setVotationDone ] = useState(true)
    

    useEffect(() => {
        allVotationsInfo.map( votation => {
            if( votation._id === votationId ) {
                dispatch( getInfoResults( votation ) )
                dispatch( meVoted() )
            }
        })
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
                            <VotationPonderationResult toggleVotation={toggleVotation}/>
                        </>
                    )
                    : (
                        <>
                            <VotationPonderation votationId={ votationId } />
                            <button className="input-button" onClick={ toggleVotation }> Cancelar </button>
                        </>
                    )
            }
            
        </>
    )
}
