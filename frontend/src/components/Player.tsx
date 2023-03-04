import React from "react";
import { HStack, Text, Heading } from "@chakra-ui/react";

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
  rank:number
};

const Player = (player: userstype) => {


  return (
    <>
      <HStack
        fontSize={"20px"}
        fontWeight={"semibold"}
        justifyContent={"flex-start"}
        width="90%"
        color="white"
      >
        <Text w="30px">{player.rank}.</Text>
        <Text w="300px" textAlign="start">
          {player.name} ,
          <span style={{ fontWeight: "normal", fontSize: "15px" }}>
            {player.city}
          </span>
        </Text>
        <Text>{player.win}</Text>
        <Text>{player.lost}</Text>
      </HStack>
    </>
  );
};

export default Player;
