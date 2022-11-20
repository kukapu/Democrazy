import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../hooks/useForm"
import { addNewParticipant, resetParticipant, startGetAllUsers, startInviteNewParticipants, toggleCharging } from "../store"
import { newParticipantForm } from '../helpers/constants'
import './AddParticipant.css'


export const AddParticipant = () => {

    const dispatch = useDispatch()
    const { user, isCharging } = useSelector( state => state.auth )
    const { uidParticipants } = useSelector( state => state.votation )

    const { newParticipant, onInputChange:onInputChangeNewParticipant, onResetForm }= useForm( newParticipantForm )

    const [ participants, setParticipants ] = useState([ user.name ])

    const [ listAllUsers, setListAllUsers ] = useState([])
    
    if( !uidParticipants.some( uid => uid === user.uid )){
        dispatch( addNewParticipant( user.uid ))
    }

    useEffect(() => {
        if( uidParticipants.length > 0) {
            dispatch( resetParticipant() )
        }

        dispatch( toggleCharging( true ))

        getAllUsersNames()
        
        dispatch( toggleCharging( false ))

    }, []) 
    

    const onSubmitNewParticipant = async( event ) => {

        event.preventDefault()

        const { uid, name } = await dispatch( startInviteNewParticipants({ newParticipant: newParticipant }))
        if( uidParticipants.some( participant => participant === uid) ) {
            // TODO alerta nombre ya añadido
            onResetForm()
            return
        }

        setParticipants([...participants, name ])

        dispatch( addNewParticipant( uid ) )
        onResetForm()
        
        
    }

    const getAllUsersNames = async() => {
        const { allUsersNames } = await dispatch( startGetAllUsers() )
        setListAllUsers( allUsersNames )
    }
    

    return (  
        <div className="container">
            <h2 className="title"> Añadir Participantes </h2>
            <div className="form-container">
                <form className="form" onSubmit={ onSubmitNewParticipant }>
                    <input
                        className="input-form"
                        type="text"
                        placeholder="nombre"
                        name="newParticipant"
                        value={ newParticipant }
                        onChange={ onInputChangeNewParticipant }
                        list="users-list"                
                    />
                    <input 
                        className="input-form"
                        type="submit"
                        value="+" 
                    />
                </form>

                <ul className="list-container">
                    { participants.map( participant => {
                        return (
                            <li className="list-item" key={ Math.random() }>{ participant }</li>
                        )
                    })}
                </ul>

            </div>
            
            <datalist id="users-list">
            {   
                (!isCharging && listAllUsers.map( user => {
                    return (
                        <option>{ user }</option>
                    )    
                }))
            }
            </datalist>    

        </div>
    )
}
