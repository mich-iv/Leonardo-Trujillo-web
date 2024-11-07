import React, { useEffect, useState } from 'react'
import {auth, provider} from "../../../firebase.jsx";
import {signInWithPopup, GoogleAuthProvider, getAuth, onAuthStateChanged} from "firebase/auth";
import Menu from '../Menu.jsx';
import {useNavigate} from 'react-router-dom'

export default function Route(){
    const navigate = useNavigate();
    
    //declaramos vairables para datos de usuario
    const [correo, setCorreo] = useState("");
    const [nombre, setNombre] = useState('');
    const [foto, setFoto] = useState("");
    const [token, setToken] = useState('');

    //asignamos una variable con el método para el popup de Google
    const handleClick =()=>{
        signInWithPopup(auth, provider).then((data)=>{
            const credential = GoogleAuthProvider.credentialFromResult(data);
            setToken(credential.accessToken); //guardamos los datos obtenidos
            setNombre(data.user);
        })
    }

    //método para recuperar datos del usuario con sesión iniciada
    //NOTA: probablemente hay otro método que no implique un useEffect,
    //PERO NO ESTOY MUY SEGURO, Y NO SÉ SI SEA NECESARIO.
    const sesion = getAuth();
    //sin el useEffect, se cicla y se va a la porquería jkaskj
    useEffect(() => {
        onAuthStateChanged(sesion, (usuario) => {
        if (usuario) {
            setCorreo(usuario.email);
            setNombre(usuario.displayName);
            setFoto(usuario.photoURL);
            setToken(usuario.accessToken);
        }
        })
    }, []) 

    //existe un token? entonces, redirecciona al inicio
    if(token){
        navigate('/')
        //window.location.reload();
    }
    
  return (
    <div>
        <h1>Login</h1>
        <div className="g-signin2" data-onsuccess="onSignIn"></div>
        {nombre ?'Google account: '+nombre:
            <button onClick={handleClick}>Google Sign-In </button>
        }
    </div>
  )
}