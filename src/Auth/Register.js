import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import swal from 'sweetalert2';
import validateUser from './validateUser';
import axios from 'axios';

import '../CSS/Register.css';

const Register = () => {

    const [user, setUser] = useState({
        email: '',
        confirm_email: '',
        username: '',
        confirm_username: '',
        password: '',
        confirm_password: ''
    });

    const onChange = (e) => {setUser({...user, [e.target.name]: e.target.value})};

    const nav = useNavigate();

    const submit = (e) => {
        e.preventDefault();

        if(localStorage.getItem('user')){
            swal.fire({
                title: 'Already logged in!',
                icon: 'error',
                showConfirmButton: false,
                timer: 2000
            })
        }

        const {email, confirm_email, username, confirm_username, password, confirm_password} = user

        if (email && confirm_email && username && confirm_username && password && confirm_password){

            var validation = validateUser(user);

            if (validation !== true){
                return swal.fire({
                    title: 'Error',
                    text: validation.error,
                    icon: 'error',
                    confirmButtonText: 'Try again'
                });
            } else {
                // user info is valid, attempt post to server
                axios.post('/register', user)
                    .then((res)=>{
                        swal.fire({
                            title: res.data.message,
                            text: 'Please check your email to verify your account before logging in',
                            icon: 'success',
                            confirmButtonColor: '#59D9B5'
                        }).then(()=>{nav('/')})
                    })
                    .catch((err)=>{
                        swal.fire({
                            title: 'Error',
                            text: err.response.data.message,
                            timer: 2000,
                            showConfirmButton: false
                        })
                    })
                
            }
        }

    }

    return(
        <div className='register-container'>
            <h1>Create a new account</h1>

            <Form className='reg-form' onSubmit={submit} style={{color: 'white'}}>
                <Form.Group className='mb-3' controlId='registerUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='username' placeholder='Enter a username' name='username' onChange={onChange} maxLength={15} required/>
                </Form.Group>

                <Form.Group className='mb-3' controlId='confirmRegisterUsername'>
                    <Form.Label>Comfirm username</Form.Label>
                    <Form.Control type='username' placeholder='Confirm username' name='confirm_username' onChange={onChange} maxLength={15} required/>
                </Form.Group>

                <Form.Group className='mb-3' controlId='registerEmail'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' name='email' onChange={onChange} required/>
                </Form.Group>

                <Form.Group className='mb-3' controlId='confirmRegisterEmail'>
                    <Form.Label>Confirm Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Confirm email' name='confirm_email' onChange={onChange} required/>
                </Form.Group>

                <Form.Group className='mb-3' controlId='registerPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Password' name='password' onChange={onChange} required/>
                </Form.Group>

                <Form.Group className='mb-3' controlId='confirmRegisterPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm Password' name='confirm_password' onChange={onChange} required/>
                </Form.Group>

                <div className='reg-buttons'>
                    <Button className='main-button' type='submit'>Create account</Button>
                    <Form.Text className='button-text'>Already have an account?</Form.Text>
                    <Button className='main-button'>Login</Button>
                </div>
            </Form>
        </div>
    )
}

export default Register;