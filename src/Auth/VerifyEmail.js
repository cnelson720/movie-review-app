import { useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert2';

const VerifyEmail = () =>{
    const location = useLocation();
    const nav = useNavigate();

    useEffect(()=>{
        const token = new URLSearchParams(location.search).get('token');

        axios.get(`/verify-email?token=${token}`)
            .then((res)=>{
                console.log(res);
                swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.data.message,
                    showConfirmButton: false,
                    timer: 2500
                }).then(nav('/login'));
            })
            .catch((err)=>{
                console.log(err);
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.response.data.message,
                    confirmButtonColor: '#106dfd'
                }).then(nav('/'))
            });
    },[location]);


    return (
        <div>
            Verifying email..
        </div>
    )
}

export default VerifyEmail;