import React, { useState } from 'react'

import "./signup.styles.css"
import CustomButton from "../custom-button/custom-button.component"
import FormInput from "../form-input/form-input.component"
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils"

export default function SignUp({ displayLogin, setDisplayLogin }) {
    const [signupForm, setSignUpForm] = useState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleSubmit = async event => {
        event.preventDefault();

        const { displayName, email, password,confirmPassword } = signupForm;

        if(password !== confirmPassword){
            alert("Passwords don't match");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, {displayName});
            setSignUpForm({
                displayName: "",
                email: "",
                password: "",
                confirmPassword: ""
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setSignUpForm({ ...signupForm, [name]: value})
    } 

    const handleLogin = () => {
        setDisplayLogin(!displayLogin);
    }

    const { displayName, email, password,confirmPassword } = signupForm;
    return (
        <div className="pt-4">
            <div className="heading-container-in-login">
                <p className='my-3'>Sign Up with your email and password</p>
            </div>
            <form className="mt-5" onSubmit={handleSubmit}>
                <FormInput name="displayName" type="text" handleChange={handleChange} value={displayName} placeholder="Full Name" />
                <FormInput name="email" type="email" handleChange={handleChange} value={email} placeholder="Email" />
                <FormInput name="password" type="password" handleChange={handleChange} value={password} placeholder="Password" />
                <FormInput name="confirmPassword" type="password" handleChange={handleChange} value={confirmPassword} placeholder="Confirm Password" />
                <div className="text-center login-buttons-container">
                    <CustomButton title="SignUp" button="login-button" />
                    <p>Already have an account ? <span onClick={handleLogin}>Login</span></p>
                </div>
            </form>
        </div>
    )
}
