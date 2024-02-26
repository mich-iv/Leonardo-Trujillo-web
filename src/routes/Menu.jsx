import React from 'react'
import { Link } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import '../estilos/Menu.css'

export default function Menu() {
  return (
    <div>
      <div className="menu">
        <Link to={'/'}>Home</Link> 
        <Link to={'/awards'}>Awards</Link>
        <Link to="/bookChapters">Book Chapters</Link>
        <Link to="/journalPublications">Journal Publications</Link>
        <Link to="/conferencePapers">Select Conference Papers</Link>
        <Link to="/projects">Projects</Link>
      </div>
      <Outlet/>
    </div>
  )
}