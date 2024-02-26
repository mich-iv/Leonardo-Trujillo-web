import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import Menu from './Components/Menu.jsx'
import {createHashRouter, RouterProvider} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

import Home from './routes/home.jsx'
import Awards from './routes/awards.jsx'
import BookChapters from './routes/bookChapters.jsx'
import JournalPublications from './routes/journalPublications.jsx'
import ConferencePapers from './routes/conferencePapers.jsx'
import Projects from './routes/projects.jsx'
import Menu from './routes/Menu.jsx'

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
    ],
  },
  // {
  //   path:'/awards',
  //   element: <Awards/>
  // },
  // {
  //   path:'/bookChapters',
  //   element: <BookChapters/>
  // },
  // {
  //   path:'/journalPublications',
  //   element: <JournalPublications/>
  // },
  // {
  //   path:'/conferencePapers',
  //   element: <ConferencePapers/>
  // },
  // {
  //   path:'/projects',
  //   element: <Projects/>
  // },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
