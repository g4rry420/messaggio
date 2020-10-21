import React,{ useState, useContext } from 'react'
import { Redirect } from "react-router-dom"

import "./login.styles.css"
import FormInput from "../form-input/form-input.component"
import CustomButton from "../custom-button/custom-button.component"
import { signInWithGoogle, auth } from "../../firebase/firebase.utils"
import { MainContext } from '../../context/main-context'

export default function Login( {displayLogin, setDisplayLogin}) {

  const { currentUser } = useContext(MainContext)

  const [login, setLogin] = useState({
      email: "",
      password: ""
  })
  
  const handleChange = (e) => {
    const { value, name } = e.target;
      setLogin({...login, [name]: value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = login;
      try {
          await auth.signInWithEmailAndPassword(email, password);
      } catch (error) {
          console.log(error)
      }

    setLogin({ email: "", password: "" });
  }

  const handleSignUp = () => {
    setDisplayLogin(!displayLogin);
    }

    if(currentUser) return <Redirect to="/groups" />
  
  return(
  <form className="pt-5" onSubmit={handleSubmit}>
      <FormInput name="email" handleChange={handleChange} value={login.email} type="email" placeholder="Email" />
      <FormInput name="password" handleChange={handleChange} value={login.password} type="password" placeholder="Password" />

      <div className="text-center d-flex justify-content-around both-buttons-container">
        <div onClick={signInWithGoogle} className="google-login mb-4">
          <CustomButton  type="button" title="Sign&nbsp;In&nbsp;With&nbsp;Google" button="login-button" />
        </div>
        <CustomButton type="submit" title="Login" button="login-button" />
        <p>Didn't have account yet ? <span onClick={handleSignUp}>SignUp</span> </p>
      </div>
  </form>
  )
}
