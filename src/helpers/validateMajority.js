
export const validateMajority = ( formField ) => {

    let error = {}

    if( !formField.some( element => element.checked === true )) {
        error.checked = 'Hay que elegir una opcion'
        return error
    }

    



    return formField
}
