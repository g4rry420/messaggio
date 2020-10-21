import React,{ useContext, useEffect } from 'react'
import { Link } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

import "./individual-user.component.jsx"
import CustomButton from "../../components/custom-button/custom-button.component"
import FormInput from "../../components/form-input/form-input.component"
import { MainContext } from '../../context/main-context.js'
import { individualUserMessages } from "../../firebase/firebase.utils"

export default function IndividualUser({ location: { state }  }) {


    const { individualChatList, setIndividualChatList,individualChatMessage, setIndividualChatMessage,
            currentUser, combineUserId, setCombineUserId } = useContext(MainContext);

    useEffect(() => {
        if(currentUser.uid < state.userId){
            setCombineUserId(currentUser.uid + state.userId);
         }else{
            setCombineUserId(state.userId + currentUser.uid);
         }
    },[combineUserId])

    const handleChange = (e) => {
        setIndividualChatMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();


        let combineUserId = "";
        if(currentUser.uid < state.userId){
           combineUserId = currentUser.uid + state.userId;
        }else{
            combineUserId = state.userId + currentUser.uid;
        }

        const dataToSend = {
            combineUserId,
            senderName: currentUser.displayName,
            senderId: currentUser.uid,
            receiverName: state.sendby,
            receiverId: state.userId,
            message: individualChatMessage
        }

        individualUserMessages(currentUser, dataToSend)

        setIndividualChatList([...individualChatList, {id: uuidv4(),  message: individualChatMessage, time: new Date().getHours() + ":" + new Date().getMinutes(), sendBy:  currentUser.displayName.split(" ")[0]}]);
        setIndividualChatMessage("");
    }

    return (
        <div className="chat-container">
            <div className="group-heading text-center">
                <h4 className="display-4"> { state.sendby } </h4>
            </div>
            <div className="chat-messages">
                <ul className="chat-list-container mt-3">
                {
                    individualChatList && individualChatList.map(list => (
                        <li key={list.id}  className={`mb-4 ${currentUser  && currentUser.uid === list.userId && "chat-reciever"}`}>{list.message}
                            <span className="time-stamp"> {list.time} </span>
                            <div className="dropdown-profile">
                                <Link to={``}> 
                                    <button className="btn btn-personally">Message&nbsp;Personally</button>
                                </Link>
                            </div> 
                        </li>
                    ))
                }
                   
                </ul>
            </div>

            <form className="message-form-container" onSubmit={handleSubmit}>
                <FormInput addClass="message-input" name="message" type="text" handleChange={handleChange} value={individualChatMessage}  placeholder="Type a message..." />
                <CustomButton type="submit" title="Send" button="send-chat" />
            </form>

        </div>
    )
}
