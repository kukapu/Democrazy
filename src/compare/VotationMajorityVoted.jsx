import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getInfoResults, meVoted } from "../store"
import { VotationMajority } from "./VotationMajority"
import { VotationMajorityResult } from "./VotationMajorityResult"

export const VotationMajorityVoted = ({ votationId }) => {

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
                            <VotationMajorityResult toggleVotation={toggleVotation}/>
                        </>
                    )
                    : (
                        <>
                            <VotationMajority votationId={ votationId } />
                            <button className="cancel-button" onClick={ toggleVotation }> Cancelar </button>
                        </>
                    )
            }
            
        </>
    )
}
