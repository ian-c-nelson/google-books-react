import React from "react";

function Results({ children }) {
  return (
    <div
      style={{ height: 630, clear: "both", paddingTop: 10, textAlign: "left" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Results;
