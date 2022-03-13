import React, { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CollapsibleTable from '../../components/Table_user';
import { Grid, CssBaseline, Typography, Container, ListItemAvatar, Avatar } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { ThemeProvider } from '@emotion/react';
import { createTheme, height, width } from '@mui/system';
import { Paper } from '@mui/material';
import FormDetailPanel from '../../components/Table_cour';
import InfiniteScroll from 'react-infinite-scroller';
import TableCour from '../../components/Table_cour';
// import Title from './title';


const UserArchive = () => {

  const [cours, setCours] = useState('') 

  const bearer_token= localStorage.getItem('tokenDjango');
  const matches = useMediaQuery('(min-width:900px)');

  useEffect(() => {

     getCours()

     return () => {
       setCours('')
     }
  }, [])
  

  const getCours=()=>{
      
  
   return fetch("http://localhost:8000/api/cour", {

     method: 'GET',
            headers: {
             'Content-Type': 'application/json',
             'Accept': 'application/json',
             'Authorization': `Bearer ${bearer_token}`
         },
         
   }).then((res) => res.json())
     .then((res,index) => {
           setCours(res.data)
         //   console.log(res);
         
     })
     .catch((error) => {
         console.log(error)
     });
 }
  
 const Capitalize=(str)=>{
   return str.charAt(0).toUpperCase() + str.slice(1);
   }

  const cour=()=>{

      return(
         <>
            <CssBaseline/>
            <List  component="div" disablePadding sx={{ width: '100%', border:'1px solid', bgcolor: 'background.paper',   boxShadow: 2  }}
               id="scrollableDiv"
               style={{
               height: 300,
               overflow: 'auto',
               flexDirection: 'column-reverse',
            }}
            > 

            {
            cours.length ?(
               cours && cours.map((data,index)=>{
                     return (
                     <>
                        {data.nom}
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
         </>    
      )
  }
  

  
  return(

    <>
      {/* <Container maxWidth='xl'> */}
      {/* <Title /> */}
         {matches ?(
         <Paper elevation={4} >  
            <Grid  container  maxWidth='xl' 
            style={{  width:'100%', height:'60vh', margin:'0 auto'}} direction="row" rowSpacing={4}
           >            
              <Grid item  xs={6} style={{margin: '0', padding:4, }}
              >
                 
                   
                 <TableCour/>

              </Grid>
              {/* <Divider /> */}
              <Grid item sm={6} style={{ padding: 4, margin:'0 auto'}} >
                  <FormDetailPanel/>
              </Grid>
 
            </Grid> 
             </Paper> 
         ):(
          
          <Grid  container 
           style={{ height:'50%', width:'initial'}} direction="column" maxWidth='xl'
          >            
             <Grid item   
             >
                <FormDetailPanel />  
             </Grid>
             <Grid item  sx={{marginTop:2, width:'100%'}}>
                 <FormDetailPanel/>
             </Grid>

           </Grid> 

         )}
    {/* </Container> */}
    </>
  )
}

export default UserArchive
