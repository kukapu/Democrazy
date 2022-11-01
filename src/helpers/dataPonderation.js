

export const dataPonderation = ( formField ) => {
    
    let itemsVoted = []
    let votationArray = []

    formField.map( element => {
        itemsVoted.push( element.name )
        votationArray.push( element.position )
    })

    return {
        itemsVoted,
        votationArray
    }

}

