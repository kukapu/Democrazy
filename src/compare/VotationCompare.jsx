import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../hooks/useForm"
import { getInfoResults, meVoted, startAddNewVote } from "../store"
import { VotationCompareVoted } from "./VotationCompareVoted"
import { compareFormVotation } from "../helpers"
import { useNavigate } from "react-router-dom"

export const VotationCompare = ({ votationId }) => {

    const dispatch = useDispatch()
    const { user, didIVote } = useSelector( state => state.auth )
    const { uidParticipants } = useSelector( state => state.votation )
    const { allVotationsInfo, votation } = useSelector( state => state.result )
    const navigate = useNavigate()
    const [ votationDone, setVotationDone ] = useState(false)
    
    const { userWannaRate, userRequireRate, onInputChange } = useForm( compareFormVotation ) 

    useEffect(() => {
        allVotationsInfo.map( votation => {
            if( votation._id === votationId ) {
                dispatch( getInfoResults( votation ) )
            }
        })
    }, [])
    

    const onSubmitCompare = ( event ) => {
        event.preventDefault()

        if( userWannaRate > 10 || userWannaRate < 0 || userWannaRate.length === 0  ) return
        if( userRequireRate > 10 || userRequireRate < 0 || userRequireRate.length === 0  ) return

        dispatch( startAddNewVote({ 
            votationId: votationId, 
            votation: { ...votation, [user.uid] : [ userWannaRate, userRequireRate ]},
            uid: user.uid,
        }))
        dispatch( meVoted() )
        navigate('/')
    }

    return (

        ( votationDone )
            ? <VotationCompareVoted votationId={ votationId } />
            : (
                <div className="center">

                    <form onSubmit={ onSubmitCompare }>
                        <div>
                            <input 
                                type="number"
                                placeholder="Cuanto te apetece?"
                                name="userWannaRate"
                                value={ userWannaRate }
                                onChange= { onInputChange }
                            />
                        </div>
                        <div>
                            <input 
                                type="number"
                                placeholder="Cuanto para hacerlo?"
                                name="userRequireRate"
                                value={ userRequireRate }
                                onChange= { onInputChange }
                            />
                        </div>

                        <div>
                            <input 
                                type="submit"
                                value="Guardar" 
                            />
                        </div>
            

                    </form>
                </div>
            )
    )
}

