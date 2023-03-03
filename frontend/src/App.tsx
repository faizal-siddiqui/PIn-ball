import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./main";

function App() {
  const [flag, setFlag] = useState(false); //* true -> background otherwise game

  useEffect(() => {
    setFlag(true);
  }, []);

  console.log(flag);
  return (
    <div className="App">
      <h1>Hello World</h1>
      {flag ? (
        <div
          style={{
            width: "850px",
            height: "460px",
            position: "absolute",
            left: "0px",
            background: "url(./background.jpg)",
          }}
        >
          <button
            style={{
              padding: "20px 75px 20px 75px",
              position: "absolute",
              left: "320px",
              top: "200px",
              backgroundColor: "peachpuff",
            }}
            onClick={() => setFlag(!flag)}
          >
            {flag ? "Start" : "Stop"}
          </button>
          {/* {games} */}
        </div>
      ) : (
        // <button
        //   style={{
        //     border: "4px solid red",
        //     paddingLeft: "75px",
        //     paddingRight: "75px",
        //     position: "absolute",
        //     left: "400px",
        //     top: "250px",
        //   }}
        //   onClick={() => setFlag(!flag)}
        // >
        //   {flag ? "Start" : "Stop"}
        // </button>
        <></>
      )}

      <div
        style={{
          border: "4px solid red",
          width: "25%",
          height: "500px",
          position: "absolute",
          left: "900px",
        }}
      >
        {/* {games} */}
      </div>
    </div>
  );
}

export default App;
