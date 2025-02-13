import { React, useEffect, useState } from 'react';
import {auth, provider} from "../../../firebase.jsx";
import {signInWithPopup, GoogleAuthProvider, getAuth, onAuthStateChanged} from "firebase/auth";
import {useNavigate} from 'react-router-dom';

export default function Route(){
    const navigate = useNavigate();
    
    //declaramos vairables para datos de usuario
    const [nombre, setNombre] = useState('');
    const [foto, setFoto] = useState("");
    const [estatus, setEstatus] = useState('Account not signed');
    const [token, setToken] = useState("");
    const [segundos, setSegundos] = useState(null);
    
    //asignamos una variable con el método para el popup de Google
    const handleClick =()=>{
        signInWithPopup(auth, provider).then((data)=>{
            const credential = GoogleAuthProvider.credentialFromResult(data);
            setToken(credential.accessToken); //guardamos los datos obtenidos
            setNombre(data.displayName);
        }).catch((error)=>{
            setEstatus("Unable to sign in. Log in again with an authorized account.");
            throw error;
        }).then(()=>{
            //si todo sale bien, redirigimos a la página anterior en 5 segundos
            setSegundos(5);
            document.getElementById("login").style.display = "none";
            setEstatus("Account signed in. Redirecting in ");
            setTimeout(() => {
                navigate(-1);
            }, 5000);
        })
    }

    useEffect(() => {
        if(segundos===0){
           setSegundos(null);
        }
    
        // exit early when we reach 0
        if (!segundos) return;
    
        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {
            setSegundos(segundos - 1);
        }, 1000);
    
        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
      }, [segundos]);

    //método para recuperar datos del usuario con sesión iniciada
    //NOTA: probablemente hay otro método que no implique un useEffect,
    //PERO NO ESTOY MUY SEGURO, Y NO SÉ SI SEA NECESARIO.
    const sesion = getAuth();
    //sin el useEffect, se cicla y se va a la porquería jkaskj
    useEffect(() => {
        onAuthStateChanged(sesion, (usuario) => {
        if (usuario) {
            setNombre(usuario.displayName);
            setFoto(usuario.photoURL);
            // setToken(usuario.accessToken);
            
            setEstatus("Account signed in as:");
        }
        })
    }, []) 
    
return (
    <div>
            <h1 className='titulos'>
                Login
            </h1>
            
            {/* un h2 para decir que la cuenta está iniciada */}
            <h2>{estatus}{segundos}</h2>

            <div className='texto' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem', padding: '0', textAlign: 'start'}}>
                <div className="g-signin2" data-onsuccess="onSignIn"></div>
                {nombre ?
                    <>
                        <img src={foto} alt={nombre}/>{nombre}
                    </>
                :
                    <button id="login" onClick={handleClick}>Google Sign-In</button>
                }
            </div>
    </div>
)
}