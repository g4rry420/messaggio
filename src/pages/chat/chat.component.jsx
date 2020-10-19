import React,{ useContext, useEffect} from 'react'
import { v4 as uuidv4 } from "uuid"

import "./chat.styles.css"
import { MainContext } from '../../context/main-context'
import FormInput from '../../components/form-input/form-input.component'
import CustomButton from "../../components/custom-button/custom-button.component"
import { groupMessages } from "../../firebase/firebase.utils"

export default function Chat({ location: { state }  }) {
    const { chatList, setChatList,chatMessage, setChatMessage, currentUser, getGroupId, groupID, setGroupID } = useContext(MainContext)

    useEffect(() => {
        setGroupID(state.groupId)
    }, [])
    // useEffect(() => {
    //     setHeaderDisplay(!headerDisplay);
    // }, [setHeaderDisplay])

    // useEffect(() => {
    //     console.log("I am called", chatMessage)
    //     setChatList([ { message: chatMessage}])
    // },[chatMessage])=
    const handleChange = (e) => {
        setChatMessage(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let dataToSend = {
            message: chatMessage,
            time: new Date().getHours() + ":" + new Date().getMinutes(),
            groupName: state.grouptitle,
            groupId: state.groupId,
        }

        getGroupId(state.groupId)

        groupMessages(currentUser, dataToSend)

        setChatList([...chatList,{ id: uuidv4(), message: chatMessage, time: new Date().getHours() + ":" + new Date().getMinutes(), sendBy:  currentUser.displayName.split(" ")[0] }]);
        setChatMessage("");
    }


    return (
        <div className="chat-container">
            {/*<div className="pl-2 back-container">
                <Link to={props.location.state.previousPath}>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-double-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        <path fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                    <span className="display-4">Back</span>
                </Link>
            </div>*/}
            <div>
                <ul className="chat-list-container mt-3">
                {
                    chatList.length ? chatList.map(chat => (
                        <li key={chat.id} className={`mb-4 ${currentUser && currentUser.displayName.split(" ")[0] === chat.sendBy && "chat-reciever"}`}>{chat.message}
                            <span className="chat-name">{chat.sendBy }</span>
                            <span className="time-stamp"> {chat.time} </span>
                        </li>
                    )) : null
                }
                </ul>
                <ul className="another-user">

                </ul>
            </div>

            <form className="message-form-container" onSubmit={handleSubmit}>
                <FormInput addClass="message-input" name="message" type="text" handleChange={handleChange} value={chatMessage} placeholder="Type a message" />
                <CustomButton type="submit" title="Send" button="send-chat" />
            </form>

        </div>
    )
}
