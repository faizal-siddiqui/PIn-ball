import React, { useEffect, useState } from "react";
import "./App.css";

import "./main";
import { SiStartrek } from "react-icons/si"
import { Heading } from "@chakra-ui/react";
import LeaderBoard from "./components/LeaderBoard";
// import LeaderBoard from "./components/LeaderBoard";

function App() {
  const [flag, setFlag] = useState(false); //* true -> background otherwise game

  useEffect(() => {
    setFlag(true);
  }, []);

  console.log(flag);

  return (
    <div className="App">
      <div
        style={{
          position: "absolute",
          height: "100vh",
          zIndex: "-1",
          width: "100%",
          top: "-100px",
          backgroundColor: "#D9AFD9",
          backgroundImage: "linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)",
        }}
      >
        <Heading>WELCOME TO THE GAME : PIN BALL</Heading>
      </div>
      {flag ? (
        <div
          style={{
            width: "850px",
            height: "460px",
            position: "absolute",
            left: "0px",
            background: "url(./background.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <button
            style={{
              padding: "20px 75px 20px 75px",
              fontSize: "50px",
              position: "absolute",
              left: "320px",
              top: "200px",
              backgroundColor: "teal",
              color: "#00e6aa",
              border: "none",
              borderRadius: "12px",
              backgroundImage: "linear-gradient(red, green)",
            }}
            onClick={() => setFlag(!flag)}
          >
            {flag ? <SiStartrek /> : "Stop"}
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
          // border: "4px solid red",
          width: "25%",
          height: "500px",
          position: "absolute",
          left: "900px",
          // backgroundColor: "black",
          padding: "20px",
          // width: "25%",
          // height: "500px",
          // margin: "auto",
          // marginTop: "50px",
          // padding: "20px",
          backgroundImage: "linear-gradient(#780206, #061161)",
        }}
      >
        <LeaderBoard />
      </div>
    </div>
  );
}

export default App;
