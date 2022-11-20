import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { dataMajority } from "../helpers/dataMajority"
import { uniqueVoteMajority } from "../helpers/uniqueVoteMajority"
import { validateMajority } from "../helpers/validateMajority"
import { getInfoResults, meVoted, startAddNewVote } from "../store"
import { VotationMajorityVoted } from "./VotationMajorityVoted"
import '../index.css'


export const VotationMajority = ({ votationId }) => {

    const dispatch = useDispatch()
    const { user, isLoading } = useSelector( state => state.auth )
    const { votation, allVotationsInfo } = useSelector( state => state.result )
    
    const navigate = useNavigate()

    const [ votationDone, setVotationDone ] = useState(false)

    const baseFormField = votation.itemsVoted.map( item => {
        return { name: item, checked: false }
    })

    const [formField, setFormField] = useState(baseFormField)

    useEffect(() => {
        allVotationsInfo.map( votation => {
            if( votation._id === votationId ) {
                dispatch( getInfoResults( votation ) )
                dispatch( meVoted() )
            }
        })
    }, [])

    const onChangeCheck = ( event, index ) => {
        let data = [ ...formField ]
        data[index].checked = event.target.checked
        setFormField( data )
    } 


    const onSubmit = ( event ) => {
        event.preventDefault()

        let validateFormField = validateMajority( formField )

        if( validateFormField.checked === 'Hay que elegir una opcion' ) return

        if( !votation.multipleChoice ) {
            validateFormField = uniqueVoteMajority( formField )
        }

        if( validateFormField.checked === 'Solo puedes elegir una opcion' ) return 
        const { votationArray } = dataMajority( validateFormField )
        

        dispatch( startAddNewVote({ 
            votationId: votationId, 
            votation: { ...votation, [user.uid] : votationArray},
            uid: user.uid,
        }))
        dispatch( meVoted() )
        navigate('/')
    }


    return (
        <div className="center">

            {
                ( votationDone )
                    ?  <VotationMajorityVoted votationId={ votationId }  />
                    : (
                        <form onSubmit={ onSubmit }>
                            <div>
                                {
                                    ( isLoading ) 
                                        ? <h3> Cargando </h3>
                                        : 
                                            
                                            baseFormField.map( ( form, index ) => {
                                                return (
                                                    <div key={ index } className="flex-container">
                                                        <input
                                                            className="input-checkbox-text"
                                                            type="text"
                                                            placeholder="Que quieres hacer?"
                                                            name="name"
                                                            readOnly
                                                            value={ form.name }
                                                        />
                                                        <input 
                                                            className="input-checkbox"
                                                            type="checkbox"
                                                            value={ form.checked }
                                                            onChange={ () => onChangeCheck( event, index )}
                                                        />
                                                    
                                                    </div>
                                                )
                                            })
                                        

                                        

                                }
                                
                        
                                <button className="input-button" onSubmit={ onSubmit }> Guardar </button>

                            </div>
                        </form>
                    )
            }

        </div>
    )
}
  