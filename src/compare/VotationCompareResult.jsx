import { useSelector } from "react-redux"

export const VotationCompareResult = ({ toggleVotation }) => {

    const { result } = useSelector( state => state.result )
    let textResult = ''

    if( result[0] > result[1] ) textResult = '¡¡ SI SE HACE !!'
    if( result[0] < result[1] ) textResult = '¡¡ NO SE HACE !!'

    
    return (
        <>
            {
                ( !(result.length === 0) ) 
                    ? (
                        <>
                            <h1 className="result-text"> { textResult } </h1> 
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
