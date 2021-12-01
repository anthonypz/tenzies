import React from "react";

function Pip() {
  return <span className="pip" />;
}

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#f5f5f5fc",
  };

  let pips = [...Array(props.value).keys()].map((_, i) => <Pip key={i} />);

  return (
    <div className="die-face" style={styles} onClick={props.holdDice}>
      {pips}
    </div>
  );
}
