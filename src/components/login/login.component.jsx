import React,{ useState } from 'react'

import "./login.styles.css"
import FormInput from "../form-input/form-input.component"
import CustomButton from "../custom-button/custom-button.component"
import { signInWithGoogle } from "../../firebase/firebase.utils"

export default function Login() {
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })
    
      const handleChange = (e) => {
        const { value, name } = e.target;
          setLogin({...login, [name]: value});
          console.log(name, value)
      }
    
      const handleSubmit = (e) => {
        // e.preventDefault();
      }
  
    return(
    <form className="pt-5" onSubmit={handleSubmit}>
        <FormInput name="email" handleChange={handleChange} value={login.email} type="email" placeholder="Email" />
        <FormInput name="password" handleChange={handleChange} value={login.password} type="password" placeholder="Password" />

        <div className="text-center d-md-flex justify-content-around both-buttons-container">
          <div onClick={signInWithGoogle} className="google-login mb-4">
            <CustomButton  type="button" title="Sign In With Google" button="login-button" />
          </div>
          <CustomButton type="submit" title="Login" button="login-button" />
          <p>Didn't have account yet ? <span>SignUp</span> </p>
        </div>
    </form>
    )
}
