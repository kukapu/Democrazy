import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { redirect, useNavigate } from "react-router-dom"
import { dataPonderation } from "../helpers/dataPonderation"
import { validatePonderation } from "../helpers/validatePonderation"
import { useForm } from "../hooks/useForm"
import { meVoted, startAddNewVote } from "../store"
import { AddParticipant } from "./AddParticipant"
import { VotationPonderationVoted } from "./VotationPonderationVoted"

export const VotationPonderation = ({ votationId }) => {

    const dispatch = useDispatch()
    const { user } = useSelector( state => state.auth )
    const { uidParticipants } = useSelector( state => state.votation )
    const { title, votation } = useSelector( state => state.result )
    const navigate = useNavigate()

    const [ votationDone, setVotationDone ] = useState(false)

    const baseFormField = votation.itemsVoted.map( item => {
        return { name: item, position: 0 }
    })

    const [formField, setFormField] = useState(baseFormField)


    const onChangePonderation = ( event, index ) => {
        let data = [ ...formField ]
        data[index][event.target.name] = event.target.value
        setFormField( data )
    }

    const onSubmit = ( event ) => {
        event.preventDefault()
        
        const formFieldValidated = validatePonderation( formField )
        
        if (typeof formFieldValidated === 'string') return
        const { itemsVoted, votationArray } = dataPonderation( formField )


        dispatch( startAddNewVote({ 
            votationId: votationId, 
            votation: { ...votation, [user.uid] : votationArray},
            uid: user.uid,
        }))
        dispatch( meVoted() )

        navigate('')

    }


    return (
        <div className="center">
            {
                ( votationDone )

                    ? <VotationPonderationVoted votationId={ votationId }  />
                    : (
                        <form onSubmit={ onSubmit }>
                            <div>
                                {
                                    formField.map( ( form, index ) => {
                                        return (
                                            <div key={ index }>
                                                <input
                                                    type="text"
                                                    placeholder="Que quieres hacer?"
                                                    readOnly
                                                    name="name"
                                                    value={ form.name }
                                                    onChange={ () => onChangeName( event, index )}
                                                />
                                                <input
                                                    type="number"
                                                    name="position"
                                                    required
                                                    value={ form.position }
                                                    onChange={ () => onChangePonderation( event, index )}
                                                />
                                            </div>

                                        )

                                    })
                                }
                                <br/>
                                <button onSubmit={ onSubmit }> Submit </button>
                            </div>
                        </form>
                    )
            }

            
        </div>
    )
}
