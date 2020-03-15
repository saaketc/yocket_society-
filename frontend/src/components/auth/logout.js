import React, { useEffect } from 'react';

import userService from '../../services/userServices';

const Logout = () => {

    useEffect(() => {
        userService.logout();
        window.location = '/';
    }, []);

    return null;
    
}
export default Logout