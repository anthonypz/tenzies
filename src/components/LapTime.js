import React from "react";

export default function LapTime({ time, tenzies, diff }) {
  if (!tenzies) {
    return null;
  }

  const color = {
    color: time < diff ? "green" : "red",
  };

  const plusOrMinus = time < diff ? "+" : "-";
  let difference = Math.abs(diff - time);

  return (
    <>
      <span style={color}>
        <span className="digits seconds laptime">
          {plusOrMinus}
          {("0" + Math.floor((difference / 1000) % 60)).slice(-2)}.
        </span>
        <span className="digits mili-sec">
          {("0" + ((diff / 10) % 100)).slice(-2)}
        </span>
      </span>
    </>
  );
}
