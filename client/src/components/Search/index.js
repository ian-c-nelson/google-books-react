import React from "react";

function Search({ children }) {
  return (
    <div
      style={{ height: 150, clear: "both", paddingTop: 10, textAlign: "left", backgroundColor: "#eeeee" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Search;
