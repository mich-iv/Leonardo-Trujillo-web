import React, { useEffect, useState } from 'react'
import {auth, provider} from "../../../firebase.jsx";
import {signInWithPopup} from "firebase/auth";
import Menu from '../Menu.jsx';
import {redirect, useNavigate} from 'react-router-dom'

export default function Route(){
    const navigate = useNavigate()
    const [value, setValue] = useState('')
    const handleClick =()=>{
        signInWithPopup(auth, provider).then((data)=>{
            setValue(data.user.email)
            localStorage.setItem("email", data.user.email)
        })
    }

    useEffect(()=>{
        setValue(localStorage.getItem('email'));
        console.log('aaaaaaaa1a');
        
    })

    if(value){
        navigate('/')
        window.location.reload();
    }
    
  return (
    <div>
        <h1>Login</h1>
        {value ?'Sesión iniciada con '+value:
            <button onClick={handleClick}>Iniciar sesión con Google</button>
        }
    </div>
    
  )
}
