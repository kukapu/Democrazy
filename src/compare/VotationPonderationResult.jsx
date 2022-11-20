import { useSelector } from "react-redux"

export const VotationPonderationResult = ({ toggleVotation }) => {
        
    const { result, votation } = useSelector( state => state.result )

    const itemVotation = votation.itemsVoted
    
    const max = Math.max( ...result )
    let textResult = ''


    if( result.filter( e => e === max).length > 1 ) {
        const indices =[]
        let idx = result.indexOf(max);
        while (idx !== -1) {
            indices.push(idx);
            idx = result.indexOf(max, idx + 1);
        }
        textResult = `EMPATE ENTRE ${indices.map( element => (itemVotation[element])).join(' y ')}`
        
    } else {
        textResult = `HA GANADO ${itemVotation[result.indexOf( max )]}`
    }
    
    
    return (
        <>
            {
                ( !(result.length === 0) ) 
                    ? (
                        <>
                            <h1> { textResult } </h1> 
                        </>
                    )
                    : (
                        <>
                            <h3> Ya has votado </h3>
                            <h3> Esperando Resultados... </h3>
                            <button className="input-button" onClick={ toggleVotation }> Editar </button>
                        </>
                    )
                        
                    
            }
        </>
    )
}