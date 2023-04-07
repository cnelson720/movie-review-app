import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert2';
import '../CSS/Login.css';

const Login = () => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const onChange = (e) => {setUser({...user, [e.target.name]: e.target.value})};

    const nav = useNavigate();

    const login = (e) => {
        e.preventDefault();

        axios.post('/login', user)
            .then((res)=>{

                localStorage.setItem('user', res.data.username);

                swal.fire({
                    title: 'Success!',
                    text: `Logging in ${res.data.username}`,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                }).then(()=>{
                    nav('/')
                    window.location.reload();
                });
            })
            .catch((error)=>{
                swal.fire({
                    title: 'Error',
                    text: error.response.data.message,
                    confirmButtonColor: '#59D9B5'
                });
            })
    }

    return(
        <div className='login-container'>
            <h1>Log in</h1>
            <Form className='login-form' onSubmit={login} style={{color: 'white'}}>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control name='email' type='email' placeholder='Enter email' onChange={onChange}/>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type='password' placeholder='Password' onChange={onChange}/>
                </Form.Group>

                <div className='login-buttons'>
                    <Button className='main-button' type='submit'>Login</Button>
                    <Form.Text className='button-text'>Don't have an account?</Form.Text>
                    <Link to='/register'><Button className='main-button'>Create an account</Button></Link>
                </div>
            </Form>
        </div>
    )
}

export default Login;