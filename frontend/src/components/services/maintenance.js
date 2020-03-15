import React, { useState, useEffect } from 'react';
import Form from '../common/form';
import { toast } from 'react-toastify';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import dataService from '../../services/dataServices';
import Button from '@material-ui/core/Button';
import UiCard from '../common/uiCard';

const Maintenance = (props) => {
const { user } = props;   
const fields = [
        { name: 'maintenanceType', label: 'Maintenance Type ', type: 'text', placeholder: 'Water supply, security, electricity etc'},
        { name: 'status', label: 'Status', type: 'text', placeholder: 'Active or Inactive'},
        { name: 'costPerMonth', label: 'Cost per month', type: 'text'}

    ];
    const [ services, setServices ] = useState([]);
    const button = { type: 'submit', label: 'Submit', color: '#bf2604' };

    const postSubmitLogic = async (submittedFormData) => { 
        
        try {
           
            await dataService.postData('maintenance', submittedFormData);
             toast.success('Service successfully added');
        }
        catch (e) {
            console.log(e.message);
            toast.error('Something went wrong');
        }
    }

     useEffect(()=>{
         async function fetchService(resource){
             try{
                  const { data } = await dataService.getData(resource);
                  setServices(data);
             }
             catch(e){
                 toast.error('Something went wrong');
             }
         }
         fetchService('maintenance');
     }, [])
    return(
       <Container>
          <Grid container spacing={2}>
              {user.isCommitteeMember && 
              <>
                <Grid item xs={12} sm={12} lg={12}>
           
            <Form
                postSubmitLogic={postSubmitLogic}
                heading='Add a service'
                fields={fields}
                button={button} />
                </Grid>
              </>
              }
        </Grid>
              
       
        {services.length &&
        <>
                    <Grid container spacing={2}>
                
                    {
                        
                        services.map(service => (
                  
                        
                           
                            <Grid item lg={6}>
                               
                                
                                <UiCard
                                    data={service}
                                    property='maintenanceType'
                                    content={service['costPerMonth']}
                                    sideContent={service.status}
                                />
                                    
                            </Grid>
                            
                                   
    

                                
                    
                        ))
                    
                    }
                    
                </Grid>
                </>
        }
                 </Container>  
                                
                                  
                              
                   
                       
                    

                  
    )

}

export default Maintenance;