import React from 'react';
import Application from './services/application';
import Complaint from './services/complaint';
import Meeting from './services/meeting';
import Maintenance from './services/maintenance';
import Neighbourhood from './services/neighbourhood';


const Service = (props) => {
const { serviceTitle } = props.match.params;
const { user } = props;

if (serviceTitle === 'application-request')
     return <Application user={user}/>

else if (serviceTitle === 'complaints')
     return <Complaint user={user}/>

else if (serviceTitle === 'meeting')
     return <Meeting user={user}/>

else if (serviceTitle === 'maintenance-information')
     return <Maintenance user={user}/>

else if (serviceTitle === 'neighbourhood-services')
     return <Neighbourhood user={user}/>

}

export default Service;