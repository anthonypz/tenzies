import React from "react";

export default function RecordTime(props) {
  return (
    <p className="record-time">
      Fastest time:
      <span className="digits minutes">
        {("0" + Math.floor((props.bestTime / 60000) % 60)).slice(-2)}:
      </span>
      <span className="digits seconds">
        {("0" + Math.floor((props.bestTime / 1000) % 60)).slice(-2)}.
      </span>
      <span className="digits mili-sec">
        {("0" + ((props.bestTime / 10) % 100)).slice(-2)}
      </span>
    </p>
  );
}
