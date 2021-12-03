import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Timer from "./components/Timer";
import RecordTime from "./components/RecordTime";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());

  //Track number of dice rolls
  const [count, setCount] = React.useState(0);

  //Check if the game was been completed/won
  const [tenzies, setTenzies] = React.useState(false);
  //Check if the player has won the game
  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      setStart(false);
    }
  }, [dice]);

  //State for the stopwatch
  const [time, setTime] = React.useState(0);
  const [start, setStart] = React.useState(false);
  //Start the stopwatch
  React.useEffect(() => {
    let interval = null;
    if (start && !tenzies) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [start, tenzies]);

  const recordTime = localStorage.getItem("bestTime");
  const [bestTime, setBestTime] = React.useState(recordTime || "");
  React.useEffect(() => {
    let recordTime = localStorage.getItem("bestTime");
    if (tenzies && !start && (bestTime === "" || time < recordTime)) {
      localStorage.setItem("bestTime", time);
      recordTime = localStorage.getItem("bestTime");
      setBestTime(recordTime);
    }
  }, [tenzies, start, time, bestTime]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setCount((oldCount) => oldCount + 1);
      setStart(true);
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setCount(0);
      //setStart(false);
      setTime(0);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    if (!tenzies) {
      setStart(true);
    }
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <div className="timers-container">
        <p className="roll-counter">Dice roll count: {count}</p>
        <Timer time={time} />
        {bestTime !== "" && <RecordTime bestTime={bestTime} />}
      </div>
    </main>
  );
}
