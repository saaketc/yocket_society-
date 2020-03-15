import React, { useState } from 'react';
import Form from '../common/form';
import { toast } from 'react-toastify';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import dataService from '../../services/dataServices';
import Button from '@material-ui/core/Button';
import UiCard from '../common/uiCard';

const Complaint = (props) => {
const color = 'bf2604';
const { user } = props;   
const fields = [
        { name: 'subject', label: 'Subject', type: 'text'},
        { name: 'complaint', label: 'Complaint', type: 'text', multiline: true, rows:'5'}

    ];
const [ complaints, setcomplaints ] = useState([]);
const [ committee, setCommittee ] = useState(false);

    const button = { type: 'submit', label: 'Submit', color: '#bf2604' };

     const postSubmitLogic = async (submittedFormData) => { 
        
        try {
           
            await dataService.postData('complaint', submittedFormData);
             toast.success('Complaint successfully submitted');
        }
        catch (e) {
            console.log(e.message);
            toast.error('Something went wrong');
        }
    }

    // To see all complaint and reviewing
    const handleComplaint = async (tag) => {
        
        if (tag === 'my'){
            const { data } = await dataService.getData('complaint/currentUser');
            setcomplaints(data);
             setCommittee(false);
        }
        else if (tag === 'review'){
            const { data } = await dataService.getData('complaint');
            setcomplaints(data);
            setCommittee(true);
        }
    }
// To handle complaint in process or resolved
const complaintHandler = async (complaint, action) => {
   const params = {
       complaintId: complaint._id,
       action:action
   }
   try {
           await dataService.getData('complaint/handle', params);
           toast.success('Complaint reviewed')
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
                        
                   onClick={()=> handleComplaint('my')}>
                   My complaints
                      </Button>
                   </Grid>
                   {user.isCommitteeMember && 
                   <>
                    <Grid item xs={6} sm={6} lg={3}>
                  <Button
                    fullWidth
                        variant="contained"
                        style={{ color: 'bf2604', backgroundColor:color }}
                        
                   onClick={()=> handleComplaint('review')}>
                   Review complaints
                      </Button>
                   </Grid>
                   </>
                   }
             <Grid item xs={12} sm={12} lg={12}>
            <Form
                postSubmitLogic={postSubmitLogic}
                heading='File a Complaint'
                fields={fields}
                button={button} />
                </Grid>
              
        </Grid>
                    <Grid container spacing={2}>
                
                    {
                        
                        complaints.map(complaint => (
                  
                        
                           
                            <Grid item lg={6}>
                                {
                                    committee ?
                                
                                  <UiCard
                                    button={true} 
                                    data={complaint}
                                    property='subject'
                                    content={complaint['complaint']}
                                    sideContent1={complaint.response}
                                    sideContent={complaint.status}
                                    buttonLabel1='Resolved'
                                    buttonLabel2='In progress'
                                    handleClick={complaintHandler}

                                />
                                :
                                <UiCard
                                    data={complaint}
                                    property='subject'
                                    content={complaint['complaint']}
                                    sideContent1={complaint.response}
                                    sideContent={complaint.status}
                                    handleClick={complaintHandler}
                                   
                                />
    

                                
                                }
                                  
                              
                            </Grid>
                   
                       
                    

                    
                        ))
                    
                    }
                    
                </Grid>
                 </Container>  
                  
    )

}

export default Complaint;
