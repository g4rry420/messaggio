import React,{ useContext, useEffect} from 'react'
import { v4 as uuidv4 } from "uuid"
import { Link } from "react-router-dom"

import "./group-chat.styles.css"
import { MainContext } from '../../context/main-context'
import FormInput from '../../components/form-input/form-input.component'
import CustomButton from "../../components/custom-button/custom-button.component"
import { groupMessages } from "../../firebase/firebase.utils"

export default function GroupChat({ location: { state }  }) {
    const { groupChatMessage, setGroupChatMessage,groupChatList, setGroupChatList, currentUser,  setGroupID } = useContext(MainContext)

    useEffect(() => {
        setGroupID(state.groupId)
    }, [])
   
    const handleChange = (e) => {
        setGroupChatMessage(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let dataToSend = {
            message: groupChatMessage,
            time: new Date().getHours() + ":" + new Date().getMinutes(),
            groupName: state.grouptitle,
            groupId: state.groupId,
        }

        groupMessages(currentUser, dataToSend)

        setGroupChatList([...groupChatList,{ id: uuidv4(), message: groupChatMessage, time: new Date().getHours() + ":" + new Date().getMinutes(), sendBy:  currentUser.displayName, userId: currentUser.uid }]);
        setGroupChatMessage("");
    }
    return (
        <div className="chat-container">
            {/*<div className="pl-2 back-container">
                <Link to={state.previousPath}>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-double-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        <path fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                    <span className="display-4">Back</span>
                </Link>
            </div>*/}
            <div className="group-heading text-center">
                <h4 className="display-4"> {state.grouptitle} </h4>
            </div>
            <div className="chat-messages">
                <ul className="chat-list-container mt-3">
                {
                    groupChatList && groupChatList.map(chat => (
                        <li key={chat.id} className={`mb-4 ${currentUser && currentUser.displayName === chat.sendBy && "chat-reciever"}`}>{chat.message}
                            <span className="chat-name">{chat.sendBy.split(" ")[0] }</span>
                            <span className="time-stamp"> {chat.time} </span>
                            {   
                                currentUser && currentUser.displayName.split(" ")[0] !== chat.sendBy && (
                                    <div className="dropdown-profile">
                                        <Link to={{ pathname:`/chats/${chat.userId}`, state: { userId: chat.userId, sendby:chat.sendBy }}}> 
                                            <button className="btn btn-personally">Message&nbsp;Personally</button>
                                        </Link>
                                    </div>
                                )
                            }
                        </li>
                    ))
                }
                </ul>
            </div>

            <form className="message-form-container" onSubmit={handleSubmit}>
                <FormInput addClass="message-input" name="message" type="text" handleChange={handleChange} value={groupChatMessage} placeholder="Type a message..." />
                <CustomButton type="submit" title="Send" button="send-chat" />
            </form>

        </div>
    )
}
