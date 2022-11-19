import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../hooks/useForm"
import { addNewParticipant, startInviteNewParticipants } from "../store"
import { newParticipantForm } from '../helpers/constants'


export const AddParticipant = () => {

    const dispatch = useDispatch()
    const { user } = useSelector( state => state.auth )
    const { uidParticipants } = useSelector( state => state.votation )

    const { newParticipant, onInputChange:onInputChangeNewParticipant }= useForm( newParticipantForm )

    const [ participants, setParticipants ] = useState([ user.name ])

    useEffect(() => {
        if( !uidParticipants.some( uid => uid === user.uid )){
            dispatch( addNewParticipant( user.uid ))
        }

    }, []) 
    

    const onSubmitNewParticipant = async( event ) => {

        event.preventDefault()
        const { uid, name } = await dispatch( startInviteNewParticipants({ newParticipant: newParticipant }))
        if( uidParticipants.some( participant => participant === uid )) return

        setParticipants([...participants, name ])
        dispatch( addNewParticipant( uid ) )

    }

    return (  
        <>
            <h2> Añadir Participantes </h2>
            <form onSubmit={ onSubmitNewParticipant }>
                <input
                    type="text"
                    placeholder="añadir participante"
                    name="newParticipant"
                    value={ newParticipant }
                    onChange={ onInputChangeNewParticipant }
                    list="wizards-list"                
                />
                <input 
                    type="submit"
                    value="+" 
                />
            </form>

            <ul>
                { participants.map( participant => {
                    return (
                        <li key={ Math.random() }>{ participant }</li>
                    )
                })}
            </ul>
            <datalist id="wizards-list">
                <option>Harry Potter</option>
                <option>Hermione</option>
                <option>Dumbledore</option>
                <option>Merlin</option>
                <option>Gandalf</option>
            </datalist>

        </>
    )
}
