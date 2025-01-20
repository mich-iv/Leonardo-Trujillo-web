import React from 'react'
import ReactDOM from 'react-dom/client'
import {createHashRouter, RouterProvider} from 'react-router-dom'

import Home from './routes/secciones/home.jsx'
import Awards from './routes/secciones/awards.jsx'
import BookChapters from './routes/secciones/bookChapters.jsx'
import JournalPublications from './routes/secciones/journalPublications.jsx'
import ConferencePapers from './routes/secciones/conferencePapers.jsx'
import Projects from './routes/secciones/projects.jsx'
import Books from './routes/secciones/books.jsx'
import Students from './routes/secciones/students.jsx'
import Code from './routes/secciones/code.jsx'
import Login from './routes/usuario/login.jsx'
import Agregar from './routes/usuario/agregar.jsx'
import App from './App.jsx'
import Error from './routes/secciones/error.jsx'

import { HelmetProvider } from 'react-helmet-async';

const router = createHashRouter([
  {
    path:'/',
    element: <App style={"secciones"}/>,
    errorElement: <Error/>,
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

ReactDOM.createRoot(document.getElementById('raiz')).render(
  <HelmetProvider>
    <React.StrictMode>
      <RouterProvider router={router} future={{v7_startTransition: true,v7_relativeSplatPath: true,}}/>
    </React.StrictMode>
  </HelmetProvider>,
)


