import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../hooks/useForm"
import { addNewParticipant, startVoting } from "../store"
import { AddParticipant } from "./AddParticipant"

const compareForm = {
    wannaDo: '',
    userWannaRate: '',
    userRequireRate: '',
}

export const Compare = () => {

    const dispatch = useDispatch()
    const { user } = useSelector( state => state.auth )
    const { uidParticipants } = useSelector( state => state.compare )
    
    const { userWannaRate, userRequireRate, wannaDo, onInputChange } = useForm( compareForm ) 

    const onSubmitCompare = ( event ) => {
        event.preventDefault()

        if( userWannaRate > 10 || userWannaRate < 0 ) return
        if( userRequireRate > 10 || userRequireRate < 0 ) return
        if( wannaDo.length <= 2 ) return

        dispatch( startVoting( { 
            type: 'compare', 
            wannaDo, 
            votation: { [user.uid]: [ userWannaRate, userRequireRate ]}, 
            uidParticipants,
        }))
    }

    return (
        <div className="center">
            <h1> Comparar Votacion</h1>

            <AddParticipant />
            
            <p> Que quieres hacer mas?</p>

            <form onSubmit={ onSubmitCompare }>
                <div>
                    <input 
                        type="text"
                        placeholder="Que quieres hacer?"
                        name="wannaDo"
                        value={ wannaDo }
                        onChange= { onInputChange }
                    />
                </div>
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
}
