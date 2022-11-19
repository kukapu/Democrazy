import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getInfoResults, meVoted } from "../store"
import { VotationCompare } from "./VotationCompare"
import { VotationCompareResult } from "./VotationCompareResult"

export const VotationCompareVoted = ({ votationId }) => {

    const dispatch = useDispatch()
    const { user } = useSelector( state => state.auth )
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
                            <VotationCompareResult toggleVotation={toggleVotation}/>
                        </>
                    )
                    : (
                        <>
                            <VotationCompare votationId={ votationId } />
                            <button onClick={ toggleVotation }> DEJAR DE EDITAR </button>
                        </>
                    )
            }
            
        </>
    )
}
