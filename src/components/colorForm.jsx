import { useEffect } from "react"
import { useState } from "react"

// need clean code. Find out color. find out ( evolution, appearance, secondary types.)

// {pokemonType && <ColorForm pokemonType={pokemonType} possibleList={possibleList} setPossibleList={setPossibleList} />}

export function ColorForm({ setPossibleList, possibleList, pokemonType }) {
    const [count, setCount] = useState(1)

    const [colorQ, setColorQ] = useState(null)
    const [likeQ, setLikeQ] = useState(null)
    useEffect(() => {
        if (pokemonType == "psychic") {
            setColorQ("Is your pokemon purple?")
        }
        else if (pokemonType == "water") {
            setColorQ("Is your pokemon blue?")
        }
        else if (pokemonType == "fire") {
            setColorQ("Is your pokemon orange?")
        }
        else if (pokemonType == "normal" | pokemonType == "fighting") {
            setColorQ("Is your pokemon brown?")
            //if your pokemon actually a group of pokemon?
        }
        else if (pokemonType == "electric") {
            setColorQ("Is your pokemon yellow?")
        }
        else if (pokemonType == "grass") {
            setColorQ("Is your pokemon greenish?")
        }

        let traitCounter = {}
        console.log(possibleList)

        possibleList.map((one) => {
            if (one.like in traitCounter) {
                traitCounter[one.like] += 1
            }
            else {
                traitCounter[one.like] = 1
            }
        })
        console.log(traitCounter)
        let max = 0
        for (let key in traitCounter) {
            if (traitCounter[key] > max) {
                max = key
            }
        }
        console.log(max)

        setLikeQ()

    }, [])



    const colorQs = [
        colorQ,
        "Is your pokemon an evolution?",
        "Can your pokemon fly?",
        "Is your pokemon a poison type?",
        "Does your pokemon have feet?",
        likeQ,

    ]


    const functs = [
        function colorFilter(theColor, answer) {
            if (answer == "no") {
                setPossibleList((prev) => prev.filter((one) => (one.color != theColor)))
                // remove question from list?
            }
            else if (answer == "yes") {
                setPossibleList((prev) => prev.filter((one) => (one.color = theColor)))
            }
        },
        function randomFilter(aspect, answer) {
            if (answer == "no") {
                setPossibleList((prev) => prev.filter((one) => (one.color != theColor)))
                // remove question from list?
            }
            else if (answer == "yes") {
                setPossibleList((prev) => prev.filter((one) => (one.color = theColor)))
            }
        }
    ]


    const randomQs = [
        "Is your pokemon an evolution?",
        // if yes: 
        "Is your pokemon a stage 2 evolution? (an evolution of an evolution)",
        "Can your pokemon fly?",
        "Is your pokemon a poison type?",
        "Does your pokemon have feet?",
        //if yes:
        "Does your pokemon walk on four legs?",
        // for loop and check for most isLike features:
        "Is your pokemon {like}-like?"
    ]

    const typeValues = [
        "none",
        "fire",
        "electric",
        "water",
        "normal",
        "grass",
        "psychic",
        "fighting"
    ]


    function submitYes(e) {
        e.preventDefault()
        setCount((prev) => (prev + 1))
        console.log("count", count)
        console.log("type", e.target.answer.value)
        setPossibleList((prev) => prev.filter((one) => one.type.includes(e.target.answer.value)))
        setPokemonType(e.target.answer.value)
    }


    function submitNo(e) {
        e.preventDefault()
        setCount((prev) => (prev + 1))
        console.log("count", count)
    }


    return (
        <>
            <p> {colorQs[count]}</p >
            <div className="form">
                <form onSubmit={submitYes}>
                    <input type="hidden" name="answer" value={typeValues[count]}></input>
                    <input type="submit" value="Yes" />
                </form>
                <form onSubmit={submitNo}>
                    <input type="hidden" name="answer" value="no"></input>
                    <input type="submit" value="No" />
                </form>
            </div>
        </>


    )
}
