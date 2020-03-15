import React, { useState, useEffect } from 'react';
import Form from '../common/form';
import { toast } from 'react-toastify';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import dataService from '../../services/dataServices';
import Button from '@material-ui/core/Button';
import UiCard from '../common/uiCard';

const Meeting = (props) => {
const color = 'bf2604';
const { user } = props;   
const fields = [
        { name: 'agenda', label: 'Agenda', type: 'text'},
        { name: 'dateOfMeeting', label: 'Date of meeting', type: 'date'},
        { name: 'time', label: 'time', type: 'time'},
        { name: 'venue', label: 'venue', type: 'text'},
        { name: 'participatingMembers', label: 'Meeting for ', type: 'text', placeholder: 'Type everyone or committee'}
       

    ];
const [ meetings, setMeetings ] = useState([]);

   useEffect(()=>{
         async function fetchService(resource){
             try{
                  const { data } = await dataService.getData(resource);
                  setMeetings(data);
             }
             catch(e){
                 toast.error('Something went wrong');
             }
         }
         fetchService('meeting');
     }, [])

    const button = { type: 'submit', label: 'Schedule meeting', color: '#bf2604' };

     const postSubmitLogic = async (submittedFormData) => { 
        
        try {
           
            await dataService.postData('meeting', submittedFormData);
             toast.success('Meeting is successfully scheduled');
        }
        catch (e) {
            console.log(e.message);
            toast.error('Something went wrong');
        }
    }


    return(
        <Container>
          <Grid container spacing={2}>      
             <Grid item xs={12} sm={12} lg={12}>
            <Form
                postSubmitLogic={postSubmitLogic}
                heading='Schedule a meeting'
                fields={fields}
                button={button} />
                </Grid>
              
        </Grid>
                    <Grid container spacing={2}>
                
                    {
                        
                        meetings.map(meeting => (
                  
                        
                           
                            <Grid item lg={6}>
                                {
                                    user.isCommitteeMember ?
                                
                                  <UiCard
                                    button={true} 
                                    data={meeting}
                                    property='agenda'
                                    content={meeting['venue']}
                                    sideContent1={meeting.dateOfMeeting}
                                    sideContent={meeting.time}
                                    buttonLabel1='Add minutes'
                                    buttonLabel2='Add conclusion'
                                    

                                />
                                :
                                <UiCard
                                    data={meeting}
                                    property='agenda'
                                    content={meeting['venue']}
                                    sideContent1={meeting.dateOfMeeting}
                                    sideContent={meeting.time}
                                    
                                   
                                />
    

                                
                                }
                                  
                              
                            </Grid>
                   
                       
                    

                    
                        ))
                    
                    }
                    
                </Grid>
                 </Container>  
                  
    )

}

export default Meeting;
