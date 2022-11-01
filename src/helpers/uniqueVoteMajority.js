
export const uniqueVoteMajority = ( formField ) => {

    let error = {}

    const oneCheckArray = formField.filter( element => element.checked === true )
    if( oneCheckArray.length > 1 ) {
        error.checked = 'Solo puedes elegir una opcion'
        return error
    }

    return formField

}
