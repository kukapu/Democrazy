import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../hooks/useForm"
import { addNewParticipant, startGetAllUsers, startInviteNewParticipants, toggleCharging } from "../store"
import { newParticipantForm } from '../helpers/constants'


export const AddParticipant = () => {

    const dispatch = useDispatch()
    const { user, isCharging } = useSelector( state => state.auth )
    const { uidParticipants } = useSelector( state => state.votation )

    const { newParticipant, onInputChange:onInputChangeNewParticipant }= useForm( newParticipantForm )

    const [ participants, setParticipants ] = useState([ user.name ])

    let listAllUsers = []


    useEffect(() => {
        dispatch( toggleCharging( true ))

        if( !uidParticipants.some( uid => uid === user.uid )){
            dispatch( addNewParticipant( user.uid ))
        }
        getAllUsersNames()

        dispatch( toggleCharging( false ))

    }, []) 
    

    const onSubmitNewParticipant = async( event ) => {

        event.preventDefault()
        const { uid, name } = await dispatch( startInviteNewParticipants({ newParticipant: newParticipant }))
        if( uidParticipants.some( participant => participant === uid )) return

        setParticipants([...participants, name ])
        dispatch( addNewParticipant( uid ) )
    }

    const getAllUsersNames = async() => {
        const { allUsersNames } = await dispatch( startGetAllUsers() )
        listAllUsers = allUsersNames
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
                    list="users-list"                
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

            {   
                (isCharging)
                    ? <datalist></datalist>
                    : ( listAllUsers?.map( user => {
                        return (
                            <datalist>{ user }</datalist>
                        )    
                    }))
            }

        </>
    )
}
