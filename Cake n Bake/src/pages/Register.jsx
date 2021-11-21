import styled from "styled-components";
import { mobile } from "../responsive";
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useState } from "react";
import {useHistory,Link} from "react-router-dom";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://img.freepik.com/free-vector/cake-pattern-background_1340-961.jpg?size=338&ext=jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
const history =useHistory("")

  const handleClick = (e) => {
    e.preventDefault();
    register(dispatch, { username, password,email,ConfirmPassword });
  };

  
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form >
          <Input placeholder="name" />
          <Input placeholder="last name" />
          <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="email" onChange={(e) => setemail(e.target.value)} />
          <Input placeholder="password"  onChange={(e) => setPassword(e.target.value)} />
          <Input placeholder="confirm password"  onChange={(e) => setConfirmPassword(e.target.value)}/>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
           <Link style={{cursor:"pointer"}} onClick={()=>history.push('/login')}>Already Have an account,Click Here!</Link>
          <Button  onClick={handleClick} disabled={isFetching}>CREATE</Button>
        </Form>
      </Wrapper>
     
    </Container>
  );
};

export default Register;
