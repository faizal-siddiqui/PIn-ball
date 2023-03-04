import React, { useState } from "react";
import { VStack, Input, Button } from "@chakra-ui/react";
import axios from "axios";

type register = {
  setRegister: (value: boolean) => void;
};

const Register = ({ setRegister }:register) => {
  const [details, setDetails] = useState({});

  const hanldeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDetails({ ...details, [name]: value });
    console.log(details);
  };

  const handleRegister = async () => {
    console.log(details);
    let res=await axios({
      method: "post",
      url: "https://crimson-ray-shoe.cyclic.app/users/register",
      data: details,
    });
    console.log(res);
  };

  return (
    <VStack
      background="white"
      p={"30px"}
      boxShadow="2xl"
      borderRadius={"5px"}
      alignItems={"left"}
    >
      <label style={{ textAlign: "left" }}>Name</label>
      <Input
        type={"text"}
        placeholder="username"
        textAlign={"left"}
        required
        name="name"
        onChange={hanldeChange}
      />
      <label style={{ textAlign: "left" }}>Password</label>
      <Input
        type={"password"}
        placeholder="password"
        textAlign={"left"}
        required
        name="password"
        onChange={hanldeChange}
      />
      <label style={{ textAlign: "left" }}>City</label>
      <Input
        type={"text"}
        placeholder="City"
        textAlign={"left"}
        required
        name="city"
        onChange={hanldeChange}
      />
      <Button
        bgColor="#DB4437"
        color="white"
        fontSize="20px"
        p="15px"
        borderRadius="4"
        cursor="pointer"
        _hover={{
          bgColor: "white",
          color: "#DB4437",
        }}
        transition="0.4s"
        mt="30px"
        textAlign="start"
        type="submit"
        w="100px"
        m="15px auto!important"
        onClick={handleRegister}
      >
        register
      </Button>
      <div
        style={{
          cursor: "pointer",
          fontSize: "20px",
        }}
        onClick={() => setRegister(false)}
      >
        &larr; back
      </div>
    </VStack>
  );
};

export default Register;
