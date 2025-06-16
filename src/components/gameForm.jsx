import { useEffect, useState } from "react";

export function GameForm({setEnding, setQnumber, setPic, setPossibleList, possibleList, setGuessing}) {
    // used for iterating over arrays of questions
    const [count, setCount] = useState(0);

    // stages of the game
    const [stage, setStage] = useState(1)

    // the most likely color (based on pokemon type)
    const[aColor, setAColor] = useState(null);
    
    // most likely traits ( based on possiblePokemon list)
    const [trait, setTrait] = useState(null)
    const [trait2, setTrait2] = useState(null)

    // what we know about the pokemon
    const [pokemonType, setPokemonType] = useState(null);
    const [pokemonColor, setPokemonColor] = useState(null);


    useEffect(()=> {
        if(stage == 1){
        setCurrentQ(typeQs[count])
        }
        else if (stage == 2) {
            setCurrentQ(colorQ[count])
            setNoFunction(()=> {return AColorNo})
            setYesFunction(()=> {return AColorYes})
        }
        else if (stage == 3){
            setCurrentQ(bestQs[count])
            setNoFunction(()=> {return NoBestQs})
            setYesFunction(()=> {return YesBestQs})
        }
        else if (stage == 4) {
            setCurrentQ(evoQ[count])
            setNoFunction(()=> {return NoEvolvedTwice})
            setYesFunction(()=> {return YesEvolvedTwice})
        }
        else if (stage == 5) {
            setCurrentQ(colorQs[count])
            setNoFunction(()=> {return ColorNo})
            setYesFunction(()=> {return ColorYes})
        }
        else if (stage == 6) {
            findTrait()
            setCurrentQ(traitQs[count])
            setNoFunction(()=> {return NoTrait})
            setYesFunction(()=> {return YesTrait})
        }
        else if (stage == 7) {
            setGuessing(true)
        }
    },[count, stage, aColor, trait, trait2])

    const typeQs = [
        {question: "Is your pokemon a fire type?", answer: "Fire"},
        {question: "Is your pokemon an electric type?", answer: "Electric"},
        {question: "Is your pokemon a water type?", answer: "Water"},
        {question: "Is your pokemon a normal type? \n(Includes fairy and metal types)", answer: "Normal"},
        {question: "Is your pokemon a grass or bug type?", answer: "Grass"},
        {question: "Is your pokemon an ghost or psychic type?", answer: "Psychic"},
        {question: "Is your pokemon a ground type?", answer: "Ground"},
        {question: "Is your pokemon a fighting type?", answer: "Fighting"}
    ]

    const colorQ = [
        {question: `Is your pokemon ${aColor}?`, answer: `${aColor}`}
    ]

    const bestQs = [
        {question: "Can your pokemon fly?", answer:"fly"},
        {question: "Is your pokemon a poison type?", answer:"poison"},
        {question: "Is your pokemon an evolution?", answer:"evo"}
    ];

    const evoQ = [
        {question: "Is your pokemon an evolution of an evolution?", answer: "evo"}
    ]

    let colors = [
        {question: "Is your pokemon purple?", answer: "purple"},
        {question: "Is your pokemon blue?", answer: "blue"},
        {question: "Is your pokemon green?", answer: "green"},
        {question: "Is your pokemon yellow?", answer: "yellow"},
        {question: "Is your pokemon orange?", answer: "orange"},
        {question: "Is your pokemon red or pink?", answer: "pink"},
        {question: "Is your pokemon brown?", answer: "brown"},
        {question: "Is your pokemon grey?", answer: "grey"},
        {question: "Is your pokemon white?", answer: "white"}
    ]
    const [colorQs, setColorQs] = useState(colors)

    const traitQs = [
        {question:`Is your pokemon ${trait}-like?`, answer:`${trait}`},
        {question: `Is your pokemon ${trait2}-like?`, answer:`${trait2}`},
        {question: "Does your pokemon have feet?", answer:"feet"},
        {question: "Is your pokemon the size of an adult human or larger?", answer:"l"},
        {question: "Is your pokemon the size an eevee evolution or smaller?", answer: "s"},
        {question: "Does your pokemon have visible ears?", answer: "ears"}
    ]

    // Form Variables:
    const[currentQ, setCurrentQ] = useState(typeQs[count])
    const[YesFunction, setYesFunction] = useState(()=>{return TypeYes})
    const[NoFunction, setNoFunction] = useState(()=>{return TypeNo})


    function TypeYes(e) {
        e.preventDefault();
        setPossibleList((prev) =>
            prev.filter((one) => one.type.includes(e.target.answer.value))
        );
        setPokemonType(e.target.answer.value);
        if (e.target.answer.value == "Fire") {
            setAColor("orange")
            setColorQs((prev)=> prev.filter((one)=> one.answer =="orange" || one.answer == "yellow" || one.answer == "brown"))  
        }
        else if (e.target.answer.value == "Electric") {
            setAColor("yellow")
            setColorQs((prev)=> prev.filter((one)=> one.answer =="orange" || one.answer == "yellow" || one.answer == "grey" || one.answer == "pink"))
        }
        else if (e.target.answer.value == "Water") {
            setAColor("blue")
            setColorQs((prev)=> prev.filter((one)=> one.answer !="green"))
        }
        else if (e.target.answer.value == "Normal" || e.target.answer.value == "Fighting" || e.target.answer.value == "Ground" ) {
            setAColor("brown")
            setColorQs((prev)=> prev.filter((one)=> one.answer !="green"))  
        }
        else if (e.target.answer.value == "Psychic") {
            setAColor("purple")
            setColorQs((prev)=> prev.filter((one)=> one.answer !="orange" && one.answer !="green" && one.answer !="blue"))
        }
        else if (e.target.answer.value == "Grass") {
            setAColor("green")
            setColorQs((prev)=> prev.filter((one)=> one.answer !="orange" && one.answer !="grey" )) 
        }
        setCount(0);
        setQnumber((prev) => prev + 1);
        setPic("normal.jpg");
        setStage(2)
    }

    function TypeNo(e) {
        e.preventDefault();
        setCount((prev) => prev + 1);
        setQnumber((prev) => prev + 1);
        if (e.target.answer.value == "Fighting") {
            setPossibleList([])
        }
    }

    function AColorYes(e) {
        e.preventDefault();
        setCount(0);
        setPossibleList((prev) => prev.filter((one) => one.color.includes(e.target.answer.value))
        );
        setPokemonColor(e.target.answer.value);
        setStage(3)
        setQnumber((prev) => prev + 1);
    }

    function AColorNo(e) {
        e.preventDefault();
        setCount(0);
        setQnumber((prev) => prev + 1);
        const color = e.target.answer.value
        setColorQs((prev)=> prev.filter((one)=> one.answer != color))
        // brown is too ambigous for pokemon colors. Ex: A user might think geodude is grey OR brown. This gives leeway.
        if (color != "brown"){
            setPossibleList((prev) => prev.filter((one) => !one.color.includes(e.target.answer.value)))
        }
        setStage(3)
    }

    function YesBestQs(e) {
        e.preventDefault();
        setCount((prev) => prev + 1);
        setQnumber((prev) => prev + 1);
        if (e.target.answer.value == "fly") {
            setPossibleList((prev) => prev.filter((one) => one.canFly));
        }
        else if (e.target.answer.value == "poison") {
            setPossibleList((prev) => prev.filter((one) => one.type.includes("Poison")));
        }
        else if (e.target.answer.value == "evo") {
            setPossibleList((prev) => prev.filter((one) => one.stage == 1 || one.stage == 2));
            setCount(0)
            setStage(4)
        }
    }

    function NoBestQs(e) {
        e.preventDefault();
        setCount((prev) => prev + 1);
        setQnumber((prev) => prev + 1);
        if (e.target.answer.value == "fly") {
            setPossibleList((prev) => prev.filter((one) => !one.canFly));
        }
        else if (e.target.answer.value == "poison") {
            setPossibleList((prev) => prev.filter((one) => !one.type.includes("Poison")));
        }
        else if (e.target.answer.value == "evo") {
            setPossibleList((prev) => prev.filter((one) => one.stage == 0));
            setCount(0)
            // if color is known, skip stage 5 (skip guessing colors)
            if (pokemonColor) {
                setStage(6)
            }
            else{
            setStage(5)
            }
        }
    }

    function YesEvolvedTwice(e) {
        e.preventDefault();
        setCount(0);
        setQnumber((prev) => prev + 1);
        setPossibleList((prev) => prev.filter((one) => one.stage == 2));
        if (aColor) {
            setStage(6)
        }
        else{
        setStage(5)
        }
    }

    function NoEvolvedTwice(e) {
        e.preventDefault();
        setCount(0);
        setQnumber((prev) => prev + 1);
        setPossibleList((prev) => prev.filter((one) => one.stage == 1));
        if (pokemonColor) {
            setStage(6)
        }
        else{
        setStage(5)
        }
    }

    function YesTrait(e) {
        e.preventDefault()
        setCount((prev) => prev + 1);
        setQnumber((prev) => prev + 1);
        const trait = e.target.answer.value
        if (trait =="feet") {
            setPossibleList((prev) =>
                prev.filter((one) => one.hasFeet == true)
            );
        }
        else if (trait == "l") {
            setPossibleList((prev) =>
                prev.filter((one) => one.size == "l")
            );
            setCount((prev) => prev + 1);
        }
        else if (trait == "s") {
            setPossibleList((prev) =>
                prev.filter((one) => one.size == "s")
            );
        }
        else if (trait=="ears") {
            setPossibleList((prev) =>
                prev.filter((one) => one.ears.includes("true"))
            );
            setStage(7)
            setCount(0)
        }
        else {
            setPossibleList((prev) =>
                prev.filter((one) => one.like.includes(e.target.answer.value))
            );
        setCount((prev) => prev + 1);}
    }

    function NoTrait(e) {
        e.preventDefault()
        setCount((prev) => prev + 1);
        setQnumber((prev) => prev + 1);
        const trait = e.target.answer.value
        if (trait =="feet") {
            setPossibleList((prev) =>
                prev.filter((one) => one.hasFeet == false)
            );
        }
        else if (trait == "l") {
            setPossibleList((prev) =>
                prev.filter((one) => one.size != "l")
            );
        }
        else if (trait == "s") {
            setPossibleList((prev) =>
                prev.filter((one) => one.size != "s")
            );
        }
        else if (trait=="ears") {
            setPossibleList((prev) =>
                prev.filter((one) => one.ears.includes("false"))
            );
            setStage(7)
            setCount(0)
        }
        else {
            setPossibleList((prev) =>
                prev.filter((one) => !one.like.includes(e.target.answer.value))
            );}
    }

    function findTrait() {
        let traitCounter = {}
        for (const poke of possibleList) {
            const value = poke.like
            if (!traitCounter[value]) {
                traitCounter[value] = 1
            }
            else {traitCounter[value] += 1}
        }
        let maxVal = 0
        let maxKey = null
        for (let key in traitCounter) {
            if (traitCounter[key] > maxVal){
                maxVal = traitCounter[key]
                maxKey = key
            }
        }
        setTrait(maxKey)
        traitCounter[maxKey] = 0

        let maxVal2 = 0
        let maxKey2 = null
        for (let key in traitCounter) {
            if (traitCounter[key] > maxVal2){
                maxVal2 = traitCounter[key]
                maxKey2 = key
            }
        }
        setTrait2(maxKey2)
    }

    function ColorYes(e) {
        e.preventDefault();
        setCount((prev) => prev + 1);
        setPossibleList((prev) =>
            prev.filter((one) => one.color.includes(e.target.answer.value))
        );
        setAColor(null)
        setPokemonColor(e.target.answer.value);
        setCount(0);
        setStage(6)
        setQnumber((prev) => prev + 1);
    }

    function ColorNo(e) {
        e.preventDefault();
        setCount((prev) => prev + 1);
        setQnumber((prev) => prev + 1);
        setAColor(null)
        setPossibleList((prev) => prev.filter((one) => one.color != e.target.answer.value))
        // If a pokemon is 2 colors (example: orange and white)
        // we don't want to rule it out if user says it's not "orange".
    }

    return (
            <div className="stuff">
                <div className="qna">
                    <p style={{ whiteSpace: 'pre-line' }} className="bubble bubble-bottom-right">{currentQ.question}</p>
                    <div className="btns">
                        <form onSubmit={YesFunction}>
                            <input type="hidden" name="answer" value ={currentQ.answer}/>
                            <input type="submit" className="purple" value="Yes" />
                        </form>
                        <form onSubmit={NoFunction}>
                            <input type="hidden" name="answer" value ={currentQ.answer}/>
                            <input type="submit" className="purple" value="No" />
                        </form>
                    </div>
                </div>
            </div>
    );
}
