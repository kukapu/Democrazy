import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { dataMajority } from "../helpers/dataMajority"
import { uniqueVoteMajority } from "../helpers/uniqueVoteMajority"
import { validateMajority } from "../helpers/validateMajority"
import { charged, charging, meVoted, startAddNewVote, startCreateMajority } from "../store"
import { VotationMajorityVoted } from "./VotationMajorityVoted"



export const VotationMajority = ({ votationId, multipleChoice }) => {

    const dispatch = useDispatch()
    const { user, isLoading } = useSelector( state => state.auth )
    const { uidParticipants } = useSelector( state => state.compare )
    const { title, votation } = useSelector( state => state.result )

    const [ votationDone, setVotationDone ] = useState(false)

    const baseFormField = votation.itemsVoted.map( item => {
        return { name: item, checked: false }
    })


    // useEffect(() => {

    //     dispatch( charging() )

    
    //     dispatch( charged() )

    // }, [multipleChoice])
    

    const [formField, setFormField] = useState(baseFormField)

    const onChangeCheck = ( event, index ) => {
        // console.log(event)
        let data = [ ...formField ]
        // setFormField( !data[index].checked )
        data[index].checked = event.target.checked
        // console.log(data[index].checked)
        // console.log(event.target.checked)
        setFormField( data )
    } 


    const onSubmit = ( event ) => {
        event.preventDefault()

        let validateFormField = validateMajority( formField )
        // console.log(validateFormField)

        if( validateFormField.checked === 'Hay que elegir una opcion' ) return

        if( !multipleChoice ) {
            validateFormField = uniqueVoteMajority( formField )
        }

        console.log(validateFormField)
        // console.log(multipleChoice)

        if( validateFormField.checked === 'Solo puedes elegir una opcion' ) return 
        const { itemsVoted, votationArray } = dataMajority( validateFormField )
        // console.log( itemsVoted, votation )
        

        dispatch( startAddNewVote({ 
            votationId: votationId, 
            votation: { ...votation, [user.uid] : votationArray},
            uid: user.uid,
        }))
        dispatch( meVoted() )
        setVotationDone( true )
    }

    const prueba = () => {
        
        console.log(multipleChoice)
        console.log(votation.multipleChoice)
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

                                <button onClick={ prueba }> PRESS </button>
                            </div>
                        </form>
                    )
            }

        </div>
    )
}
  