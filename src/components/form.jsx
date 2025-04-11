import { useEffect } from "react";
import { useState } from "react";

// industry standard is arrow functions
// arrow functions are var that hold whatever its function returns. different params make different values.

//include a trait3
//include has feet.
//include size? ( sm med lg)
// eeve vs tauros vs kangakan.
// create usestate isWrong and set to true if user answers no at end of a Q list. render gamover if isWrong or list is empty.


export function Form({pokemonColor, setPokemonColor, setQnumber, setPic, setPokemonType, pokemonType, setPossibleList, possibleList, setGameStart,}) {
    const [count, setCount] = useState(0);

    const[aColor, setAColor] = useState(null);
    const [isEvolved, setIsEvolved] = useState(false);
    const [doneWithBestQs, setDoneWithBestQs] = useState(false);
    const [trait, setTrait] = useState(null)
    const [trait2, setTrait2] = useState(null)


    const bestQs = [
        "Can your pokemon fly?",
        "Is your pokemon a poison type?",
        "Is your pokemon an evolution?",
    ];

    const lastQs = [
        {question:`Is your pokemon ${trait}-like?`, answer:`${trait}`},
        {question: `Is your pokemon ${trait2}-like?`, answer:`${trait2}`},
        {question: "Does your pokemon have feet?", answer:"feet"},
        {question: "Is your pokemon the size of an adult human or larger?", answer:"l"},
        {question: "Is your pokemon the size an eevee evolution or smaller?", answer: "s"}
    ]

    const typeQs = [
        {question: "Is your pokemon a fire type?", answer: "Fire"},
        {question: "Is your pokemon an electric type?", answer: "Electric"},
        {question: "Is your pokemon a water type?", answer: "Water"},
        {question: "Is your pokemon a normal type? (Includes fairy and metal types)", answer: "Normal"},
        {question: "Is your pokemon a grass or bug type?", answer: "Grass"},
        {question: "Is your pokemon an ghost or psychic type?", answer: "Psychic"},
        {question: "Is your pokemon a ground type?", answer: "Ground"},
        {question: "Is your pokemon a fighting type?", answer: "Fighting"}
]
    const colorQ = [
        {question: `Is your pokemon ${aColor}`, answer: `${aColor}`}
    ]

        const typeQs2 = [
            "Was your pokemon ever considered a fairy type?",
            "Was your pokemon ever considered a metal type?",
            "Is your pokemon a ghost type?",
            "Is your pokemon a bug type?",
            "Is your pokemon more than 1 type?" // fighting and psychic etc
        ]

    const colorQs = [
        {question: "Is your pokemon purple?", answer: "purple"},
        {question: "Is your pokemon blue?", answer: "blue"},
        {question: "Is your pokemon green?", answer: "green"},
        {question: "Is your pokemon yellow", answer: "yellow"},
        {question: "Is your pokemon orange?", answer: "orange"},
        {question: "Is your pokemon red or pink?", answer: "pink"},
        {question: "Is your pokemon brown?", answer: "brown"},
        {question: "Is your pokemon grey?", answer: "grey"},
        {question: "Is your pokemon white?", answer: "white"}
    ]

    function YesTrait(e) {
        e.preventDefault()
        console.log(" y Trait:", e.target.answer.value)
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
        }
        else if (trait == "s") {
            setPossibleList((prev) =>
                prev.filter((one) => one.size == "s")
            );
        }
        else {
            setPossibleList((prev) =>
                prev.filter((one) => one.like.includes(e.target.answer.value))
            );}
    }

    function NoTrait(e) {
        e.preventDefault()
        console.log(" n Trait:", e.target.answer.value)
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
        console.log(traitCounter)
        let maxVal = 0
        let maxKey = null
        for (let key in traitCounter) {
            if (traitCounter[key] > maxVal){
                maxVal = traitCounter[key]
                maxKey = key
            }
        }
        console.log(maxKey)
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
        console.log(maxKey2)
        setTrait2(maxKey2)
    }



    function TypeYes(e) {
        e.preventDefault();
        setCount((prev) => prev + 1);
        console.log("type", e.target.answer.value);
        setPossibleList((prev) =>
            prev.filter((one) => one.type.includes(e.target.answer.value))
        );
        setPokemonType(e.target.answer.value);
        if (e.target.answer.value == "Fire") {
            setAColor("orange")  
        }
        else if (e.target.answer.value == "Electric") {
            setAColor("yellow")
        }
        else if (e.target.answer.value == "Water") {
            setAColor("blue")
        }
        else if (e.target.answer.value == "Normal" || e.target.answer.value == "Fighting" || e.target.answer.value == "Ground" ) {
            setAColor("brown")  
        }
        else if (e.target.answer.value == "Psychic") {
            setAColor("purple")
        }
        else if (e.target.answer.value == "Grass") {
            setAColor("green")
        }
        else {
            console.log("Error: no color.")
            setAColor("None")
        }
        setCount(0);
        setQnumber((prev) => prev + 1);
        setPic("normal.jpg");
    }
    

    function TypeNo(e) {
        e.preventDefault();
        setCount((prev) => prev + 1);
        setQnumber((prev) => prev + 1);
    }


    function AColorYes(e) {
        e.preventDefault();
        setCount(0);
        console.log("type", e.target.answer.value);
        setPossibleList((prev) =>
            prev.filter((one) => one.color.includes(e.target.answer.value))
        );
        setAColor(null)
        setPokemonColor(e.target.answer.value);
        setCount(0);
        setQnumber((prev) => prev + 1);
    }
    function AColorNo(e) {
        e.preventDefault();
        setCount(0);
        setQnumber((prev) => prev + 1);
        console.log("count", count);
        setAColor(null)
    }
    function ColorYes(e) {
        e.preventDefault();
        setCount((prev) => prev + 1);
        console.log("type", e.target.answer.value);
        setPossibleList((prev) =>
            prev.filter((one) => one.color.includes(e.target.answer.value))
        );
        setAColor(null)
        setPokemonColor(e.target.answer.value);
        setCount(0);
        setQnumber((prev) => prev + 1);
    }

    function ColorNo(e) {
        e.preventDefault();
        setCount((prev) => prev + 1);
        setQnumber((prev) => prev + 1);
        console.log("count", count);
        setAColor(null)
    }

    function canFly(e) {
        e.preventDefault();
        setCount((prev) => prev + 1);
        setQnumber((prev) => prev + 1);
        console.log(e.target.answer.value);
        if (e.target.answer.value == "Yes") {
            setPossibleList((prev) => prev.filter((one) => one.canFly));
            console.log("can fly");
        } else {
            setPossibleList((prev) => prev.filter((one) => !one.canFly));
            console.log("can't fly");
        }
    }

    function hasPoison(e) {
        e.preventDefault();
        setCount((prev) => prev + 1);
        setQnumber((prev) => prev + 1);
        if (e.target.answer.value == "Yes") {
            setPossibleList((prev) =>
                prev.filter((one) => one.type.includes("Poison"))
            );
        } else {
            setPossibleList((prev) =>
                prev.filter((one) => !one.type.includes("Poison"))
            );
        }
    }

    function isEvolution(e) {
        e.preventDefault();
        setCount(0);
        setQnumber((prev) => prev + 1);
        setDoneWithBestQs(true)
        if (e.target.answer.value == "Yes") {
            setPossibleList((prev) =>
                prev.filter((one) => one.stage == 1 || one.stage == 2)
            );
            setIsEvolved(true);
        } else {
            setPossibleList((prev) => prev.filter((one) => one.stage == 0));
        }
        findTrait()
    }

    function isEvolutionofEvolution(e) {
        e.preventDefault();
        setCount((prev) => prev + 1);
        setQnumber((prev) => prev + 1);
        setIsEvolved(null)
        if (e.target.answer.value == "Yes") {
            setPossibleList((prev) =>
                prev.filter((one) => one.stage == 2)
            );
        } else {
            setPossibleList((prev) => prev.filter((one) => one.stage == 1));
        }
    }

    function victory() {
        setPic("evil.jpg");
        console.log("NooOoOOo!");
    }

    function defeat() {
        setPic("lost.jpg");
        console.log("NooOoOOo!");
    }

    function resetGame() {
    }

    return (
        <>
            {!pokemonType ? (
                <div>
                    <p> {typeQs[count].question}</p>
                    <div className="form">
                        <form onSubmit={TypeYes}>
                            <input type="hidden" name="answer" value={typeQs[count].answer}></input>
                            <input type="submit" value="Yes" />
                        </form>
                        <form onSubmit={TypeNo}>
                            <input type="hidden"name="answer" value="no"></input>
                            <input type="submit" value="No" />
                        </form>
                    </div>
                </div>
            ): aColor?(
                <>
                    <p> {colorQ[0].question}</p>
                    <div className="form">
                        <form onSubmit={AColorYes}>
                            <input type="hidden" name="answer" value={colorQ[0].answer}></input>
                            <input type="submit" value="Yes" />
                        </form>
                        <form onSubmit={AColorNo}>
                            <input type="hidden"name="answer" value="no"></input>
                            <input type="submit" value="No" />
                        </form>
                    </div>
                    </>
            ) : possibleList.length == 1 ? (
                <>
                    <p>Is it {possibleList[0]["name"]}?</p>
                    <button onClick={victory}>Yes</button>
                    <button onClick={defeat}>No</button>
                </>
            ): possibleList.length == 0 ? (
                <>
                    <p>Hmmm...that doesn't match any gen 1 pokemon. Please try again.</p>
                    <form onSubmit={resetGame}>
                        <input type="submit" value="Okay" />
                    </form>
                </>
            ) : !pokemonColor? (
                    <>
                    <p> {colorQs[count].question}</p>
                    <div className="form">
                        <form onSubmit={ColorYes}>
                            <input type="hidden" name="answer" value={colorQs[count].answer}></input>
                            <input type="submit" value="Yes" />
                        </form>
                        <form onSubmit={ColorNo}>
                            <input type="hidden"name="answer" value="no"></input>
                            <input type="submit" value="No" />
                        </form>
                    </div>
                    </>
                ) : !doneWithBestQs? (
                    <div>
                    <p>{bestQs[count]}</p>
                    <div className="form">
                        <form onSubmit={count == 0? canFly: count == 1? hasPoison: isEvolution}>
                            <input type="hidden" name="answer" value="Yes"></input>
                            <input type="submit" value="Yes"/>
                        </form>
                        <form onSubmit={count == 0? canFly: count == 1? hasPoison: isEvolution}>
                            <input type="hidden" name="answer" value="No"></input>
                            <input type="submit" value="No" />
                        </form>
                    </div>
                </div>
                ) : isEvolved?(
                    <>
                    <p>Is your pokemon an evolution of an evolution?</p>
                    <div className="form">
                        <form onSubmit={isEvolutionofEvolution}>
                            <input type="hidden" name="answer" value="Yes"></input>
                            <input type="submit" value="Yes"/>
                        </form>
                        <form onSubmit={isEvolutionofEvolution}>
                            <input type="hidden" name="answer" value="No"></input>
                            <input type="submit" value="No" />
                        </form>
                    </div>
                    </>
                ): possibleList.length > 1 ? (
                    <div>
                        <p>{lastQs[count].question}</p>
                        <div className="form">
                            <form onSubmit={YesTrait}>
                                <input type="hidden" name="answer" value={lastQs[count].answer}></input>
                                <input type="submit" value="Yes"/>
                            </form>
                            <form onSubmit={NoTrait}>
                                <input type="hidden" name="answer" value={lastQs[count].answer}></input>
                                <input type="submit" value="No" />
                            </form>
                        </div>
                    </div>
                ) : (
                    <p>ERROR!</p>
                )}
        </>
    );
}
