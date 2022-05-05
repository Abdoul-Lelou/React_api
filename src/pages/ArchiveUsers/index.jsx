import React, { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CollapsibleTable from '../../components/Table_user';
import { Grid, CssBaseline, Typography, Container, ListItemAvatar, Avatar, IconButton, styled } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { ThemeProvider } from '@emotion/react';
import { createTheme, height, width } from '@mui/system';
import { Paper } from '@mui/material';

import InfiniteScroll from 'react-infinite-scroller';
import Title from './title';
import MobileTable from '../../components/Table_user/mobile_table';
import ResponsiveDialog from '../../components/dialog';
import TableUser from '../../components/Table_user';
import TableArchive from '../../components/Table_disabled';
import DetailPanelCour from '../../components/dialog/detailPanel'

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
      <Container fixed>
      {/* <Typography variant='h3'>Utilisateur</Typography> */}
     
         {matches ?(
         <> 
         <Title />
         <Paper elevation={3} >  
            <UserArchive userget={userEnable}/>  
         </Paper> 
         </>  
         ):(
         <Paper elevation={0} style={{ height:'20%', width:'initial'}}> 
          <Grid  container 
           style={{ height:'20%', width:'initial'}} direction="column" maxWidth='xl'
          >            
             <Grid item>
                  <MobileTable user={userEnable}/>  
             </Grid>

             <Divider />

             <Grid item  sx={{marginTop:2, width:'100%'}}>
                  <TableArchive disabledUser={userDisabled}/>
             </Grid>
           </Grid> 
           

         </Paper>  
         )}
         
    </Container>
    </>
  )
}

export default Archives
