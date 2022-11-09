import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { dataMajority } from "../helpers/dataMajority"
import { uniqueVoteMajority } from "../helpers/uniqueVoteMajority"
import { validateMajority } from "../helpers/validateMajority"
import { useForm } from "../hooks/useForm"
import { startCreateVotation } from "../store"
import { AddParticipant } from "./AddParticipant"

const majorityForm = {
    title: ''
}

export const Majority = () => {

    const dispatch = useDispatch()
    const { title, onInputChange } = useForm( majorityForm )
    const { user } = useSelector( state => state.auth )
    const { uidParticipants } = useSelector( state => state.votation )

    const [multipleChoice, setMultipleChoice] = useState(false)

    const [formField, setFormField] = useState([
        { name: '', checked: false },
        { name: '', checked: false },
        { name: '', checked: false },
    ])

    const onChangeName = ( event, index ) => {
        let data = [ ...formField ]
        data[index][event.target.name] = event.target.value
        setFormField( data )
    }

    const onChangeCheck = ( event, index ) => {
        let data = [ ...formField ]
        data[index].checked = event.target.checked
        setFormField( data )
    } 

    const onAddCheck = () => {
        const newCheck = { name: '', checked: false }
        setFormField( [ ...formField, newCheck ])
    }

    const onDeleteCheck = ( event, index ) => {
        let data = [ ...formField ]
        data.splice( index, 1 )
        setFormField( data )
    }
    
    const onSubmit = ( event ) => {
        event.preventDefault()

        let validateFormField = validateMajority( formField )

        if( validateFormField.checked === 'Hay que elegir una opcion' ) return

        if( !multipleChoice ) {
            validateFormField = uniqueVoteMajority( formField )
        }


        if( validateFormField.checked === 'Solo puedes elegir una opcion' ) return 
        const { itemsVoted, votation } = dataMajority( validateFormField )
        console.log( itemsVoted, votation )


        dispatch( startCreateVotation({
            type: 'majority',
            title: title,
            votation: { 
                multipleChoice,
                itemsVoted,
                [user.uid] : votation
            },
            uidParticipants,
        }))
    }


    return (
        <div className="center">
            <h1> Mayoria </h1>

            <AddParticipant />

            <input
                type="text"
                placeholder="Que quieres hacer"
                name="title"
                value={ title }
                onChange={ onInputChange }
            />
            <br/>
            <input
                type="checkbox"
                value={ multipleChoice }
                onChange={ () => setMultipleChoice(!multipleChoice) }
            />
            
            <form onSubmit={ onSubmit }>
                <div>
                    {
                        formField.map( ( form, index ) => {
                            return (
                                <div key={ index }>
                                    <input
                                        type="text"
                                        placeholder="Que quieres hacer?"
                                        name="name"
                                        required
                                        value={ form.name }
                                        onChange={ () => onChangeName( event, index )}
                                    />
                                    <input 
                                        type="checkbox"
                                        value={ form.checked }
                                        onChange={ () => onChangeCheck( event, index )}
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
