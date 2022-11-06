import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../hooks/useForm"
import { addNewParticipant, startInviteNewParticipants } from "../store"

const newParticipantForm = {
    newParticipant: ''
}

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
        // console.log(participants)
        // console.log(uidParticipants)
        const { uid, name } = await dispatch( startInviteNewParticipants({ newParticipant: newParticipant }))
        // console.log(uid)
        // console.log(uid)
        // console.log(name)
        if( uidParticipants.some( participant => participant === uid )) return

        setParticipants([...participants, name ])
        //INFO DE LA STORE??? CONSEGUIR RENDERIZAR LISTA PARTICIPANTES Y ACTUALIZAR LA DE DB
        // console.log(uid)
        dispatch( addNewParticipant( uid ) )
        // console.log(participants)
        // console.log(uidParticipants)

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

        </>
    )
}
