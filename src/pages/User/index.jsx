import React, { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import InfiniteScroll from 'react-infinite-scroller'
import Divider from '@mui/material/Divider';
import { Grid, CssBaseline, Typography, Container, Box, Chip, styled, Tooltip,Paper } from '@mui/material';
import { PeopleAltRounded } from '@mui/icons-material';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import MobileTable from '../../components/Table_user/mobile_table';
import TableDisabled from '../../components/Table_disabled';
import TableUser from '../../components/Table_user';
import Title from './title';
import MobileTabUser from './mobile-user'






const User = ({userLogin}) => {
   const matches = useMediaQuery('(min-width:900px)');

   const bearer_token= localStorage.getItem('tokenDjango'); 
   const [userDisabled, setUserDisabled] = React.useState('')
   const [userEnable, setUserEnable] = useState('');
   const [users, setUsers] = useState('')
   const [cours, setCours] = useState('')


  React.useEffect(()=>{
    getUsers();
    getCour()
   
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
                  setUsers(res) 
                  setUserDisabled(res.filter(x=> !x.is_active && !x.is_archive)) 
                  setUserEnable(res.filter(x=> x.is_active && !x.is_archive && x.role !=='admin'))  
                }
          })
          .catch((error) => {
              console.log(error)
          });
  }

  const getCour=()=>{
     return fetch("http://localhost:8000/api/cour", {
        
        method: 'GET',
        headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           'Authorization': `Bearer ${bearer_token}`
         }
         
      }).then((res) => res.json())
      .then((res) => {
               if(res.data){
                     setCours(res.data)
               }
                  
            })

  }


  const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: 'center',
   color: theme.palette.text.secondary,
  }));
  

  return(

    <>
      <CssBaseline />
      <Container fixed>
     
     
         {matches ?(
         <> 
         <Title />
         <Paper elevation={3} >  
            <Grid  container  maxWidth='xl' 
               style={{  width:'100%', height:'60vh', margin:'0 auto'}} direction="row" rowSpacing={4}
            >            
              <Grid item  xs={8} style={{margin: '0', padding:4, }} >
                 <TableUser userget={userEnable} cours={cours}/>  
              </Grid>
            
              <Grid item sm={4} style={{ padding: 4, margin:'0 auto'}} >
                     <TableDisabled disabledUser={userDisabled}/>
              </Grid>
               
              
               <Box sx={{ flexGrow: 1 , m:0}}>
                  <Grid container spacing={0}>
                  <Grid item xs={12}>
                     <Item sx={{borderBottom:'green 1px solid'}}>
                        <Typography variant='subtitle2'>
                           <Divider >
                              <Tooltip describeChild title="List de tout les utilisateurs.">
                                 <Chip clickable label="USERS" />
                              </Tooltip>
                           </Divider>
                        </Typography>
                     </Item>
                  </Grid>
                  </Grid>
               </Box>
            </Grid> 
         </Paper> 
         </>  
         ):(
        
         <>
         <Grid  container style={{ height:'20%', width:'initial'}} direction="column" maxWidth='xl'>   
     
            <MobileTabUser userEnable={userEnable} userDisabled={userDisabled} />
           </Grid> 
         </>
          
         )}
         
    </Container>
    </>
  )
}

export default User
