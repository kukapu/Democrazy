import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { dataMajority } from "../helpers/dataMajority"
import { uniqueVoteMajority } from "../helpers/uniqueVoteMajority"
import { validateMajority } from "../helpers/validateMajority"
import { meVoted, startAddNewVote } from "../store"
import { VotationMajorityVoted } from "./VotationMajorityVoted"



export const VotationMajority = ({ votationId, multipleChoice }) => {

    const dispatch = useDispatch()
    const { user, isLoading } = useSelector( state => state.auth )
    const { votation } = useSelector( state => state.result )

    const [ votationDone, setVotationDone ] = useState(false)

    const baseFormField = votation.itemsVoted.map( item => {
        return { name: item, checked: false }
    })


    

    const [formField, setFormField] = useState(baseFormField)

    const onChangeCheck = ( event, index ) => {
        let data = [ ...formField ]
        data[index].checked = event.target.checked
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
        const { itemsVoted, votationArray } = dataMajority( validateFormField )
        

        dispatch( startAddNewVote({ 
            votationId: votationId, 
            votation: { ...votation, [user.uid] : votationArray},
            uid: user.uid,
        }))
        dispatch( meVoted() )
        setVotationDone( true )
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
                                        : (
                                            baseFormField.map( ( form, index ) => {
                                                return (
                                                    <div key={ index }>
                                                        <input
                                                            type="text"
                                                            placeholder="Que quieres hacer?"
                                                            name="name"
                                                            readOnly
                                                            required
                                                            value={ form.name }
                                                        />
                                                        <input 
                                                            type="checkbox"
                                                            value={ form.checked }
                                                            onChange={ () => onChangeCheck( event, index )}
                                                        />
                                                    
                                                    </div>
                                                )
                                            })
                                        )

                                        

                                }
                                
                        
                                <br/>
                                <button onSubmit={ onSubmit }> Submit </button>

                            </div>
                        </form>
                    )
            }

        </div>
    )
}
  