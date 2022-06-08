import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';

import ListItemText from '@mui/material/ListItemText';

import { Grid,Paper, CssBaseline, Typography, Container, Avatar, styled,  Skeleton,  Chip } from '@mui/material';

import FormDetailPanel from '../../components/Table_cour';
import BasicTabs from './profileTab';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';



const Profile = ({userLogin}) => {

  const matches = useMediaQuery('(min-width:900px)');
  const urlImg = 'http://127.0.0.1:8000/api'

 
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const ListInfo1=()=>{
    return(
      <List sx={{boxShadow:4, background:'background.paper'}} component="li" aria-label="mailbox folders">
          <ListItem >
              <ListItemText >
              <Typography component='span' sx={{display:'flex'}}>
                  <Typography align='left' variant='caption' component='li' color='primary' > AJOUTÉ LE </Typography>
                  <Typography align='right' variant='caption' component='li' sx={{ml:'auto'}}> 
                      <Chip  sx={{maxHeight:25}}  label={moment(userLogin.date_joined).format('DD-MM-YYYY | HH:MM:SS')} />
                  </Typography>
              </Typography>
              </ListItemText>
          </ListItem>
          <Divider />
          <ListItem  divider>
              <ListItemText >
              <Typography component='span' sx={{display:'flex'}}>
                  <Typography align='left' variant='caption' component='li' color='primary' > LAST_LOGIN </Typography>
                  <Typography align='right' variant='caption' component='li' sx={{ml:'auto'}}> 
                      <Chip sx={{maxHeight:25}} label={moment(userLogin.last_login).format('DD-MM-YYYY | HH:MM:SS')}/>
                   </Typography>
              </Typography>
              </ListItemText>
          </ListItem>
          <ListItem >
              <ListItemText >
                <Typography align='center' sx={{textDecoration: 'underline'}} variant='caption' component='li' color='ActiveCaption' > CREATED BY ABDOURAHMANE DIALLO </Typography>
            
              
              </ListItemText>
          </ListItem>
          <Divider light />
          
      </List>
    )
}

  return (
    <>
    <CssBaseline/>
      <Container maxWidth='xl'>
      {/* <Title /> */}
         {matches ?(
         
         <Grid container sx={{m:' auto'}} spacing={2} md={8}>
            
         {/* <Box sx={{ flexGrow: 1 , m:0.4}}> */}
             <Grid container spacing={1} mt={1.5} mb='auto'>

                 <Grid item md={12} alignItems='center'>
                     <Item sx={{borderBottom:'#c8d8c8 1px solid', background:'#fff'}} md={4} align='center'>
                         <Typography variant='h6'> PROFILE </Typography>
                     </Item>
                 </Grid>       

                 <Grid item md={4} mt={0} alignItems='center'>
                     <Grid sx={{background:'#fff'}} md={12} >
                            
                               

                               {userLogin?(
                                 <>
                                    <Typography variant='subtitle1' alignItems='center' sx={{p:2}} align='center'>
                                      <Avatar 
                                          alt={userLogin.last_name} 
                                          src={`${urlImg}${userLogin.image}`} 
                                          sx={{ width: 150, height: 150, boxShadow:5, margin:'0px auto'}}
                                      />
                                    </Typography>
                                    
                                    {ListInfo1()}
                                 </>  
                               ):(
                                 <Skeleton variant="circular" sx={{ width: 150, height: 150, boxShadow:5, border: '1px solid red',margin:'0px auto'}} />
                               )} 
 
                          
                         <Divider variant='inset' flexItem />
                     </Grid>
                 </Grid>

                 <Grid item md={8} mt={0} alignItems='center'>
                     
                         <BasicTabs userLogin={userLogin} />

                 </Grid>                      
                 
             </Grid>
         {/* </Box> */}

         </Grid>
      

         ):(
         
       
          
          <Grid  container 
           style={{  width:'initial'}} direction="column" maxWidth='xl'
           >      
              <div>
                  <InfiniteScroll
                    pageStart={0}
                    // loadMore='loadFunc'
                    hasMore={false}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                  
                    // scrollableTarget="scrollableDiv"
                  >
                    
                      
                    
                  <Grid item md={4} mt={1} alignItems='center'>
                     <Grid sx={{background:'#fff'}} md={12} >
                            
                               

                          {userLogin?(
                            <>
                              <Typography variant='subtitle1' alignItems='center' sx={{p:2}} align='center'>
                                <Avatar 
                                    alt={userLogin.last_name} 
                                    src={`${urlImg}${userLogin.image}`} 
                                    sx={{ width: 150, height: 150, boxShadow:5, margin:'0px auto'}}
                                />
                              </Typography>
                              
                              {ListInfo1()}
                            </>  
                          ):(
                            <Skeleton variant="circular" sx={{ width: 150, height: 150, boxShadow:5, border: '1px solid red',margin:'0px auto'}} />
                          )} 
 
                          
                          <Divider variant='inset' flexItem />
                     </Grid>
                  </Grid>

                 <Grid item md={8} mt={0} alignItems='center'>
                     
                         <BasicTabs userLogin={userLogin} />

                 </Grid>    
                  </InfiniteScroll>          
              </div>
          </Grid> 

         )}
    </Container>
    </>
  )
}

export default Profile