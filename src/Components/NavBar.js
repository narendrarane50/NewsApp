import React from 'react'

import Container from 'react-bootstrap/Container';
import {Link} from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const NavBar = (props) => {
    return (
      <div>
        <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand ><Link to="/" style={{color:'black',textDecoration:'None'}}>NewsMonkey</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link ><Link to="/" style={{color:'black',textDecoration:'None'}}>Home</Link></Nav.Link>
            
            <Nav.Link ><Link to="/business" style={{color:'black',textDecoration:'None'}}>Business</Link></Nav.Link>
            <Nav.Link ><Link to="/entertainment" style={{color:'black',textDecoration:'None'}}>Entertainment</Link></Nav.Link>
            <Nav.Link ><Link to="/general" style={{color:'black',textDecoration:'None'}}>General</Link></Nav.Link>
            <Nav.Link ><Link to="/health" style={{color:'black',textDecoration:'None'}}>Health</Link></Nav.Link>
            <Nav.Link ><Link to="/science" style={{color:'black',textDecoration:'None'}}>Science</Link></Nav.Link>
            <Nav.Link ><Link to="/sports" style={{color:'black',textDecoration:'None'}}>Sports</Link></Nav.Link>
            <Nav.Link ><Link to="/technology" style={{color:'black',textDecoration:'None'}}>Technology</Link></Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </div>
    )
  
}

export default NavBar