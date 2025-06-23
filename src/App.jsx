import { useState, useEffect } from "react";
import { pokemonList } from "./components/pokemonList";
import { GameForm } from "./components/gameForm";
import "./App.css";
import axios from "axios"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import Lottie from "lottie-react";
import fire from "./images/fire.json"
import shine from "./images/shine.json"

function App() {
    const [gameStart, setGameStart] = useState(false);
    const [ending, setEnding] = useState(null)
    const [Qnumber, setQnumber] = useState(0);
    const [pokePic, setPokePic] = useState(null)
    const [guessing, setGuessing] = useState(false)
    const [possibleList, setPossibleList] = useState(pokemonList);
    const [pic, setPic] = useState("gloom.jpg");
    const [count, setCount] = useState(0)


    function YesGuess(e) {
        e.preventDefault()
        setCount((prev) => prev + 1)
        setPic("evil.jpg")
        setEnding("win")
    }

    function NoGuess(e) {
        e.preventDefault()
        setCount((prev) => prev + 1)
        setQnumber((prev) => prev + 1)
        if (count == 1) {
            setPic("lost.jpg")
            setEnding("lose")
        }
        else {
            setPokePic(null)
            setPossibleList((prev) => prev.filter((one) => one.name != possibleList[0].name));
        }
    }


    useEffect(() => {
        if (possibleList.length === 1 || guessing === true) {
            const pokemonName = possibleList[0].slug || possibleList[0].name;
            axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                .then(pokemon => {
                    const speciesUrl = pokemon.data.species.url;
                    return axios.get(speciesUrl);
                })
                .then(speciesData => {
                    return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                })
                .then(pokemonData => {
                    const imageUrl = pokemonData.data.sprites.other['official-artwork'].front_default;
                    setPokePic(imageUrl);
                })
        }
    }, [guessing, possibleList]);

    function win(e) {
        e.preventDefault()
        setEnding("win");
        setPic("evil.jpg")
    }

    function lose(e) {
        e.preventDefault()
        setEnding("lose");
        setPic("lost.jpg")
    }

    function resetGame() {
        setGameStart(false)
        setEnding(null)
        setQnumber(0)
        setPokePic(null)
        setGuessing(false)
        setPossibleList(pokemonList)
        setPic("gloom.jpg")
        setCount(0)
    }

    return (
        <div className={`con ${ending == "lose" && "red"}`}>
            {ending == "win" &&
                <>
                    <div className="shimmer"></div>
                    <div className="stars">
                        <div className="star slow">
                            <Lottie animationData={shine} speed={.5} loop={true} />
                        </div>
                        <div className="star">
                            <Lottie animationData={shine} speed={.5} loop={true} />
                        </div>
                        <div className="star">
                            <Lottie animationData={shine} speed={.5} loop={true} />
                        </div>
                    </div>
                </>}
            <div className="main">
                <div className="main-inner">
                    <h1>Pokemon Guesser</h1>
                    <div className="body">
                        <div className="box1">
                            <p className="q">Question {Qnumber}/20</p>
                            {!gameStart ? (
                                <div className="stuff">
                                    <div className="qna">
                                        <p className="bubble bubble-bottom-right">Think of a first-generation pokemon and I will guess it.</p>
                                        <button
                                            onClick={() => { setGameStart(true); setQnumber((prev) => prev + 1); }}>Start</button>
                                    </div>
                                </div>
                            ) : possibleList.length == 0 ? (
                                <>
                                    <div className="stuff">
                                        <div className="qna">
                                            <p className="bubble bubble-bottom-right">Hmmm...that doesn't match any first gen pokemon.<br></br>Please try again.</p>
                                            <button className="purple" onClick={resetGame}>Restart Game</button>
                                        </div>
                                    </div>
                                </>
                            ) : ending == "win" ? (
                                <>
                                    <div className="stuff">
                                        <div className="guess">
                                            <p className="bubble bubble-bottom-right">AHAHAHA! You were a fool to challenge me!</p>
                                            <div className="squish">
                                                <img src={pokePic} alt="pokemon" className="poke-pic" height="200"></img>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : ending == "lose" ? (
                                <>
                                    <div className="stuff">
                                        <div className="guess">
                                            <p className="bubble bubble-bottom-right">W-What! Impossible!</p>
                                            <img src={pokePic} alt="pokemon" height="200" className=" poke-pic figure-8"></img>
                                        </div>
                                    </div>
                                </>
                            ) : guessing == true ? (
                                <>
                                    <div className="stuff">
                                        <div className="guess">
                                            {!pokePic ? (
                                                <>
                                                    <Skeleton height={30} width={200} baseColor="lightgrey" highlightColor="white" />
                                                    <Skeleton height={30} width={200} baseColor="lightgrey" highlightColor="white" />
                                                    <Skeleton height={200} width={200} baseColor="lightgrey" highlightColor="white" />
                                                </>) :
                                                (<> {count == 0 ? (
                                                    <p className="bubble bubble-bottom-right">Maybe it's {possibleList[0].name}?</p>) :
                                                    <p className="bubble bubble-bottom-right">Then perhaps {possibleList[0].name}?</p>
                                                }

                                                    <div className="btns">
                                                        <form onSubmit={YesGuess}>
                                                            <input type="submit" className="purple" value="Yes" />
                                                        </form>
                                                        <form onSubmit={NoGuess}>
                                                            <input type="submit" className="purple" value="No" />
                                                        </form>
                                                    </div>
                                                    <img src={pokePic} alt="pokemon" className="poke-pic" height="200"></img>
                                                </>)
                                            }
                                        </div>
                                    </div>
                                </>
                            ) : possibleList.length == 1 ? (
                                <>
                                    <div className="stuff">
                                        <div className="guess">
                                            {!pokePic ? (
                                                <>
                                                    <Skeleton height={30} width={200} baseColor="lightgrey" highlightColor="white" />
                                                    <Skeleton height={30} width={200} baseColor="lightgrey" highlightColor="white" />
                                                    <Skeleton height={200} width={200} baseColor="lightgrey" highlightColor="white" />
                                                </>) :
                                                (<>
                                                    <p className="bubble bubble-bottom-right">Is it {possibleList[0].name}?</p>
                                                    <div className="btns">
                                                        <form onSubmit={win}>
                                                            <input type="submit" className="purple" value="Yes" />
                                                        </form>
                                                        <form onSubmit={lose}>
                                                            <input type="submit" className="purple" value="No" />
                                                        </form>
                                                    </div>
                                                    <img src={pokePic} alt="pokemon" className="poke-pic" height="200"></img>
                                                </>)
                                            }
                                        </div>
                                    </div>
                                </>
                            ) : ending == null ? (
                                <GameForm ending={ending} setEnding={setEnding} setQnumber={setQnumber} setPic={setPic} possibleList={possibleList} setPossibleList={setPossibleList} setGameStart={setGameStart} setGuessing={setGuessing} />
                            ) : (
                                <p>ERROR</p>
                            )}
                        </div>
                        <div className="box2">
                            <img src={pic} height="220" width="220" className="person"></img>
                            <button className="purple" onClick={resetGame}>Restart Game</button>
                        </div>
                    </div>
                    {ending == "lose" &&
                        <div className="flames">
                            <div className="flame">
                                <Lottie animationData={fire} loop={true} height={200} width={200} />
                            </div>
                            <div className="flame">
                                <Lottie animationData={fire} loop={true} height={200} width={200} />
                            </div>
                            <div className="flame">
                                <Lottie animationData={fire} loop={true} height={200} width={200} />
                            </div>
                            <div className="flame">
                                <Lottie animationData={fire} loop={true} height={200} width={200} />
                            </div>
                            <div className="flame">
                                <Lottie animationData={fire} loop={true} height={200} width={200} />
                            </div>
                            <div className="flame">
                                <Lottie animationData={fire} loop={true} height={200} width={200} />
                            </div>
                            <div className="flame">
                                <Lottie animationData={fire} loop={true} height={200} width={200} />
                            </div>
                            <div className="flame">
                                <Lottie animationData={fire} loop={true} height={200} width={200} />
                            </div>
                            <div className="flame">
                                <Lottie animationData={fire} loop={true} height={200} width={200} />
                            </div>
                        </div>}
                </div>
            </div>
            {ending == "win" &&
                (<div className="stars">
                    <div className="star">
                        <Lottie animationData={shine} speed={.5} loop={true} />
                    </div>
                    <div className="star">
                        <Lottie animationData={shine} speed={.5} loop={true} />
                    </div>
                    <div className="star">
                        <Lottie animationData={shine} speed={.5} loop={true} />
                    </div>
                </div>)}

        </div>
    );
}

export default App;
