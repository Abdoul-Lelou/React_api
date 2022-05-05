import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { Grid, Typography, Container, Paper, Chip, styled, Tooltip } from '@mui/material';

import FormDetailPanel from '../../components/Table_cour';
import Title from './title';
import ArchiveCour from '../../components/Table_archive/archive_cour';
import TableUserCour from '../../components/Table_cour/cours';


const Cour = ({role}) => {

  const matches = useMediaQuery('(min-width:900px)');


  

  
  const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: 'center',
   color: theme.palette.text.secondary,
   }));
  
  return(

    <>
      <Container >
      <Title />
         {matches ?(
         <Paper elevation={1} >  
            <Grid  container  maxWidth='xl' 
            style={{  width:'100%', height:'60vh', margin:'0 auto'}} direction="row" rowSpacing={4}
           >            
              <Grid item  xs={8} style={{margin: '0', padding:4, }}
              >  
                 <TableUserCour role={role}/>

              </Grid>
             
              <Grid item sm={4} style={{ padding: 4, margin:'0 auto'}} >
                  {/* <FormDetailPanel/> */}
                  <ArchiveCour role={role}/>
              </Grid>
 
               <Box sx={{ flexGrow: 1 , m:0}}>
                  <Grid container spacing={0}>
                  <Grid item xs={12}>
                     <Item sx={{borderBottom:'green 1px solid'}}>
                        <Typography variant='subtitle2'>
                           <Divider >
                              <Tooltip describeChild title="Liste de tout les cours.">
                                 <Chip clickable label="COURS" />
                              </Tooltip>
                           </Divider> 
                        </Typography>
                     </Item>
                  </Grid>
                  </Grid>
               </Box>
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
    </Container>
    </>
  )
}

export default  Cour


