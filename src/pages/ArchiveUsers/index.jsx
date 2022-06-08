import React, { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';
import { Grid, CssBaseline, Container,Paper } from '@mui/material';

import Title from './title';
import MobileTable from '../../components/Table_user/mobile_table';
import TableArchive from '../../components/Table_disabled';

import UserArchive from '../../components/Table_archive/archive_user';





const Archives = () => {
   const matches = useMediaQuery('(min-width:900px)');

   const bearer_token= localStorage.getItem('tokenDjango'); 
   const [userDisabled, setUserDisabled] = React.useState('')
   const [userEnable, setUserEnable] = useState('');


  React.useEffect(()=>{
    getUsers();
  },[bearer_token])


  const getUsers=()=>{
      
  
    return fetch("http://localhost:8000/api/user", {

        method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${bearer_token}`
            }
          
        }).then((res) => res.json())
          .then((res) => {
                if(res){
                  setUserDisabled(res.filter(x=> !x.is_active && !x.is_archive)) 
                  setUserEnable(res.filter(x=> x.is_active && !x.is_archive))  
                }
          })
          .catch((error) => {
              console.log(error)
          });
  }

  
  

  
  return(

    <>
      <CssBaseline />
      <Container >
      {/* <Typography variant='h3'>Utilisateur</Typography> */}
     
         {matches ?(
         <> 
         <Title />
         <Paper elevation={1} >  
            <UserArchive userget={userEnable}/>  
         </Paper> 
         </>  
         ):(
            <UserArchive userget={userEnable}/>  
         )}
         
    </Container>
    </>
  )
}

export default Archives
