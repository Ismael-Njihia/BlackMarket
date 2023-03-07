import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getAllUsers, host } from "../Api/index";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io, Socket } from "socket.io-client";
import { User } from "../interfaces";
import React from "react";

function Chat() {
  const [contacts, setContacts] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();
  const socket = useRef<Socket>();

  // useEffect(() => {
  //   const setUser = async () => {
  //     // if (!localStorage.getItem("chat-app-user")) {
  //     //   navigate("/signin");
  //     // } else {
  //     //   setCurrentUser(
  //     //     await JSON.parse(localStorage.getItem("chat-app-user")!)
  //     //   );
  //     // }
  //   };
  //   setUser();
  // }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current! = io(host);
      socket.current!.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  // useEffect(() => {
  //   const getContats = async () => {
  //     if (currentUser) {
  //       const { data } = await getAllUsers(currentUser._id);
  //       setContacts(data);
  //     } else {
  //        navigate("/setAvatar");
  //     }
  //   };
  //   getContats();
  // }, [currentUser, navigate]);

  const handleChatChange = (chat: any) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        <div className="container">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {currentChat === undefined ? (
            <Welcome currentUsername={currentUser?.username || ""} />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: -webkit-fill-available;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #0e0e11;
  .container {
    height: 100vh;
    width: 100vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 20% 80%;

    @media screen and (min-width: 720px) {
      grid-template-columns: 35% 65%;
      grid-template-rows: none;
      width: 85vw;
      height: 100vh;
    }
    @media screen and (min-width: 1100px) {
      grid-template-columns: 28% 72%;
    }
  }
`;

export default Chat;
