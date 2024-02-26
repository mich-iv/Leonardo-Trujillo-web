import React from 'react'
import { Link } from "react-router-dom";
import { Outlet } from 'react-router-dom';
// import '../Components/Menu.css'

export default function Menu() {
  return (
    <div className="menu">
      <Link to={'/'}>Home</Link> 
      <br/>
      <Link to={'/awards'}>Awards</Link>
      <br/>
      <Link to="/bookChapters">Book Chapters</Link>
      <br/>
      <Link to="/journalPublications">Journal Publications</Link>
      <br/>
      <Link to="/conferencePapers">Select Conference Papers</Link>
      <br/>
      <Link to="/projects">Projects</Link>
      <Outlet/>

      {/* <a className="active" href="#home">Home</a>
      <a href="#news">Awards</a>
      <a href="#contact">Book Chapters</a>
      <a href="#about">Journal Publications</a>
      <a href="#about">Select Conference Papers</a>
      <a href="#about">Projects</a> */}

      {/* <div className="dropdown">
        <button className="dropbtn">Projects
          <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div>
      </div> */}

    </div>
  )
}