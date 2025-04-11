import { useState } from "react";
import { pokemonList } from "./components/pokemonList";
import { guessColor, guessType } from "./components/guessType";
import "./App.css";
import { Form } from "./components/form";
import { ColorForm } from "./components/colorForm";
import { useEffect } from "react";

// useReducer to determine which function to run!(type and payload)
// first guess type
// then guess evolution. then color. then details.
// then guess pokemon.

function App() {
    const [gameStart, setGameStart] = useState(false);

    const [Qnumber, setQnumber] = useState(0);

    const [pokemonType, setPokemonType] = useState(null);
    const [pokemonColor, setPokemonColor] = useState(null)

    const [pic, setPic] = useState("gloom.jpg");
    const [possibleList, setPossibleList] = useState(pokemonList);

    // useEffect(()=>{

    // },[gameStart])

    return (
        <div className="con">
            <h1>Pokemon Guesser</h1>
            <div className="body">
                <p>Question{Qnumber}/20</p>
                <div className="box1">
                    {!gameStart && (
                        <>
                            <p>Think of a pokemon and I will guess it.</p>
                            <button
                                onClick={() => {
                                    setGameStart(true);
                                    setQnumber((prev) => prev + 1);
                                }}
                            >
                                Start
                            </button>
                        </>
                    )}
                    {gameStart && (
                        <>
                            <Form setPokemonColor={setPokemonColor} pokemonColor={pokemonColor} setQnumber={setQnumber} setPic={setPic} setPokemonType={setPokemonType} pokemonType={pokemonType} possibleList={possibleList} setPossibleList={setPossibleList} setGameStart={setGameStart}/>
                        </>
                    )}
                </div>
                <div className="box2">
                    <img src={pic} height="200" width="220"></img>
                </div>
            </div>
        </div>
    );
}

export default App;
