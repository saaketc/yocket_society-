import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

import UiCard from './common/uiCard';

import dataServices from '../services/dataServices';
import { slug } from '../utils/slug';
import { Link, withRouter } from 'react-router-dom';
import  service_img from '../illustrations/service.svg';
import  Typography  from '@material-ui/core/Typography';
import  Grid  from '@material-ui/core/Grid';
import  Container  from '@material-ui/core/Container';
// import  Loader  from 'react-loading';

const Dashboard = (props) => {
  
    const { user, history } = props;
    // const [services, setService] = useState([]);
    const services = [
        {title: 'Application request', description:'Submit application to make any request or to access any service of the society.'},
        {title: 'Complaints', description:'To file any complaint related to society.'},
        {title: 'Meeting', description:'Schedule and attend society meetings with track of all meetings.'},
        {title: 'Maintenance information', description:'Know all the maintenance related information here.'},
        {title: 'Neighbourhood services', description:'Get information about all the neighbourhood services.'},
    ]

    const handleClick = (service) => {
        return history.push(`/${slug(service.title)}`, service);
        
    }
   
   
    return (
    <Container>
         
            <br />
            <br />
            <Typography gutterBottom variant="h2">
               Your Society management system
                </Typography>
            <br />
           
                
                <Grid container spacing={6}>
                    {
                        services.map(service => (
                  
                        
                           
                            <Grid item lg={4}>
                                <UiCard
                                    image={service_img}
                                    data={service}
                                    property='title'
                                    content={service.description}
                                    mediaHeight={true}
                                    onClick={handleClick}
                                    buttonLabel1='Go'
                                />
                            </Grid>
                   
                       
                    

                    
                        ))
            
                    }
                </Grid>
            
   </Container>
  )
}

export default withRouter(Dashboard)
