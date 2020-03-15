import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import dataService from '../services/dataServices';
import Button from '@material-ui/core/Button';
import UiCard from './common/uiCard';

const ShowMembers = (props) => {

    const [ members, setMembers ] = useState([]);
 
     useEffect(()=>{
         async function fetch(resource){
             try{
                  const { data } = await dataService.getData(resource);
                  setMembers(data);
             }
             catch(e){
                 toast.error('Something went wrong');
             }
         }
         fetch('users');
     }, [])
    return(
       <Container>
          <Grid container spacing={2}>
       
                    <Grid container spacing={2}>
                
                    {
                        
                        members.map(member => (
                  
                        
                           
                            <Grid item lg={6}>
                               
                                
                                <UiCard
                                    data={member}
                                    property='memberType'
                                    content={member['fullName']}
                                    
                                />
                                    
                            </Grid>
                            
                                   
    

                                
                    
                        ))
                    
                    }
                    
                </Grid>
            </Grid>
         </Container>  
                                
                                  
                              
                   
                       
                    

                  
    )

}

export default ShowMembers;