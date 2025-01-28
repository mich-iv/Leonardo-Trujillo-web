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
            setNombre(data.displayName);
        }).catch((error)=>{
            console.log(error);
        }).then(()=>{
            // navigate(-1);
            //window.location.reload();
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
        // navigate(-1);
        //window.location.reload();
    }
    
return (
    <div>
            <h1 className='titulos'>
                    Login
            </h1>
            
            {/* un h2 para decir que la cuenta está iniciada */}
            <h2>Signed in as</h2>
            <div className='texto' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem', padding: '0', textAlign: 'start'}}>
                <div className="g-signin2" data-onsuccess="onSignIn"></div>
                {nombre ?
                    <>
                        <img src={foto} alt={nombre}/>{nombre}
                    </>
                :
                    <button onClick={handleClick}>Google Sign-In</button>
                }
            </div>
    </div>
)
}