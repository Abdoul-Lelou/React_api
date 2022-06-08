


import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {  Chip, Divider,  Grid, Paper, styled, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

function DetailPanelCour({detail, user}) {
  const [open, setOpen] = React.useState(false);
  const matches = useMediaQuery('(min-width:900px)');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  let item ='';
  let prof = detail.map(x => {
     item = user.find(item => item.id === x.user);
    if (item) { 
      return item
    }      
  }).filter(item => item !== undefined);



  const ListInfo=()=>{
    return(
      <List sx={{boxShadow:4, background:'background.paper'}} component="li" aria-label="mailbox folders" key={detail.id}>
         
         {detail && detail.map((data)=>{
              return(
                <>
                   <ListItem >
                      <ListItemText >
                      <Typography component='span' sx={{display:'flex'}}>
                          <Typography align='left' variant='caption' component='li' sx={{textDecoration:'underline'}}> NOM: </Typography>
                          <Typography align='right' variant='caption' component='li' sx={{ml:'auto'}}> 
                              <Chip  sx={{maxHeight:25}} label={data.nom}/>
                          </Typography>
                      </Typography>
                      </ListItemText>
                  </ListItem>
                  <Divider />
                  <ListItem  divider>
                      <ListItemText >
                      <Typography component='span' sx={{display:'flex'}}>
                          <Typography align='left' variant='caption' component='li'  sx={{textDecoration:'underline'}}> AJOUTÉ LE: </Typography>
                          <Typography align='right' variant='caption' component='li' sx={{ml:'auto'}}> 
                              <Chip sx={{maxHeight:25}} label={moment(data.created_at).format('DD-MM-YYYY HH:MM:SS')}/>
                          </Typography>
                      </Typography>
                      </ListItemText>
                  </ListItem>
                  <ListItem >
                      <ListItemText >
                      <Typography component='span' sx={{display:'flex'}}>
                          <Typography align='left' variant='caption' component='li' sx={{textDecoration:'underline'}} > PRÉVU LE: </Typography>
                          <Typography align='right' variant='caption' component='li' sx={{ml:'auto'}}> 
                              <Chip sx={{maxHeight:25}} label={data.date_cour}/>
                          </Typography>
                      </Typography>
                      </ListItemText>
                  </ListItem>
                  <Divider light />
                  <ListItem >
                      <ListItemText >
                      <Typography component='span' sx={{display:'flex'}}>
                          <Typography align='left' variant='caption' component='li' sx={{textDecoration:'underline'}} > STATUS DU COUR: </Typography>
                          <Typography align='right' variant='caption' component='li' sx={{ml:'auto'}}> 
                              {data.status?(<Chip sx={{maxHeight:25, color:'green'}} label='ACTIF'/>):(<Chip sx={{maxHeight:25, color:'red'}} label='INACTIF'/>)}
                          </Typography>
                      </Typography>
                      </ListItemText>
                  </ListItem>
                  <Divider light />
                  <ListItem >
                      <ListItemText >
                      <Typography component='span' sx={{display:'flex'}}>
                          <Typography align='left' variant='caption' component='li' sx={{textDecoration:'underline'}} > ENSEIGNÉ PAR: </Typography>
                          <Typography align='right' variant='caption' component='li' sx={{ml:'auto'}}> 
                              {prof && prof.map(value=>{
                                return(
                                  <Chip sx={{maxHeight:25}} label={value.last_name+ ' '+value.first_name}/>

                                )
                              })}
                          </Typography>
                      </Typography>
                      </ListItemText>
                  </ListItem>

                 

                </>
              )
         })}
    </List>
    )
  }
 

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  return (
    <div>
    
      <Button
             onClick={()=> {handleClickOpen() }}
                  size='small'
                  color='primary'
            >
              {/* <Info size='small'/> */}
                {/* <AddUser/> */}
                Détail
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', background:'#009688' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            
            {
              matches?(
                <Typography sx={{ mr:3, flex: 1 }} variant="h6" component="div" align='center'>
                  Detail
                </Typography>
              ):(
                <Typography sx={{flex: 1, }} variant="h6" component="div" align='center'>
                  {detail && detail.map((data)=>{
                    return(
                      <>
                          {data.nom.toUpperCase()}
                      </>
                    )
                  })}
            </Typography>
              )
            }
          
          </Toolbar>
        </AppBar>
            
          {
            matches?(
              <Grid container sx={{m:'15px auto',  background:'#c8d8c8'}} spacing={2} md={8}>
              
              <Box sx={{ flexGrow: 1 , m:2}}>

                  <Grid container spacing={1}>

                      <Grid item md={12} alignItems='center'>
                          <Item sx={{borderBottom:'#c8d8c8 1px solid'}} md={4} align='center'>
                              <Typography variant='h6' sx={{textDecoration:'underline'}}>
                              {detail && detail.map((data)=>{
                                return(
                                  <>
                                      {data.nom.toUpperCase()}
                                  </>
                                )
                              })}
                              </Typography>
                          </Item>
                      </Grid>       

                      <Grid item md={4} mt={2} alignItems='center'>
                          <Grid sx={{borderBottom:'#c8d8c8 1px solid', background:'#fff'}} md={12} >                              
              
                                 <List>
                                      {detail && detail.map((data)=>{
                                            return(  
                                          <ListItem  divider>

                                                <ListItemText 
                                                      primary={
                                                        <Typography variant='caption' sx={{textDecoration:'underline'}}>
                                                            Déscription
                                                        </Typography>
                                                      }

                                                      secondary={
                                                        <Typography variant='subtitle2'>
                                                            {data.description}
                                                        </Typography>
                                                      }
                                                      
                                                      />
                                            </ListItem>
                                              )
                                      })} 
                                 </List>
                                
                          </Grid>
                      </Grid>

                      <Grid item md={8} mt={2} alignItems='center'>
                          <Grid sx={{borderBottom:'#c8d8c8 1px solid', background:'#fff'}} md={12} >
                                
                                {ListInfo()}

                          </Grid>
                      </Grid>                      
                      
                  </Grid>

              </Box>

              </Grid>
            ):(
              <Grid container sx={{background:'#c8d8c8', height:'100%'}} spacing={0} md={8}>
              
              <Box sx={{ flexGrow: 1 , m:2, background:'#fff'}}>
                                                          
                    <List sx={{boxShadow:5}} >
                        {detail && detail.map((data)=>{
                              return(  
                            <ListItem  divider>

                                  <ListItemText 
                                        primary={
                                          <Typography variant='caption' sx={{textDecoration:'underline'}}>
                                              Déscription
                                          </Typography>
                                        }

                                        secondary={
                                          <Typography variant='body1'>
                                              {data.description}
                                          </Typography>
                                        }
                                        
                                        />
                              </ListItem>
                                )
                        })} 
                    </List>                            
                  
                  {ListInfo()}

              </Box>

          </Grid>
            )
          }

      </Dialog>
    </div>
  );
}
export default DetailPanelCour