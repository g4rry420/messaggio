import React, { useContext } from 'react'
import { Redirect } from "react-router-dom"

import "./create-group.styles.css"
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component"
import Heading from "../../components/heading/heading.component"
import { createNewGroup } from "../../firebase/firebase.utils"
import { MainContext } from "../../context/main-context"

export default function CreateGroup() {

    const { currentUser, createGroup, setCreateGroup } = useContext(MainContext);

    if(!currentUser) return <Redirect to="/loginorsignup" />

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCreateGroup({...createGroup, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createNewGroup(currentUser, createGroup)
        setCreateGroup({
            groupName: "",
            description: ""
        })
    } 

    const { groupName, description } = createGroup;

    return (
        <>
        <Heading textCase="text-capitalize" display="display-5" title="New Group" h1="heading-in-create-group" />
        <form className="container create-group-form pt-5" onSubmit={handleSubmit}>
            <FormInput addClass="" name="groupName" type="text" handleChange={handleChange} value={groupName} placeholder="Name" />
            <div className="form-group">
                <textarea onChange={handleChange} name="description" value={description} className="form-control" placeholder="Description" name="description" rows="4"></textarea>
            </div>
            <div className="text-center">
                <CustomButton  type="submit" title="Create" button="create-group-button" />
            </div>
        </form>
        </>
    )
}
