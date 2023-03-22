import {Container,Nav,Navbar,NavDropdown} from 'react-bootstrap';
import {useNavigate} from "react-router-dom"

function NavBar() {
const navigate = useNavigate()
    const removetoken=(()=>{
        localStorage.removeItem("admintoken")
        localStorage.removeItem("role")
        navigate("/")

    })
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/home">Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/trainerlist">ADD Trainer</Nav.Link>
            <NavDropdown title="Logout" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={removetoken}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;