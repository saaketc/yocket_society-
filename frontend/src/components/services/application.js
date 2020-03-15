import React, { useState } from 'react';
import Form from '../common/form';
import { toast } from 'react-toastify';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import dataService from '../../services/dataServices';
import Button from '@material-ui/core/Button';
import UiCard from '../common/uiCard';

const Application = (props) => {
const color = 'bf2604';
const { user } = props;   
const fields = [
      
        { name: 'subject', label: 'Subject', type: 'text', },
        { name: 'content', label: 'Content', type: 'text', multiline: true, rows:'10'},

    ];
const [ applications, setApplications ] = useState([]);
const [ committee, setCommittee ] = useState(false);

    const button = { type: 'submit', label: 'Submit', color: '#bf2604' };

     const postSubmitLogic = async (submittedFormData) => { 
        
        try {
           
            await dataService.postData('application', submittedFormData);
             toast.success('Application successfully submitted');
        }
        catch (e) {
            console.log(e.message);
            toast.error('Something went wrong');
        }
    }

    // To see all application and reviewing
    const handleApplication = async (tag) => {
        
        if (tag === 'my'){
            const { data } = await dataService.getData('application/currentUser');
            setApplications(data);
             setCommittee(false);
        }
        else if (tag === 'review'){
            const { data } = await dataService.getData('application');
            setApplications(data);
            setCommittee(true);
        }
    }
// To handle application approve or reject
const applicationHandler = async (application, action) => {
   const params = {
       applicationId: application._id,
       action:action
   }
   try {
           await dataService.getData('application/handle', params);
           toast.success('Application reviewed')
   }
   catch(e){
       toast.error('Something went wrong')
   }
}
    return(
        <Container>
          <Grid container spacing={2}>
               <Grid item xs={6} sm={6} lg={3}>
                  <Button
                    fullWidth
                        variant="contained"
                        style={{ color: 'bf2604', backgroundColor:color }}
                        
                   onClick={()=> handleApplication('my')}>
                   My applications
                      </Button>
                   </Grid>
                   {user.isCommitteeMember && 
                   <>
                    <Grid item xs={6} sm={6} lg={3}>
                  <Button
                    fullWidth
                        variant="contained"
                        style={{ color: 'bf2604', backgroundColor:color }}
                        
                   onClick={()=> handleApplication('review')}>
                   Review applications
                      </Button>
                   </Grid>
                   </>
                   }
             <Grid item xs={12} sm={12} lg={12}>
            <Form
                postSubmitLogic={postSubmitLogic}
                heading='Application'
                fields={fields}
                button={button} />
                </Grid>
              
        </Grid>
                    <Grid container spacing={2}>
                
                    {
                        
                        applications.map(application => (
                  
                        
                           
                            <Grid item lg={6}>
                                {
                                    committee ?
                                
                                  <UiCard
                                    button={true} 
                                    data={application}
                                    property='subject'
                                    content={application.content}
                                    sideContent={application.status}
                                    buttonLabel1='Approve'
                                    buttonLabel2='Reject'
                                    handleClick={applicationHandler}

                                />
                                :
                                <UiCard
                                    data={application}
                                    property='subject'
                                    content={application.content}
                                    sideContent={application.status}
                                    handleClick={applicationHandler}
                                   
                                />
    

                                
                                }
                                  
                              
                            </Grid>
                   
                       
                    

                    
                        ))
                    
                    }
                    
                </Grid>
                 </Container>  
                  
    )

}

export default Application;
