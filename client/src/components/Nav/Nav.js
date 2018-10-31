import React from "react";
import "./Nav.css";

const Nav = props => (
    <nav className="navbar" id="fixed-top">
    	<div className="container">
      <a className="navbar-brand" href="/"><h3>Real CRM</h3></a>

      <div className="navbar-menu" id="navbarNavDropdown">
    	<ul className="navbar-nav-ml-auto">
		      <li className="nav-item active">
		        <a className="nav-link" href="/">Home <span className="sr-only"></span></a>
		      </li>
		      <li className="nav-item">
		        <a className="nav-link" href="/agents">Agents </a>
		      </li>
		      <li className="nav-item">
		        <a className="nav-link" href="#">Listing </a>
		      </li>
		      
    	</ul>
  	  </div>
  	  </div>
    </nav>
);

export default Nav;

