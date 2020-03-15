import React, { useState, useEffect } from 'react';
import Form from '../common/form';
import { toast } from 'react-toastify';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import dataService from '../../services/dataServices';
import Button from '@material-ui/core/Button';
import UiCard from '../common/uiCard';

const Neighbourhood = (props) => {
const { user } = props;   
const fields = [
        { name: 'serviceType', label: 'Type of service ', type: 'text', placeholder: 'Grocery, gardener, electrician etc'},
        { name: 'serviceName', label: 'Name of service', type: 'text', placeholder: 'Shop or contact person name'},
        { name: 'contact', label: 'Contact of service', type: 'text', placeholder: 'Contact number'}

    ];
    const [ services, setServices ] = useState([]);
    const button = { type: 'submit', label: 'Submit', color: '#bf2604' };

    const postSubmitLogic = async (submittedFormData) => { 
        
        try {
           
            await dataService.postData('neighbourhood', submittedFormData);
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
         fetchService('neighbourhood');
     }, [])
    return(
       <Container>
          <Grid container spacing={2}>
         <Grid item xs={12} sm={12} lg={12}>
            <Form
                postSubmitLogic={postSubmitLogic}
                heading='Add a service'
                fields={fields}
                button={button} />
                </Grid>
              
        </Grid>
        {services.length &&
        <>
                    <Grid container spacing={2}>
                
                    {
                        
                        services.map(service => (
                  
                        
                           
                            <Grid item lg={6}>
                               
                                
                                <UiCard
                                    data={service}
                                    property='serviceType'
                                    content={service['serviceName']}
                                    sideContent={service.contact}
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

export default Neighbourhood;