import React from 'react'
import { useHistory } from 'react-router-dom';

import dataService from '../../services/dataServices';
import service from '../../services/userServices';
import Form from '../common/form';
import { toast } from 'react-toastify';

const Signup1 = () => {
    const history = useHistory();
    const fields = [
      
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'password', label: 'Password', type: 'password' },

    ];
    const button = { type: 'submit', label: 'Continue', color: '#bf2604' };

    const postSubmitLogic = (submittedFormData) => {
        // api call or something
        // eg
        // console.log(submittedFormData);
        history.push('/auth/signup/join', submittedFormData);
    }
    return (
        <>
            <Form
                postSubmitLogic={postSubmitLogic}
                heading='Join now to stay connected with your society in a better way'
                fields={fields}
                button={button} />
        </>
    )
}
// after first signup

const Signup2 = (props) => {
    const history = useHistory();
    const data = history.location.state;
    const fields = [
        { name: 'fullName', label: 'Full Name', type: 'text' },
        { name: 'society', label: 'Society', type: 'text' },
        { name: 'houseNo', label: 'House No', type: 'number' },
        { name: 'ownershipType', label: 'Ownership Type', type: 'text', placeholder: 'Type owned or rented' },
        { name: 'memberType', label: 'Your management role', type: 'text', placeholder: 'Type President, Secretary, Treasurer, or None' },
       

    ];
    // const dropDown = {
    //     name: 'gender', label: 'Gender', options: ['Male', 'Female']
    // };
    const button = { type: 'submit', label: 'Join', color: '#bf2604' };

    const postSubmitLogic = async (submittedFormData) => {
        // api call or something
       
        let user = { ...submittedFormData, ...data };
        // console.log(user);
        try {
            const response = await service.registerUser(user);
           
            localStorage.setItem(service.tokenKey, response.headers['x-auth-token']);
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
                heading='Join now to stay connected with your society in a better way'
                fields={fields}

                button={button} />
        </>
    )
}

const Signup = (props) => {
    const path = props.location.pathname;
    if (path === '/auth/signup/join')
        return <Signup2 />;
    else if (path === '/auth/signup')
        return <Signup1 />;
}
export default Signup;
