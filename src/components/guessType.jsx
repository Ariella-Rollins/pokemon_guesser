

export function guessType() {


    const diceRoll = 3
    let AskedQuestions = []

    if (diceRoll == 1) {
        setText("Is your pokemon a fire type?")
        AskedQuestions.push(1)
    }
    else if (diceRoll == 2) {
        setText("Is your pokemon a water type?")
        AskedQuestions.push(1)
    }
    else if (diceRoll == 3) {
        setText("Is your pokemon a grass or bug type?")
        AskedQuestions.push(1)
    }
    else if (diceRoll == 4) {
        setText("Is your pokemon an electric type?")
        AskedQuestions.push(1)
    }
    else if (diceRoll == 5) {
        setText("Is your pokemon an ghost or psyic type?")
        AskedQuestions.push(1)
    }
    else if (diceRoll == 6) {
        setText("Is your pokemon a normal type? (Including fairy and metal types)")
        AskedQuestions.push(1)
    }
    else if (diceRoll == 7) {
        setText("Is your pokemon a ground or fighting type?")
        AskedQuestions.push(1)
    }

}

export function guessColor() {
    const diceRoll = 4
    let AskedQuestions = []

    if (diceRoll == 1) {
        setText("Is your pokemon ?")
        AskedQuestions.push(1)
        if (answer == "yes") {
            setPossibleList(possibleList.filter((pokemon) => (pokemon.type.includes("fire") ? true : false)))
            console.log(possibleList)
            guessColor()
        }
    }
    else if (diceRoll == 2) {
        setText("Is your pokemon a water type?")
        AskedQuestions.push(1)
    }

}


export function guessDetails() {

    if (type == "water") {
        setText("Does your pokemon have feet?")
    }
    else if (type == "electric") {
        setText("Is your pokemon pikachu?")
    }
}