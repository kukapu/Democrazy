

export const validatePonderation = ( formField ) => {
    
    if( formField.some( element => element.name.length < 1) ) return 'rellenar nombre'
    if( formField.some( element => element.position < 0) ) return 'Valor entre 0 y 10' 
    if( formField.some( element => element.position > 10) ) return 'Valor entre 0 y 10' 

    return formField
}
