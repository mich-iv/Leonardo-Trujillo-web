import React from 'react'
import {createHashRouter} from 'react-router-dom'

import Home from './secciones/home.jsx'
import Awards from './secciones/awards.jsx'
import BookChapters from './secciones/bookChapters.jsx'
import JournalPublications from './secciones/journalPublications.jsx'
import ConferencePapers from './secciones/conferencePapers.jsx'
import Projects from './secciones/projects.jsx'
import Books from './secciones/books.jsx'
import Students from './secciones/students.jsx'
import Code from './secciones/code.jsx'
import Login from './usuario/login.jsx'
import Agregar from './usuario/agregar.jsx'
import App from '../App.jsx'
import Error from './secciones/error.jsx'

export default function Rutas(){
    const router = createHashRouter([
    {
        path:'/',
        element: <App style={"secciones"}/>,
        errorElement: <Error style={"secciones"}/>,
        children: [
        {
            path:'/',
            element: <Home/>
        },
        {
            path:'/awards',
            element: <Awards/>
        },
        {
            path:'/bookChapters',
            element: <BookChapters/>
        },
        {
            path:'/journalPublications',
            element: <JournalPublications/>
        },
        {
            path:'/conferencePapers',
            element: <ConferencePapers/>
        },
        {
            path:'/projects',
            element: <Projects/>
        },
        {
            path:'/books',
            element: <Books/>
        },
        {
            path:'/students',
            element: <Students/>
        },
        {
            path:'/code',
            element: <Code/>
        },
        {
            path:'/login',
            element: <Login/>
        },
        {
            path:'/agregar/:ubicacion',
            element: <Agregar/>
        },
        ],
    },
    ])

    return router;
}