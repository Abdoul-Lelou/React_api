


import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Avatar, Chip, FormControl, Grid, InputLabel, MenuItem, Paper, Select, styled, TextField } from '@mui/material';
import { Info, PersonAdd, SignalCellularNullRounded } from '@mui/icons-material';
import { Box } from '@mui/system';
import moment from 'moment'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const date = new Date();

function DetailPanelUser({detail, cours,text}) {
  const [open, setOpen] = React.useState(false);
  const [urlImg, seturlImg] =  React.useState('');
  const [signedCour, setsignedCour] =  React.useState('')
 

  const handleClickOpen = () => {
    seturlImg('http://127.0.0.1:8000/api')
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  let item='', tab =[] 

  const getCours=cours && cours.map(x => {
    item = detail.find(item => item.id === x.user);
    if (item) { 
      tab.push(x)
      return item
    }      
  }).filter(item => item !== undefined); // Can also use filter(item => item);


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  const ListInfo=()=>{
    return(
      <List sx={{boxShadow:4, background:'background.paper'}} component="li" aria-label="mailbox folders" key={detail.id}>
         
         {detail && detail.map((data)=>{
              return(
                <>
                   <ListItem >
                      <ListItemText>
                      <Typography component='span' sx={{display:'flex'}}>
                          <Typography align='left' variant='caption' component='li' sx={{textDecoration:'underline'}}> NOM: </Typography>
                          <Typography align='right' variant='caption' component='li' sx={{ml:'auto'}}> 
                              <Chip  sx={{maxHeight:25}} label={data.last_name}/>
                          </Typography>
                      </Typography>
                      </ListItemText>
                  </ListItem>
                  <Divider />
                  <ListItem  divider>
                      <ListItemText>
                      <Typography component='span' sx={{display:'flex'}}>
                          <Typography align='left' variant='caption' component='li'  sx={{textDecoration:'underline'}}> PRENOM: </Typography>
                          <Typography align='right' variant='caption' component='li' sx={{ml:'auto'}}> 
                              <Chip sx={{maxHeight:25}} label={data.first_name}/>
                          </Typography>
                      </Typography>
                      </ListItemText>
                  </ListItem>
                  <ListItem >
                      <ListItemText>
                      <Typography component='span' sx={{display:'flex'}}>
                          <Typography align='left' variant='caption' component='li' sx={{textDecoration:'underline'}} > EMAIL: </Typography>
                          <Typography align='right' variant='caption' component='li' sx={{ml:'auto'}}> 
                              <Chip sx={{maxHeight:25}} label={data.email}/>
                          </Typography>
                      </Typography>
                      </ListItemText>
                  </ListItem>
                  <Divider light />
                  <ListItem >
                      <ListItemText>
                      <Typography component='span' sx={{display:'flex'}}>
                          <Typography align='left' variant='caption' component='li' sx={{textDecoration:'underline'}} > RÔLE: </Typography>
                          <Typography align='right' variant='caption' component='li' sx={{ml:'auto'}}> 
                              <Chip sx={{maxHeight:25}} label={data.role}/>
                          </Typography>
                      </Typography>
                      </ListItemText>
                  </ListItem>
                  <Divider light />
                  <ListItem >
                      <ListItemText>
                      <Typography component='span' sx={{display:'flex'}}>
                          <Typography align='left' variant='caption' component='li' sx={{textDecoration:'underline'}} > TÉLÉPHONE: </Typography>
                          <Typography align='right' variant='caption' component='li' sx={{ml:'auto'}}> 
                              <Chip sx={{maxHeight:25}} label={data.tel}/>
                          </Typography>
                      </Typography>
                      </ListItemText>
                  </ListItem>

                  {
                    data.role ==='proffesseur' && 
                    <>
                    <Divider light />
                      <ListItem >
                          <ListItemText>
                          <Typography component='span' sx={{display:'flex'}}>
                              <Typography align='left' variant='caption' component='li' sx={{textDecoration:'underline'}} > COURS: </Typography>
                              <Typography align='right' variant='caption' component='li' sx={{ml:'auto'}}> 
                                  <Chip sx={{maxHeight:25}} label={getCours.length} />
                              </Typography>
                          </Typography>
                          </ListItemText>
                      </ListItem>
                     
                    </>
                  }

                </>
              )
         })}
    </List>
    )
  }
  

  const ListInfoCour=()=>{

    tab=[]
    cours && cours.map(x => {
      item = detail.find(item => item.id === x.user);
      if (item) { 
        tab.push(x)
        return item
      }      
    }).filter(item => item !== undefined);

    return(
      <List sx={{boxShadow:4, background:'background.paper'}} component="li" aria-label="mailbox folders" key={detail.id}>
            {detail && detail.map((data)=>{
                  return(
                    <>
                      
                    
                      <ListItem  divider>

                      <ListItemText 
                            primary={
                              <Typography variant='caption' sx={{textDecoration:'underline'}}>
                                  AJOUTÉ LE
                              </Typography>
                            }

                            secondary={
                              <Typography variant='subtitle2'>
                                  {moment(data.date_joined).format('DD-MM-YYYY')}
                              </Typography>
                            }
                            
                            />
                      </ListItem>
                      <ListItem >
                          <ListItemText 
                            primary={
                              <Typography variant='caption' sx={{textDecoration:'underline'}}>
                                  EN LIGNE IL YA
                              </Typography>
                            }

                            secondary={
                              <Typography variant='subtitle2'>
                                  { moment(data.last_login).startOf('hour').fromNow()}
                              </Typography>
                            }
                            
                            />
                        
                      </ListItem>
                      <Divider light />
                      <ListItem >

                          <ListItemText 
                              primary={
                                <Typography variant='caption' sx={{textDecoration:'underline'}}>
                                    STATUS DE L'UTILISATEUR
                                </Typography>
                              }

                              secondary={
                                <Typography variant='subtitle2'>
                                    {
                                      data.is_active ?(
                                        <>
                                            <Chip  sx={{maxHeight:20, color:"green"}} label='ACTIVE'/>
                                            {/* <Typography color='green' variant='subtitle2'>ACTIVE</Typography> */}
                                        </>
                                      ):(
                                        <>
                                          <Chip  sx={{maxHeight:20, color:"red"}} label='INACTIVE'/>
                                        </>
                                      )
                                    }
                                </Typography>
                              }
                            
                            />
                      </ListItem>
                      
                      {
                        data.role ==='proffesseur' &&
                        <>
                            <Divider light />
                            <ListItem >
                              <ListItemText 
                                primary={
                                  <Typography variant='caption' sx={{textDecoration:'underline'}}>
                                      COURS ENSEIGNÉS
                                  </Typography>
                                }

                                secondary={
                                  <Typography  sx={{textJustify:'inter-character', wordBreak:'break-all'}}>
                                    {
                                      tab.length  ?(
                                        tab && tab.map((cour)=>{
                                          return( 
                                            // tab.length && cour?(
                                              <>
                                                <Chip  sx={{maxHeight:25, color:"#" + ((1<<14)*Math.random() | 0).toString(8)}} label={cour.nom+' '+' '}/>
                                              </>
                                            // ):(
                                              // <span>Aucun cour</span>
                                            // )
                                          )
                                        })
                                      ):(
                                        <Typography variant='subtitle1' color='error'>Aucun cour</Typography>
                                      )
                                    }
                                  </Typography>
                                }
                              
                              />
                            </ListItem>
                         
                          </>         
                      }
                    </>
                  )
            })}
    </List>
    )
  }


  return (
    <div>
      <span onClick={()=> {handleClickOpen() }}>{text}</span>
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
            <Typography sx={{ ml: 8, flex: 1 }} variant="h6" component="div" align='center'>
              DÉTAIL
            </Typography>
          
          </Toolbar>
        </AppBar>
            
          <Grid container sx={{m:'15px auto', boxShadow:2, background:'#c8d8c8'}} spacing={2} md={8}>
              
              <Box sx={{ flexGrow: 1 , m:2}}>

                  <Grid container spacing={1} >

                      <Grid item md={12} alignItems='center'>
                          <Item sx={{borderBottom:'#c8d8c8 1px solid'}} md={4} align='center'>
                              <Typography variant='h6'>
                              {detail && detail.map((data)=>{
                                return(
                                  <>
                                   {data.role ==='proffesseur'?(
                                     <>PROFFESSEUR</>
                                   ):(
                                    <>APPRENANT</>
                                   )}
                                  </>
                                )
                              })}
                              </Typography>
                          </Item>
                      </Grid>       

                      <Grid item md={4} mt={2} alignItems='center'>
                          <Grid sx={{borderBottom:'#c8d8c8 1px solid',background:'#fff'}} md={12} >
                                {ListInfoCour()}
                          </Grid>
                      </Grid>

                      <Grid item md={8} mt={2} alignItems='center'>
                          <Grid sx={{borderBottom:'#c8d8c8 1px solid',background:'#fff'}} md={12} >
                                {ListInfo()}
                          </Grid>
                      </Grid>                      
                      
                  </Grid>

              </Box>

          </Grid>

      </Dialog>
    </div>
  );
}
export default DetailPanelUser