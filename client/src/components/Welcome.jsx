import React from "react";
import styled from "styled-components";
import HelloImage from "../assets/hello.gif";
import Logout from "./Logout";


const Welcome = ({ currentUsername }) => {
  return (
    <Container>
      <div className="logoutButton">
        <Logout />
      </div>
      <img src={HelloImage} alt="Dog saying Hi!" />
      <h1>
        Welcome, <span>{currentUsername}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
};



const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  text-align: center;
  position: relative;
  .logoutButton {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
  }
  img {
    height: 13rem;
    @media screen and (min-width: 720px) {
      height: 20rem;
    }
  }
  span {
    color: rgb(255, 82, 161);
  }
`;

export default Welcome;
