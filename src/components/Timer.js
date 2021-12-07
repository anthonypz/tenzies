import React from "react";

export default function Timer(props) {
  return (
    <p className="stopwatch">
      Timer:
      <span className="digits minutes">
        {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
      </span>
      <span className="digits seconds">
        {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.
      </span>
      <span className="digits mili-sec">
        {("0" + ((props.time / 10) % 100)).slice(-2)}
      </span>
    </p>
  );
}
