import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../hooks/useForm"
import { startCreateVotation } from "../store"
import { AddParticipant } from "./AddParticipant"
import { compareForm } from "../helpers"
import { useNavigate } from "react-router-dom"
import { useResults } from "../hooks/useResults"
import '../index.css'

export const Compare = () => {

    const dispatch = useDispatch()
    const { user } = useSelector( state => state.auth )
    const { uidParticipants } = useSelector( state => state.votation )
    const { allVotationsInfo } = useSelector( state => state.result )
    const { setAllVotationList, allVotationList } = useResults()
    const navigate = useNavigate()
    
    const { userWannaRate, userRequireRate, title, onInputChange } = useForm( compareForm ) 

    const onSubmitCompare = ( event ) => {
        event.preventDefault()

        if( userWannaRate > 10 || userWannaRate < 0 || userWannaRate.length === 0 ) return
        if( userRequireRate > 10 || userRequireRate < 0 || userRequireRate.length === 0 ) return
        if( title.length <= 2 ) return

        const votation = { 
            type: 'compare', 
            title, 
            votation: { [user.uid]: [ userWannaRate, userRequireRate ]}, 
            uidParticipants,
        }

        dispatch( startCreateVotation( votation ))

        setAllVotationList( allVotationsInfo )
        console.log(allVotationsInfo)

        navigate('/')
    }

    return (
        <div className="center">
            <h1> Comparar Votacion</h1>

            <AddParticipant />
            
            <h2> ¿Cuanto te apetece hacerlo? </h2>

            <form onSubmit={ onSubmitCompare }>
                <div>
                    <input 
                        className="input-general-form"
                        type="text"
                        placeholder="Que quieres hacer?"
                        name="title"
                        value={ title }
                        onChange= { onInputChange }
                    />
                </div>
                <div>
                    <input
                        className="input-general-form"
                        type="number"
                        placeholder="Cuanto te apetece?"
                        name="userWannaRate"
                        value={ userWannaRate }
                        onChange= { onInputChange }
                    />
                </div>
                <div>
                    <input
                        className="input-general-form"
                        type="number"
                        placeholder="Cuanto para hacerlo?"
                        name="userRequireRate"
                        value={ userRequireRate }
                        onChange= { onInputChange }
                    />
                </div>

                <div>
                    <input 
                        className="input-button"
                        type="submit"
                        value="Guardar" 
                    />
                </div>
    

            </form>
        </div>
    )
}
