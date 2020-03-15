import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Route, Switch } from 'react-router-dom';
import Feed from './components/feed';
import ShowMembers from './components/showMembers';
import Service from './components/service';
import Welcome from './components/welcome';
import Navbar from './components/common/navbar';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import Logout from './components/auth/logout';

// import dataServices from './services/dataServices';
import userService from './services/userServices';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {


    setUser(userService.getCurrentUser())

  }, [])
  return (
    <>
      <Navbar
        user={user}
      />
      <br />
      <br />
      <ToastContainer />
      <Switch>

       
        <Route path='/auth/signup/join' component={Signup} />
        <Route path='/auth/signup' component={Signup} />
        <Route path='/auth/login' component={Login} />
         <Route path='/user/logout' component={Logout} />
        <Route path='/members/committee-members' component={ShowMembers} />

        <Route  path='/:serviceTitle' render={(props) => <Service {...props} user={user} />} />
       
        <Route exact path='/' render={(props) => user ? <Feed {...props} user={user} /> : <Welcome/>} />
        
      </Switch>
    </>
  );
}

export default App;
