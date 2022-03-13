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
import { Grid, CssBaseline, Typography, Container } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { ThemeProvider } from '@emotion/react';
import { createTheme, height, width } from '@mui/system';
import { Paper } from '@mui/material';
import Chart from '../../components/dashboard/Chart';
import Deposits from '../../components/dashboard/Deposits';


const Home = () => {



  const matches = useMediaQuery('(min-width:900px)');

 
  
  

  
  return(

    <>
      <Container >
      <Typography variant='h3'>Utilisateur</Typography>
         {matches ?(
         <Paper elevation={3} >  
            <Grid  container  maxWidth='xl' 
            style={{  width:'100%', height:'75vh', margin:'0 auto'}} direction="row" rowSpacing={4}
           >            
              <Grid item  xs={8} style={{margin: '0', padding:4, }}
              >
                 <Chart />  
              </Grid>
              {/* <Divider /> */}
              <Grid item sm={4} style={{ padding: 4, margin:'0 auto'}} >
                  <Deposits/>
              </Grid>
 
            </Grid> 
            </Paper> 
         ):(
          
          <Grid  container 
           style={{ height:'50%', width:'initial'}} direction="column" maxWidth='xl'
          >            
             <Grid item   
             >
                <CollapsibleTable />  
             </Grid>
             <Grid item  sx={{marginTop:2, width:'100%'}}>
                 <Deposits/>
             </Grid>

           </Grid> 

         )}
    </Container>
    </>
  )
}

export default Home
