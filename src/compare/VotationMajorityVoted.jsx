import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getInfoResults, meVoted } from "../store"
import { VotationMajority } from "./VotationMajority"

export const VotationMajorityVoted = ({ votationId }) => {

    const dispatch = useDispatch()
    const { user } = useSelector( state => state.auth )
    const { uidParticipants } = useSelector( state => state.compare )
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
                            <VotationMajority votationId={ votationId } />
                            <button onClick={ toggleVotation }> DEJAR DE EDITAR </button>
                        </>
                    )
            }
            
        </>
    )
}
