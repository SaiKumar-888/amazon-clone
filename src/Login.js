
import React, { useState } from 'react'
import './Login.css'
import { Link, useHistory } from 'react-router-dom';
import { auth } from "./firebase";

function Login() {
    const [email, setEmail ] = useState('');
    const [ pass , setPass ] =  useState('');
    const history = useHistory();

    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,pass)
        .then(auth => {
            if(auth) {
                history.push('/')
            }
        })
        .catch( error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();
        auth
            .createUserWithEmailAndPassword(email, pass)
            .then( auth => {
                console.log(auth);
                if( auth ) {
                   history.push('/')
                }
            })
            .catch( error => alert(error.message))
    }
    return (
        <div className="login">
            <Link  to="/">
            <img  className="login__logo"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt="" ></img>
            </Link>
        

            <div className="login__container">
                <h1>Sign In</h1>

                <form>
                    <h5>Email</h5>
                    <input type="text" value={email} onChange= {(e) => setEmail(e.target.value)}></input>

                    <h5>Password</h5>
                    <input type="password" value={pass} onChange={(e) => setPass(e.target.value)}></input>

                <button  type='submit' className="login__signInButton" onClick={signIn}>Sign In</button>
                </form>
                <p>
                By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button  className="login__registerButton" onClick={register}>Create your Amazon account</button>

            </div>
        </div>
    )
}

export default Login
