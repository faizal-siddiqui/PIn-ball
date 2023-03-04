import { VStack, Heading, Text } from "@chakra-ui/react";

import axios from "axios";

import { useState, useEffect } from "react";
import Player from "./Player";
import { Button } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import Login from "./Login";
import Register from "./Register";

// let scores = [
//   {
//     name: "Rajesh",
//     score: 24,
//     city: "Hanamkonda",
//   },
//   {
//     name: "Faizal",
//     score: 28,
//     city: "Kanpur",
//   },
//   {
//     name: "Mitali",
//     score: 25,
//     city: "Ramgarh",
//   },
//   {
//     name: "Rajesh Ranjan",
//     score: 26,
//     city: "Patna",
//   },
// ];

// scores.sort(function (a, b) {
//   return b.score - a.score;
// });

type userstype = {
  _id: string;
  name: string;
  city: string;
  password: string;
  unique: string;
  score: number;
  lost: number;
  win: number;
  level: number;
  createdAt: string;
  updatedAt: string;
};

const LeaderBoard = () => {
  const [login, setLogin] = useState<boolean>(false);
  const [register, setRegister] = useState<boolean>(false);
  const [users, setUser] = useState<userstype[]>();
  const [wins, setWins] = useState<number>(0);

  const getdata = async () => {
    let res = await axios({
      method: "get",
      url: "https://crimson-ray-shoe.cyclic.app/users",
    });

    res.data.sort(function (a: userstype, b: userstype) {
      return b.win - a.win;
    });
    setUser(res.data);
  };

  let x: any;
  const winns = () => {
    x = setInterval(() => {
      const localwins = localStorage.getItem("wins");
      if (localwins) {
        setWins(+localwins);
      }
    },10000);
  };

  useEffect(() => {
    getdata();
    winns();
    return () => {
      clearInterval(x);
    };
  }, []);
  return (
    <>
      {login || register ? (
        <>
          {register ? (
            <Register setRegister={setRegister} />
          ) : (
            <Login setLogin={setLogin} />
          )}
        </>
      ) : (
        <div
          style={{
            color: "white",
            height: "100%",
          }}
        >
          <h1 style={{ fontSize: "30px" }}>LeaderBoard</h1>
          <VStack mt="20px">
            {users?.map((player, i) => {
              return <Player {...player} key={i} rank={i + 1} />;
            })}
          </VStack>

          <Heading mt="20px" size="lg">
            Your Wins
          </Heading>
          <Text fontSize="30px" mt="10px">
            {wins}
          </Text>
          <Text>Please login to post</Text>
          <HStack mt="20px" justifyContent="center" gap="20px">
            <Button color="black" onClick={() => setLogin(true)}>
              login
            </Button>
            <Button color="black" onClick={() => setRegister(true)}>
              register
            </Button>
          </HStack>
        </div>
      )}
    </>
  );
};

export default LeaderBoard;
