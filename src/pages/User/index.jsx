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
import { Grid, CssBaseline, Typography, Container, ListItemAvatar, Avatar, IconButton } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { ThemeProvider } from '@emotion/react';
import { createTheme, height, width } from '@mui/system';
import { Paper } from '@mui/material';

import InfiniteScroll from 'react-infinite-scroller';
import Title from './title';
import MobileTable from '../../components/Table_user/mobile_table';
import ResponsiveDialog from '../../components/dialog';
import TableUser from '../../components/Table_user';
import TableArchive from '../../components/Table_archive_user';
import AddUser from '../../components/dialog/addUser'
import IntegrationNotistack from '../../components/toast/successToast';
import ErrorToast from '../../components/toast/errorToast';





const User = () => {
   const matches = useMediaQuery('(min-width:900px)');

   const bearer_token= localStorage.getItem('tokenDjango'); 
   const [userDisabled, setUserDisabled] = React.useState('')
   const [userEnable, setUserEnable] = useState('');
   const [disabled, setDisabled] = useState(false)
   const [enable, setEnable] = useState(false)


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
          .then((res,index) => {
               //  if(res){
                  setUserDisabled(res.filter(x=> !x.is_active && !x.is_archive)) 
                  setUserEnable(res.filter(x=> x.is_active && !x.is_archive))  
               //  }
          })
          .catch((error) => {
              console.log(error)
          });
  }

 
  const ArchiveUser=()=>{

      return (

         <List  component="div" disablePadding sx={{ width: '100%', bgcolor: 'background.paper',   boxShadow: 2  }}
            id="scrollableDiv"
            style={{
            height: 300,
            overflow: 'auto',
            flexDirection: 'column-reverse',
            }}
         > 

         {
            userDisabled.length ?(
               userDisabled && userDisabled.map((data,index)=>{
                  return (
                   <>
                   <InfiniteScroll
                      pageStart={0}
                      loadMore='loadFunc'
                      hasMore={true || false}
                     //  loader={<div className="loader" key={0}>Loading ...</div>}
                     
                      scrollableTarget="scrollableDiv"
                    >
                     <ListItem alignItems="flex-start" md={4} key={index}>
                     <ListItemAvatar>
                     <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                     </ListItemAvatar>
                     <ListItemText
                     primary={Capitalize(data.first_name+' '+data.last_name)}
                     secondary={
                        <>
                        <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                        >
                              {data.role}
                        </Typography>
                        {" — I'll be in your   errands this…"}
                        </>
                     }
                     />
                     </ListItem>
                     
                    </InfiniteScroll>
                   <Divider variant="inset" component="li" />
       
                   </>
                  )
               })
            ):(
               <Box sx={{m:10}}>
                  <Typography variant='h5'>
                     Aucune donnée
                  </Typography>
               </Box>
            )
         
         }
 
         
      
         </List>
       
      );
  }

  const Capitalize=(str)=>{
   return str.charAt(0).toUpperCase() + str.slice(1);
   }
  
const msgLol='jjjj'
  
  return(

    <>
      <CssBaseline />
      <Container fixed>
      {/* <Typography variant='h3'>Utilisateur</Typography> */}
     
         {matches ?(
         <> 
         <Title />
         <Paper elevation={3} >  
            <Grid  container  maxWidth='xl' 
               style={{  width:'100%', height:'60vh', margin:'0 auto'}} direction="row" rowSpacing={4}
            >            
              <Grid item  xs={8} style={{margin: '0', padding:4, }} >
                 <TableUser userget={userEnable}/>  
              </Grid>
            
              <Grid item sm={4} style={{ padding: 4, margin:'0 auto'}} >
                     <TableArchive disabledUser={userDisabled}/>
              </Grid>
               
               <AddUser/>
               <IntegrationNotistack successMsg={msgLol}/>
               <ErrorToast errorMsg={msgLol}/>
            </Grid> 

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

export default User
