import React,{ useContext } from 'react'
import { Link } from "react-router-dom"

import "./groups.styles.css"
import { MainContext } from "../../context/main-context"

export default function Groups({ match, location }) {
    const { groupsList } = useContext(MainContext);
    return (
        <div className="container list-main-container">
            <ul className="list-container pt-5">
            {
                groupsList && groupsList.map(group => (
                    <li key={group.id} className="p-1 px-4">
                        <div className="img-container">
                            <img src='https://www.applozic.com/resources/sidebox/css/app/images/mck-icon-group.png' alt="default"/>
                        </div>
                        <Link to={{ pathname: `${match.url}/${group.id}`, state: { previousPath: location.pathname, grouptitle: group.title, groupId: group.id } }}>
                            <div className="ml-4 list-content">
                                <h3 className="display-4"> { group.title } </h3>
                            </div>
                        </Link>
                    </li>
                ))
            }
            </ul>
        </div>
    )
}
