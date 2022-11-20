import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { dataPonderation } from "../helpers/dataPonderation"
import { validatePonderation } from "../helpers/validatePonderation"
import { useForm } from "../hooks/useForm"
import { startCreateVotation } from "../store"
import { AddParticipant } from "./AddParticipant"
import { ponderationTitleForm } from "../helpers"
import { useNavigate } from "react-router-dom"
import '../index.css'

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
                className="input-general-form title-form"
                type="text"
                placeholder="¿Que quieres votar?"
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
                                <div key={ index } className="flex-container">
                                    <input
                                        className="input-checkbox-text"
                                        type="text"
                                        placeholder="Opciones"
                                        required
                                        name="name"
                                        value={ form.name }
                                        onChange={ () => onChangeName( event, index )}
                                    />
                                    <input
                                        className="input-checkbox-text input-number"
                                        type="number"
                                        placeholder="0 al 10"
                                        required
                                        name="position"
                                        value={ form.position }
                                        onChange={ () => onChangePonderation( event, index )}
                                    />
                                    <button onClick={ () => onDeleteCheck( event, index ) }> Eliminar </button>
                                </div>

                            )

                        })
                    }
                    <button onClick={ onAddCheck }> Añadir </button>
                    <br/>
                    <button className="input-button" onSubmit={ onSubmit }> Guardar </button>
                </div>
            </form>
        </div>
    )
}
