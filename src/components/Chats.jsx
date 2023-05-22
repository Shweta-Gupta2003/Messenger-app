import React, { useContext, useEffect, useState } from 'react';
import {doc, onSnapshot} from "firebase/firestore";
import { db } from "../firebase";
import {AuthContext } from "../context/AuthContext";
import { ChatContext } from '../context/ChatContext';
  const Chats =() =>{

    const [chats,setChats]= useState([]);

    const {currentUser} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);

    useEffect(() =>{

        const getChats = () =>{

        const unSub=onSnapshot(doc(db , "userChats", currentUser.uid), (doc) => {
            console.log("Current data: ", doc.data());
            setChats(doc.data());
        });
        return() =>{
            unSub();
        };
    };
      currentUser.uid && getChats();
    },[currentUser.uid]);

    const handleSelect =(u) =>{
        dispatch({type:"CHANGE_USER", payload: u});
    };


    return(
        <div className="chats">
            {Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map(chat =>(
                <div className="userChat" key={chat[0]} onClick={() =>handleSelect(chat[1].userInfo)}>
                     <img  className="photo" src={chat[1].userInfo.photoURL} alt="" />
                <div className="userChatInfo">
                    <span className="span">{chat[1].userInfo.displayName}</span>
                    <p className="p">{chat[1].lastMessage?.text}</p>
                </div>

            </div>
            
            ))}
        </div>
    );
};

export default Chats;