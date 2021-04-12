import React,{ useContext } from 'react'
import { Link } from "react-router-dom"
import imag from "../../assets/default.jpg"

import "./chats.styles.css"
import { MainContext } from "../../context/main-context"

export default function Chats({ match }) {

    const { chatsList } = useContext(MainContext)

    return (
        <div className="container list-main-container">
            <ul className="list-container pt-5">
            {
                chatsList.length ? chatsList.map(list => (
                    <li key={list.id}  className="p-1 px-4">
                        <div className="img-container">
                            <img src={imag} alt="default picture"/>
                        </div>
                        <Link to={{ pathname: `${match.url}/${list.id}`, state: { sendby: list.name, userId: list.id } }}>
                            <div className="ml-4 list-content">
                                <h3 className="display-4"> {list.name} </h3>
                            </div>
                        </Link>
                    </li>
                )) : (
                    <div className="text-center other-text">
                        <p className="display-4">Chat with someone personally from the groups.</p>
                    </div>
                )
            }
            </ul>
        </div>
    )
}
