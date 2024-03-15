import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createHashRouter, RouterProvider, useLocation} from 'react-router-dom'

import Home from './routes/home.jsx'
import Awards from './routes/awards.jsx'
import BookChapters from './routes/bookChapters.jsx'
import JournalPublications from './routes/journalPublications.jsx'
import ConferencePapers from './routes/conferencePapers.jsx'
import Projects from './routes/projects.jsx'
import Menu from './routes/Menu.jsx'
import Login from './routes/usuario/login.jsx'
import Agregar from './routes/agregar.jsx'

const router = createHashRouter([
  {
    path:'/',
    element: <Menu/>,
    children: [
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
        path:'/login',
        element: <Login/>
      },
      {
        path:'/agregar/:ubicacion',
        element: <Agregar/>
      },
      {
        path:'/eliminar',
        element: <Login/>
      },
      {
        path:'/editar',
        element: <Login/>
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
