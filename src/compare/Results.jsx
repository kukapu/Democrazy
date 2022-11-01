import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { addvotationParticipating, gettingInfoVotations, getMyVotationsIds, gettingInfoVotationsFromUser, charging, charged, getallVotationsInfo } from "../store"

export const Results = () => {

    const dispatch = useDispatch()
    const { user, isCharging } = useSelector( state => state.auth )
    const { allVotationsInfo } = useSelector( state => state.result )

    const getInfoVotationFromUser = async( ) => {
        dispatch( charging() )

        const votationParticipating =  await dispatch( gettingInfoVotationsFromUser({ uid: user.uid }) )
        dispatch( getallVotationsInfo( votationParticipating.infoVotations ))
        // console.log( votationParticipating )
        const votationsIds = await dispatch( getMyVotationsIds({ uid: user.uid }))
        dispatch( addvotationParticipating( votationsIds ))

        dispatch( charged() )
    }

    useEffect(() => {

        getInfoVotationFromUser()
    
    }, [])

    // const prueba = () => {
    //     console.log( allVotationsInfo )
    // }
 
    return (
        <div className="center">
            <h1>Votaciones</h1>

            <ul>
                {
                    ( isCharging ) 
                        ? <h3> Cargando </h3>
                        : ( 
                            allVotationsInfo.map( votation => {
                                return (
                                    <li key={ votation._id }>
                                        <Link to={`/results/${votation._id}`}>
                                            { votation.title }
                                        </Link>

                                    </li>
                                )
                            })
                        )
                }
            </ul>
          
            {/* <button onClick={ prueba }> PRESS </button> */}
            
        </div>
    )
}
