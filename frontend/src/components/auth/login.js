import React from 'react'
import { useHistory } from 'react-router-dom';
import dataService from '../../services/dataServices';
import service from '../../services/userServices';
import Form from '../common/form';
import { toast } from 'react-toastify';

const Login = () => {
    const history = useHistory();
    const fields = [
      
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'password', label: 'Password', type: 'password' },

    ];
    const button = { type: 'submit', label: 'Login', color: '#bf2604' };

     const postSubmitLogic = async (submittedFormData) => { 
        
        try {
            // console.log(submittedFormData);
            const { data: token } = await service.loginUser(submittedFormData);
            
            localStorage.setItem(service.tokenKey, token);
            window.location = '/';
            
        }
        catch (e) {
            console.log(e.message);
            toast.error('Something went wrong');
        }
    }
    return (
        <>
            <Form
                postSubmitLogic={postSubmitLogic}
                heading='Login'
                fields={fields}
                button={button} />
        </>
    )
}

export default Login;
