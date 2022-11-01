
export const dataMajority = ( formField ) => {
    
    let itemsVoted = []
    let votationArray = []

    formField.map( element => {
        itemsVoted.push( element.name )
        votationArray.push( element.checked )
    })

    return {
        itemsVoted,
        votationArray
    }

}

