import '../CSS/Navbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Logout from '../Auth/Logout';

const Navigation = ({loggedInUser}) => {
    

    const authControl = (loggedIn) => {

        if(!loggedIn){
            return(
                <Nav className='auth-links'>
                    <span>Not logged in</span>
                    <Nav.Link as={Link} to='/register' eventKey='2'>Register</Nav.Link>
                    <Nav.Link as={Link} to='/login' eventKey='2'>Login</Nav.Link>
                </Nav>
            )
        } else {
            return(
                <Nav className='auth-links'>
                    <span className='user-tag'>Logged in as: {loggedIn}</span>
                    <Logout className={'main-button logoutButton'}/>
                </Nav>
            )
        }
    }

    
    return(
        <Navbar expand='lg' id='navbar' bg='transparent' variant='dark' collapseOnSelect>
            <Container>
                <Navbar.Brand href='/'>Movie Reviewer</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to='/' eventKey='1'>Sort by latest releases</Nav.Link>
                    <Nav.Link as={Link} to='/popular' eventKey='2'>Sort by popularity</Nav.Link>
                </Nav>
                {authControl(loggedInUser)}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;