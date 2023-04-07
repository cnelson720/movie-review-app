import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';

const Logout = ({className}) => {
    const nav = useNavigate();
    
    const logout = () => {
        localStorage.removeItem('user')
        nav('/');
        window.location.reload();
    }
    return(
        <Button className={className} onClick={logout}>Logout</Button>
    )
}

export default Logout;