import React,{useState ,useEffect} from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

function EcartNavbar() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      try{
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role);
      setIsAuthenticated(true);
      }catch(error){
        console.error('Invalid Token');
        setIsAuthenticated(false)
      }
    }
  },[navigate]);
      
     
  

  const handleLogout =()=>{
    localStorage.removeItem('token');
    setUserRole(null);
    setIsAuthenticated(false);
    navigate("/")
  };

  return (
    <Navbar collapseOnSelect expand="md" bg='dark' data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">E-Cart</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {userRole==='admin'&&(<>
              <Nav.Link href="/admin/user">user Controller</Nav.Link>
            <Nav.Link href="/admin/product">product controller</Nav.Link>
            </>
          )}
            
            <NavDropdown title="Electronics" id="collapsible-nav-dropdown"  >
              <NavDropdown.Item href="/laptop">Laptop</NavDropdown.Item>
              <NavDropdown.Item href="/mobile">
                Mobile
              </NavDropdown.Item>
              <NavDropdown.Item href="/desktop">Desktop</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/tablet">
                Tablet
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Cloths" id="collapsible-nav-dropdown"  >
              <NavDropdown.Item href="/kids">Kids</NavDropdown.Item>
              <NavDropdown.Item href="/men">
                Men
              </NavDropdown.Item>
              <NavDropdown.Item href="/women">Women</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Fashion Sale
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className='d-flex gap-3'>
            {isAuthenticated?(
              <Button   variant='light' onClick={handleLogout}>
              Logout
          </Button>
          ):(
              <>
              <Button href='/signIn' variant='light'>
                  Login
              </Button>
              <Button href='/signup' variant='light'>
              Signup
          </Button>
              </>
            )

            }
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default EcartNavbar;