import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { dataPonderation } from "../helpers/dataPonderation"
import { validatePonderation } from "../helpers/validatePonderation"
import { useForm } from "../hooks/useForm"
import { startCreateVotation } from "../store"
import { AddParticipant } from "./AddParticipant"
import { ponderationTitleForm } from "../helpers"
import { useNavigate } from "react-router-dom"

export const Ponderation = () => {

    const dispatch = useDispatch()
    const { user } = useSelector( state => state.auth )
    const { uidParticipants } = useSelector( state => state.votation )
    const navigate = useNavigate()

    const { title, onInputChange } = useForm( ponderationTitleForm )

    const [formField, setFormField] = useState([
        { name: '', position: 0 },
        { name: '', position: 0 },
        { name: '', position: 0 },
    ])

    const onChangeName = ( event, index ) => {
        let data = [ ...formField ]
        data[index][event.target.name] = event.target.value
        setFormField( data )
    }

    const onChangePonderation = ( event, index ) => {
        let data = [ ...formField ]
        data[index][event.target.name] = event.target.value
        setFormField( data )
    }


    const onAddCheck = () => {
        const newPosition = { name: '', position: 0 }
        setFormField( [ ...formField, newPosition ])
    }

    const onDeleteCheck = ( event, index ) => {
        let data = [ ...formField ]
        data.splice( index, 1 )
        setFormField( data )
    }

    const onSubmit = async( event ) => {
        event.preventDefault()
        
        const formFieldValidated = validatePonderation( formField )
        
        if (typeof formFieldValidated === 'string') return
        const { itemsVoted, votation } = dataPonderation( formField )


        dispatch( startCreateVotation({
            type: 'ponderation',
            title: title,
            votation: { 
                order: false,
                itemsVoted,
                [user.uid] : votation
            },
            uidParticipants,
        }))

        navigate('/')
    }


    return (
        <div className="center">
            <h1> Ponderation </h1>
            
            <AddParticipant />

            <input
                type="text"
                placeholder="Que quieres hacer"
                name="title"
                value={ title }
                onChange={ onInputChange }
            />
            <br/>

            <form onSubmit={ onSubmit }>
                <div>
                    {
                        formField.map( ( form, index ) => {
                            return (
                                <div key={ index }>
                                    <input
                                        type="text"
                                        placeholder="Que quieres hacer?"
                                        required

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
                                    <button onClick={ () => onDeleteCheck( event, index ) }> - </button>
                                </div>

                            )

                        })
                    }
                    <button onClick={ onAddCheck }> + </button>
                    <br/>
                    <button onSubmit={ onSubmit }> Submit </button>
                </div>
            </form>
        </div>
    )
}
