import React,{ useContext, useEffect, useRef  } from 'react'
import { Link } from "react-router-dom"

import "./group-chat.styles.css"
import { MainContext } from '../../context/main-context'
import FormInput from '../../components/form-input/form-input.component'
import CustomButton from "../../components/custom-button/custom-button.component"
import { groupMessages } from "../../firebase/firebase.utils"

export default function GroupChat({ location: { state }  }) {
    const { groupChatMessage, setGroupChatMessage,groupChatList, setGroupChatList, currentUser,  setGroupID } = useContext(MainContext)

    const chatMessagesRef = useRef();

    useEffect(() => {
        setGroupID(state.groupId)
    }, [])

    useEffect(() => {
        if(groupChatList){
            let scrollHeight = chatMessagesRef.current.scrollHeight;
            chatMessagesRef.current.scrollTop = scrollHeight;
        }
    },[chatMessagesRef])
   
    const handleChange = (e) => {
        setGroupChatMessage(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let scrollHeight = chatMessagesRef.current.scrollHeight;
        chatMessagesRef.current.scrollTop = scrollHeight
        
        let dataToSend = {
            message: groupChatMessage,
            time: new Date().getHours() + ":" + new Date().getMinutes(),
            groupName: state.grouptitle,
            groupId: state.groupId,
        }

        await groupMessages(currentUser, dataToSend)

        // setGroupChatList([...groupChatList,{ id: uuidv4(), message: groupChatMessage, time: new Date().getHours() + ":" + new Date().getMinutes(), sendBy:  currentUser.displayName, userId: currentUser.uid }]);
        setGroupChatMessage("");
    }
    return (
        <div className="chat-container">
            <div className="group-heading text-center">
                <h4 className="display-4"> {state.grouptitle} </h4>
            </div>
            <div ref={chatMessagesRef} className="chat-messages">
                <ul className="chat-list-container mt-3">
                {
                    groupChatList && groupChatList.map(chat => (
                        <li key={chat.id} className={`mb-4 ${currentUser && currentUser.displayName === chat.sendBy && "chat-reciever"}`}>{chat.message}
                            <span className="chat-name">{chat.sendBy.split(" ")[0] }</span>
                            <span className="time-stamp"> {chat.time} </span>
                            {   
                                currentUser && currentUser.displayName !== chat.sendBy && (
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
