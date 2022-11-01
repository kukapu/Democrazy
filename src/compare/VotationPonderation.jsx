import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { redirect } from "react-router-dom"
import { dataPonderation } from "../helpers/dataPonderation"
import { validatePonderation } from "../helpers/validatePonderation"
import { useForm } from "../hooks/useForm"
import { meVoted, startAddNewVote, startCreateMajority } from "../store"
import { AddParticipant } from "./AddParticipant"
import { VotationPonderationVoted } from "./VotationPonderationVoted"

export const VotationPonderation = ({ votationId }) => {

    const dispatch = useDispatch()
    const { user } = useSelector( state => state.auth )
    const { uidParticipants } = useSelector( state => state.compare )
    const { title, votation } = useSelector( state => state.result )

    const [ votationDone, setVotationDone ] = useState(false)

    const baseFormField = votation.itemsVoted.map( item => {
        return { name: item, position: 0 }
    })

    const [formField, setFormField] = useState(baseFormField)


    const onChangePonderation = ( event, index ) => {
        // console.log(event)
        let data = [ ...formField ]
        data[index][event.target.name] = event.target.value
        setFormField( data )
    }

    const onSubmit = ( event ) => {
        event.preventDefault()
        
        const formFieldValidated = validatePonderation( formField )
        
        if (typeof formFieldValidated === 'string') return
        // console.log(formFieldValidated) 
        const { itemsVoted, votationArray } = dataPonderation( formField )
        console.log(itemsVoted, votation)


        dispatch( startAddNewVote({ 
            votationId: votationId, 
            votation: { ...votation, [user.uid] : votationArray},
            uid: user.uid,
        }))
        dispatch( meVoted() )

        setVotationDone( true )


    }


    return (
        <div className="center">
            {
                ( votationDone )
            
                    // TODO: VALIDACION DEL MULTICHECK Y ENSEÑAR QUE FORMA TIENE
                  

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
