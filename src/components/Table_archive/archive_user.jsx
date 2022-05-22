import React, { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Grid, CssBaseline, Typography,  styled, Chip, Tooltip, Paper } from '@mui/material';
import ArchiveApprenant from './archive_apprenant';
import ArchiveProffesseur from './archive_proffesseur';


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
     .then((res) => {
        if(res.data)
           setCours(res.data)
     })
     
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
  
  const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: 'center',
   color: theme.palette.text.secondary,
   }));

  
  return(

    <>
      {/* <Container maxWidth='xl'> */}
      {/* <Title /> */}
         {matches ?(
         <Paper elevation={4} >  
            <Grid  container  maxWidth='xl' 
               style={{  width:'100%', height:'60vh', margin:'0 auto'}} 
               direction="row"
               rowSpacing={4}
            >            
              <Grid item  xs={6} style={{margin: '0 auto', padding:4, }} >           
                  <ArchiveProffesseur/>    
              </Grid>
              
              <Grid item sm={6} style={{ padding: 4, margin:'0 auto'}} >
                 <ArchiveApprenant/>
              </Grid>
              
               <Box sx={{ flexGrow: 1 , m:0}}>
                  <Grid container spacing={0}>
                  <Grid item xs={12}>
                     <Item sx={{borderBottom:'green 1px solid'}}>
                        <Typography variant='subtitle2'>
                              <Divider >
                              <Tooltip describeChild title="Archives des proffesseurs et des apprenants.">
                                 <Chip clickable label="ARCHIVES" />
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
                {/* <FormDetailPanel />   */}
             </Grid>
             <Grid item  sx={{marginTop:2, width:'100%'}}>
                 {/* <FormDetailPanel/> */}
             </Grid>

           </Grid> 

         )}
    {/* </Container> */}
    </>
  )
}
export default UserArchive
