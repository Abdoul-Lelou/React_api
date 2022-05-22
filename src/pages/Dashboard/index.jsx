import React, { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import { 
        Grid, Typography, Container, Card, Paper, CardContent,
        Avatar,Stack, styled, Badge, Link, Chip, AvatarGroup,
        Tooltip, Zoom, Slide 
} from '@mui/material';
import Deposits from '../../components/dashboard/Deposits';
import Title from './title';
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';
import InfiniteScroll from 'react-infinite-scroller';




const Home = ({img, first_name, last_name, role}) => {

  const [user, setUser] = useState('')
  const [userLength, setUserLength] = useState('')
  const [apprenant, setApprenant] = useState('')
  const [proffesseur, setProffesseur] = useState('')
  const [archive_prof, setArchiveProf] = useState('')
  const [archive_appr, setArchiveAppr] = useState('')
  const [enable, setEnable] = useState('')
  const [disable, setDisable] = useState('')
  const [archive_user, setArchiveUser] = useState('');
  const [cour, setCour] = useState('')
  const [courEnable, setCourEnable] = useState('')
  const [archive_cour, setArchiveCour] = useState('');
  const [last_addUser, setlastAddUser] = useState('')
  const [last_addCour, setlastAddCour] = useState('')
  const bearer_token= localStorage.getItem('tokenDjango'); 
  const matches = useMediaQuery('(min-width:900px)');

  const [open, setOpen] = React.useState(false);
  const urlImg ='http://127.0.0.1:8000/api'


  useEffect(() => {
      getUser();
      getCour();
  }, [])
 

  const getUser=()=>{

      return fetch("http://localhost:8000/api/user", {
  
        method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${bearer_token}`
            }
          
        }).then((res) => res.json())
          .then((res) => {
            console.log(user)
                
                if(res.length){
                  setUser(res.filter(x=> x.role !== 'admin'))
                  setUserLength(res.filter(x=> x.role !== 'admin'));
                  setProffesseur(res.filter(x=> x.role === 'proffesseur' && x.is_active));
                  setApprenant(res.filter(x=> x.role === 'apprenant' && x.is_active));
                  setEnable(res.filter(x=> x.is_active && x.role !== 'admin'));
                  setDisable(res.filter(x=> !x.is_active ))
                  setArchiveUser(res.filter(x=> x.is_archive))
                  setArchiveAppr(res.filter(x=> x.is_archive && x.role === 'apprenant'))
                  setArchiveProf(res.filter(x=> x.is_archive && x.role === 'proffesseur'))
                  setlastAddUser(res[res.length -1])
                  } 
          }).catch((error) => {
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
            //      console.log(res)
            if(res.data){
                  setCour(res.data)
                  setArchiveCour(res.data.filter(x=> !x.status));
                  setCourEnable(res.data.filter(x=> x.status));  
                  setlastAddCour(res.data[res.data.length -1])             
                  } 
          })

  }

  const StyledBadgeEnable = styled(Badge)(({ theme }) => ({
      '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
      //   boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        animation: 'ripple 3.2s infinite ease-in-out',
        '&::after': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
      //     animation: 'ripple 1.2s infinite ease-in-out',
          border: '1px solid currentColor',
          content: '""',
        },
      },
      '@keyframes ripple': {
        '0%': {
          transform: 'scale(.8)',
          opacity: 1,
        },
        '100%': {
          transform: 'scale(2.4)',
          opacity: 0,
        },
      },
  }));

  const StyledBadgeDisable = styled(Badge)(({ theme }) => ({
      '& .MuiBadge-badge': {
      //   backgroundColor: '#ff0000',
      //   color: '#ff2300',
      //   boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      //   animation: 'ripple 0.1s infinite ease-in-out',
        '&::after': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
      //     animation: 'ripple 1.2s infinite ease-in-out',
      //     border: '1px solid currentColor',
          content: '""',
        },
      },
      '@keyframes ripple': {
        '0%': {
          transform: 'scale(.8)',
          opacity: 1,
        },
        '100%': {
          transform: 'scale(2.4)',
          opacity: 0,
        },
      },
  }));

  function Copyright() {
      return (
          <Typography variant="body2" color="textSecondary" align="center">
          {/* {'Copyright © '} */}
          <Link color="inherit" >
              Created By <strong>Abdourahmane Diallo</strong>.
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
          </Typography>
      );
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
 
 
  return(

    <>
      <Container >
            <Title 
                  user={user}
                  cour={cour} 
                  archive_user={archive_user}
                  img={img}
                  first_name={first_name}
                  last_name={last_name}
                  role={role}
            />

         {matches ?(
            <Paper elevation={3} >  
                  <Grid  container  maxWidth='xl' 
                        style={{  width:'100%', height:'auto',padding:4, margin:'0 auto'}}
                        direction="row" 
                        rowSpacing={2}
                        columnSpacing={1}
                    >            
                        <Grid item  sm={8} style={{margin: '0' }}>                       
                              <Card sx={{ height: '100%', boxShadow:8 }}>
                                    <CardContent>
                                                <Grid
                                                      container
                                                      spacing={3}
                                                      sx={{ justifyContent: 'space-between' }}
                                                >
                                                      <Grid item>
                                                            <Typography
                                                                  color="textSecondary"
                                                                  gutterBottom
                                                                  variant="overline" 
                                                                  
                                                                  >
                                                                  USERS
                                                            </Typography>

                                                            <Typography
                                                                  color="textPrimary"
                                                                  variant="h5"
                                                                  >
                                                            {userLength.length >0? (userLength.length): ('0')}
                                                            </Typography>
                                                      </Grid>

                                                      <Grid item>
                                                            <Typography
                                                                  color="textSecondary"
                                                                  gutterBottom
                                                                  variant="overline"
                                                                  >
                                                                  DISABLED
                                                            </Typography>

                                                            <Stack direction="row" spacing={2}>
                                                                  <StyledBadgeDisable
                                                                        overlap="circular"
                                                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                                        variant="dot"
                                                                        >
                                                                        <Avatar
                                                                              sx={{
                                                                              backgroundColor: 'error.main',
                                                                              height: 50,
                                                                              width: 50,
                                                                              border:'1px solid white',
                                                                              boxShadow: 4
                                                                              }}
                                                                              >
                                                                              {disable.length >0?(disable.length):('0')}
                                                                        </Avatar>
                                                                  </StyledBadgeDisable>
                                                            </Stack>
                                                      </Grid>

                                                      <Grid item>
                                                            <Typography
                                                                  color="textSecondary"
                                                                  gutterBottom
                                                                  variant="overline"
                                                                  // sx={{animation: 'ripple 2.2s infinite ease-in-out'}}
                                                                  >
                                                                  ENABLED
                                                            </Typography>
                                                            <Stack direction="row" spacing={2}>
                                                                  <StyledBadgeEnable
                                                                  overlap="circular"
                                                                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                                  variant="dot"
                                                                  
                                                                  >
                                                                  <Avatar
                                                                        sx={{
                                                                        backgroundColor: 'success.main',
                                                                        height: 50,
                                                                        width: 50,
                                                                        border:'1px solid white',
                                                                        boxShadow: 4,
                                                                        }}
                                                                  >
                                                                        {enable.length >0?(
                                                                              <Typography sx={{animation: 'ripple 7.2s infinite ease-in-out'}}> 
                                                                                    {enable.length} 
                                                                              </Typography>
                                                                              ):('0')}
                                                                        {/* <EmojiPeopleOutlined/> */}
                                                                  </Avatar>
                                                            </StyledBadgeEnable>
                                                            </Stack>        

                                                      </Grid>

                                                </Grid>
                                                
                                                <Box
                                                      sx={{
                                                      pt: 2,
                                                      display: 'flex',
                                                      alignItems: 'center'
                                                      }}
                                                >
                                                {/* <ArrowDownwardIcon color="error" /> */}
                                                
                                                      <Typography
                                                      color="error"
                                                      sx={{
                                                            mr: 1
                                                      }}
                                                      variant="body2"
                                                      >
                                                      LAST ADD
                                                      </Typography>
                                                      <Typography
                                                            color="textSecondary"
                                                            variant="body1"
                                                            sx={{display:'block', textDecoration: 'underline'}}
                                                      >
                                                            {moment(last_addUser.date_joined).format('dddd [at] HH:mm:ss')}
                                                      </Typography>
                                                </Box>
                                    </CardContent>
                              </Card> 
                        </Grid>
                       
                        <Grid item sm={4} style={{  margin:'0 auto'}} >
                              <Card sx={{ height: '100%', boxShadow:8}}>
                                    <CardContent>
                                          <Grid
                                                container
                                                spacing={3}
                                                sx={{ justifyContent: 'space-between' }}
                                          >

                                                <Grid item>
                                                      <Typography
                                                            color="textSecondary"
                                                            gutterBottom
                                                            variant="overline"
                                                      >
                                                            PROFFESSEURS
                                                      </Typography>
                                                      <Typography
                                                            color="textPrimary"
                                                            variant="h4"
                                                      >
                                                            {proffesseur && proffesseur.length >0 ?proffesseur.length:'0'}
                                                      &nbsp; <Typography variant='overline'>ACTIFS</Typography> 
                                                      </Typography>
                                                </Grid>

                                                <Grid item>
                                                      <Typography
                                                            color="textSecondary"
                                                            gutterBottom
                                                            variant="overline"
                                                      >
                                                            APPRENANTS
                                                      </Typography>
                                                      <Typography
                                                            color="textPrimary"
                                                            variant="h4"
                                                      >
                                                            {apprenant && apprenant.length >0 ?apprenant.length:'0'}
                                                            &nbsp; <Typography variant='overline'>ACTIFS</Typography> 
                                                      </Typography>
                                                </Grid>
                                          </Grid>
                                          <Divider sx={{background:'blue'}} flexItem variant='middle'/>
                                          <Box
                                                sx={{
                                                pt: 2,
                                                display: 'flex',
                                                alignItems: 'center'
                                                }}
                                          >
                                                {/* <ArrowDownwardIcon color="error" /> */}
                                                
                                                <Typography
                                                color="error"
                                                sx={{
                                                      mr: 1
                                                }}
                                                variant="body2"
                                                >
                                                      <Chip  label={`ARCHIVES : ${archive_prof.length >0 ?archive_prof.length: '0' }`} />
                                                </Typography>

                                          

                                                <Typography
                                                      color="error"
                                                      sx={{ ml: 'auto' }}
                                                      variant="body2"
                                                      align='right'
                                                >
                                                      <Chip  label={`ARCHIVES : ${archive_appr.length >0 ?archive_appr.length: '0' }`} />
                                                </Typography>
                                                
                                                
                                          </Box>

                                    </CardContent>
                              </Card>
                        </Grid>

                        <Grid item sm={8} style={{  margin:'0 auto'}} >
                             
                              <Card sx={{ height: '100%', boxShadow:8 }}>
                              <CardContent>
                              <Grid
                                    container
                                    spacing={3}
                                    sx={{ justifyContent: 'space-between' }}
                               >
                                    <Grid item>

                                          <Typography
                                                color="textSecondary"
                                                gutterBottom
                                                variant="overline"
                                          >
                                                COURS
                                          </Typography>

                                          <Typography
                                                color="textPrimary"
                                                variant="h4"
                                          >
                                                {cour && cour.length> 0? cour.length:'0'}
                                          </Typography>
                                          
                                    </Grid>

                                    <Grid item>

                                          <Typography
                                                color="textSecondary"
                                                gutterBottom
                                                variant="overline"
                                                // sx={{animation: 'ripple 2.2s infinite ease-in-out'}}
                                          >
                                                ARCHIVES
                                          </Typography>
                                          <Stack direction="row" spacing={2}>
                                                <StyledBadgeDisable
                                                      overlap="circular"
                                                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                      variant="dot"
                                                      >
                                                      <Avatar
                                                            sx={{
                                                            backgroundColor: 'error.main',
                                                            height: 50,
                                                            width: 50,
                                                            border:'1px solid white',
                                                            boxShadow: 4
                                                            }}
                                                      >
                                                            {archive_cour.length >0?(archive_cour.length):('0')}
                                                            {/* <EmojiPeople/> */}
                                                      </Avatar>
                                                </StyledBadgeDisable>
                                          </Stack>     
                                             
                                    </Grid>

                              </Grid>
                              
                              <Box
                                    sx={{
                                    pt: 2,
                                    display: 'flex',
                                    alignItems: 'center'
                                    }}
                              >
                                 
                                    
                                    <Typography
                                    color="error"
                                    sx={{
                                          mr: 1
                                    }}
                                    variant="body2"
                                    >
                                    LAST ADD
                                    </Typography>
                                    <Typography
                                    color="textSecondary"
                                    variant="body2"
                                    sx={{display:'block', textDecoration: 'underline'}}
                                    >
                                    {moment(last_addUser.created_at).format('dddd [at] HH:mm:ss')}
                                    </Typography>
                              </Box>
                              </CardContent>
                              </Card>

                        </Grid>

                        <Grid item sm={4} style={{  margin:'0 auto'}} >                             
                              <Card
                                sx={{ height: '100%', boxShadow:8 }}
                  
                              >
                              <CardContent>
                              <Grid
                                    container
                                    spacing={3}
                                    sx={{ justifyContent: 'space-between' }}
                              >
                                    <Grid item>
                                          <Typography
                                                color="textSecondary"
                                                gutterBottom
                                                variant="overline"
                                                // sx={{animation: 'ripple 2.2s infinite ease-in-out'}}
                                          >
                                                À VENIR
                                          </Typography>
                                          
                                          <Stack direction="row" spacing={2}>
                                                <StyledBadgeEnable
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                variant="dot"
                                                
                                                >
                                                <Avatar
                                                      sx={{
                                                      backgroundColor: 'success.main',
                                                      height: 50,
                                                      width: 50,
                                                      border:'1px solid white',
                                                      boxShadow: 4,
                                                      }}
                                                >
                                                      {cour.length >0?(
                                                            <Typography sx={{animation: 'ripple 7.2s infinite ease-in-out'}}> 
                                                                  { courEnable.length} 
                                                            </Typography>
                                                            ):('0')}
                                                      {/* <EmojiPeopleOutlined/> */}
                                                </Avatar>
                                          </StyledBadgeEnable>
                                          </Stack>
                                    </Grid>
                                    <Grid item>
                                          <Typography
                                                color="textSecondary"
                                                gutterBottom
                                                variant="overline"
                                                // sx={{animation: 'ripple 2.2s infinite ease-in-out'}}
                                          >
                                                PASSÉ
                                          </Typography>
                                          <Stack direction="row" spacing={2}>
                                                <StyledBadgeDisable
                                                      overlap="circular"
                                                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                      variant="dot"
                                                      >
                                                      <Avatar
                                                            sx={{
                                                            backgroundColor: 'error.main',
                                                            height: 50,
                                                            width: 50,
                                                            border:'1px solid white',
                                                            boxShadow: 4
                                                            }}
                                                      >
                                                            {archive_cour.length >0?(archive_cour.length):('0')}
                                                            {/* <EmojiPeople/> */}
                                                      </Avatar>
                                                </StyledBadgeDisable>
                                          </Stack> 
                                    </Grid>
                              </Grid>
                              <Divider sx={{background:'blue'}} flexItem variant='middle'/>
                              <Box
                                    sx={{
                                    pt: 1,                        
                                    display: 'flex',
                                    alignItems: 'center',
                                    // border:'1px solid red',
                                    borderRaduis: '50px'
                                    }}
                              >
                                    <AvatarGroup total={proffesseur.length} sx={{ boxShadow: 8, borderRadius: 20}}>                                       
                                          {proffesseur && proffesseur.map((data, index)=>{
                                                return(
                                                <Tooltip TransitionComponent={Zoom} title={(data.last_name+' '+data.first_name).toUpperCase()}>    
                                                      <Avatar 
                                                            alt={(data.last_name).toUpperCase()} 
                                                            src={`${urlImg}${data.image}`} 
                                                            key={index}
                                                            onClick={()=>handleClickOpen()}
                                                            // sx={{'hover'}}
                                                            />
                                                </Tooltip>                                                 
                                                )
                                          })}                                              
                                    </AvatarGroup>
                                    <Typography variant='subtitle2' sx={{ml:'auto'}}>
                                          <Chip  label={`PROFFESSEURS : ${proffesseur.length >0 ?proffesseur.length: '0' }`} />
                                    </Typography>
                              </Box>
                                         
                        </CardContent>
                              </Card>
                        </Grid>
      
                  </Grid> 
            

            </Paper> 
         ):(
          
          <>
          <Grid  container  direction="column" maxWidth='xl'>            
            
            <div style={{height:'auto',overflow:'auto'}}>
                  <InfiniteScroll
                        pageStart={0}
                        loadMore={false}
                        hasMore={false}
                        loader={<div className="loader" key={0}>Loading ...</div>}
                        useWindow={false}
                  >

                        <Grid item  sm={12} style={{margin: '0' }}>                       
                              <Card sx={{ height: '100%', boxShadow:8 }}>
                                    <CardContent>
                                          <Grid
                                                container
                                                spacing={3}
                                                sx={{ justifyContent: 'space-between' }}
                                                >
                                                <Grid item>
                                                      <Typography
                                                            color="textSecondary"
                                                            gutterBottom
                                                            variant="overline" 
                                                            
                                                            >
                                                            USERS
                                                      </Typography>

                                                      <Typography
                                                            color="textPrimary"
                                                            variant="h5"
                                                            >
                                                      {userLength.length >0? (userLength.length): ('0')}
                                                      </Typography>
                                                </Grid>

                                                <Grid item>
                                                      <Typography
                                                            color="textSecondary"
                                                            gutterBottom
                                                            variant="overline"
                                                            >
                                                            DISABLED
                                                      </Typography>

                                                      <Stack direction="row" spacing={2}>
                                                            <StyledBadgeDisable
                                                                  overlap="circular"
                                                                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                                  variant="dot"
                                                                  >
                                                                  <Avatar
                                                                        sx={{
                                                                        backgroundColor: 'error.main',
                                                                        height: 50,
                                                                        width: 50,
                                                                        border:'1px solid white',
                                                                        boxShadow: 4
                                                                        }}
                                                                        >
                                                                        {disable.length >0?(disable.length):('0')}
                                                                  </Avatar>
                                                            </StyledBadgeDisable>
                                                      </Stack>
                                                </Grid>

                                                <Grid item>
                                                      <Typography
                                                            color="textSecondary"
                                                            gutterBottom
                                                            variant="overline"
                                                            // sx={{animation: 'ripple 2.2s infinite ease-in-out'}}
                                                            >
                                                            ENABLED
                                                      </Typography>
                                                      <Stack direction="row" spacing={2}>
                                                            <StyledBadgeEnable
                                                            overlap="circular"
                                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                            variant="dot"
                                                            
                                                            >
                                                            <Avatar
                                                                  sx={{
                                                                  backgroundColor: 'success.main',
                                                                  height: 50,
                                                                  width: 50,
                                                                  border:'1px solid white',
                                                                  boxShadow: 4,
                                                                  }}
                                                            >
                                                                  {enable.length >0?(
                                                                        <Typography sx={{animation: 'ripple 7.2s infinite ease-in-out'}}> 
                                                                              {enable.length} 
                                                                        </Typography>
                                                                        ):('0')}
                                                                  {/* <EmojiPeopleOutlined/> */}
                                                            </Avatar>
                                                      </StyledBadgeEnable>
                                                      </Stack>        

                                                </Grid>

                                          </Grid>
                                          
                                          <Box
                                                sx={{
                                                pt: 2,
                                                display: 'flex',
                                                alignItems: 'center'
                                                }}
                                          >
                                          {/* <ArrowDownwardIcon color="error" /> */}
                                          
                                                <Typography
                                                color="error"
                                                sx={{
                                                      mr: 1
                                                }}
                                                variant="body2"
                                                >
                                                LAST ADD
                                                </Typography>
                                                <Typography
                                                      color="textSecondary"
                                                      variant="body1"
                                                      sx={{display:'block', textDecoration: 'underline'}}
                                                >
                                                      {moment(last_addUser.date_joined).format('dddd [at] HH:mm:ss')}
                                                </Typography>
                                          </Box>
                                    </CardContent>
                              </Card> 
                        </Grid>

                        <Divider />
                        <Grid item sm={4}  >
                              <Card sx={{ height: '100%', boxShadow:8}}>
                                    <CardContent>
                                          <Grid
                                                container
                                                spacing={3}
                                                sx={{ justifyContent: 'space-between' }}
                                          >

                                                <Grid item>
                                                      <Typography
                                                            color="textSecondary"
                                                            gutterBottom
                                                            variant="overline"
                                                      >
                                                            PROFFESSEURS
                                                      </Typography>
                                                      <Typography
                                                            color="textPrimary"
                                                            variant="h4"
                                                      >
                                                            {proffesseur && proffesseur.length >0 ?proffesseur.length:'0'}
                                                      &nbsp; <Typography variant='overline'>ACTIFS</Typography> 
                                                      </Typography>
                                                </Grid>

                                                <Grid item>
                                                      <Typography
                                                            color="textSecondary"
                                                            gutterBottom
                                                            variant="overline"
                                                      >
                                                            APPRENANTS
                                                      </Typography>
                                                      <Typography
                                                            color="textPrimary"
                                                            variant="h4"
                                                      >
                                                            {apprenant && apprenant.length >0 ?apprenant.length:'0'}
                                                            &nbsp; <Typography variant='overline'>ACTIFS</Typography> 
                                                      </Typography>
                                                </Grid>
                                          </Grid>
                                          <Divider sx={{background:'blue'}} flexItem variant='middle'/>
                                          <Box
                                                sx={{
                                                pt: 2,
                                                display: 'flex',
                                                alignItems: 'center'
                                                }}
                                          >
                                                {/* <ArrowDownwardIcon color="error" /> */}
                                                
                                                <Typography
                                                color="error"
                                                sx={{
                                                      mr: 1
                                                }}
                                                variant="body2"
                                                >
                                                      <Chip  label={`ARCHIVES : ${archive_prof.length >0 ?archive_prof.length: '0' }`} />
                                                </Typography>

                                          

                                                <Typography
                                                      color="error"
                                                      sx={{ ml: 'auto' }}
                                                      variant="body2"
                                                      align='right'
                                                >
                                                      <Chip  label={`ARCHIVES : ${archive_appr.length >0 ?archive_appr.length: '0' }`} />
                                                </Typography>
                                                
                                                
                                          </Box>
                                    </CardContent>
                              </Card>
                        </Grid>

                        <Divider />
                        <Grid item sm={4}>
                              
                              <Card sx={{ height: '100%', boxShadow:8 }}>
                                    <CardContent>
                                          <Grid
                                                container
                                                spacing={3}
                                                sx={{ justifyContent: 'space-between' }}
                                                >
                                                <Grid item>

                                                      <Typography
                                                            color="textSecondary"
                                                            gutterBottom
                                                            variant="overline"
                                                      >
                                                            COURS
                                                      </Typography>

                                                      <Typography
                                                            color="textPrimary"
                                                            variant="h4"
                                                      >
                                                            {cour && cour.length> 0? cour.length:'0'}
                                                      </Typography>
                                                      
                                                </Grid>

                                                <Grid item>

                                                      <Typography
                                                            color="textSecondary"
                                                            gutterBottom
                                                            variant="overline"
                                                            // sx={{animation: 'ripple 2.2s infinite ease-in-out'}}
                                                      >
                                                            ARCHIVES
                                                      </Typography>
                                                      <Stack direction="row" spacing={2}>
                                                            <StyledBadgeDisable
                                                                  overlap="circular"
                                                                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                                  variant="dot"
                                                                  >
                                                                  <Avatar
                                                                        sx={{
                                                                        backgroundColor: 'error.main',
                                                                        height: 50,
                                                                        width: 50,
                                                                        border:'1px solid white',
                                                                        boxShadow: 4
                                                                        }}
                                                                  >
                                                                        {archive_cour.length >0?(archive_cour.length):('0')}
                                                                        {/* <EmojiPeople/> */}
                                                                  </Avatar>
                                                            </StyledBadgeDisable>
                                                      </Stack>     
                                                            
                                                </Grid>

                                          </Grid>
                                          
                                          <Box
                                                sx={{
                                                pt: 2,
                                                display: 'flex',
                                                alignItems: 'center'
                                                }}
                                          >
                                                
                                                
                                                <Typography
                                                color="error"
                                                sx={{
                                                      mr: 1
                                                }}
                                                variant="body2"
                                                >
                                                LAST ADD
                                                </Typography>
                                                <Typography
                                                color="textSecondary"
                                                variant="body2"
                                                sx={{display:'block', textDecoration: 'underline'}}
                                                >
                                                {moment(last_addUser.created_at).format('dddd [at] HH:mm:ss')}
                                                </Typography>
                                          </Box>
                                    </CardContent>
                              </Card>

                        </Grid>

                        <Divider />
                        <Grid item sm={4} >                             
                              <Card sx={{ height: '100%', boxShadow:8 }}>
                                    <CardContent>
                              <Grid
                                    container
                                    spacing={3}
                                    sx={{ justifyContent: 'space-between' }}
                              >
                                    <Grid item>
                                          <Typography
                                                color="textSecondary"
                                                gutterBottom
                                                variant="overline"
                                                // sx={{animation: 'ripple 2.2s infinite ease-in-out'}}
                                          >
                                                À VENIR
                                          </Typography>
                                          
                                          <Stack direction="row" spacing={2}>
                                                <StyledBadgeEnable
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                variant="dot"
                                                
                                                >
                                                <Avatar
                                                      sx={{
                                                      backgroundColor: 'success.main',
                                                      height: 50,
                                                      width: 50,
                                                      border:'1px solid white',
                                                      boxShadow: 4,
                                                      }}
                                                >
                                                      {cour.length >0?(
                                                            <Typography sx={{animation: 'ripple 7.2s infinite ease-in-out'}}> 
                                                                  { courEnable.length} 
                                                            </Typography>
                                                            ):('0')}
                                                      {/* <EmojiPeopleOutlined/> */}
                                                </Avatar>
                                          </StyledBadgeEnable>
                                          </Stack>
                                    </Grid>
                                    <Grid item>
                                          <Typography
                                                color="textSecondary"
                                                gutterBottom
                                                variant="overline"
                                                // sx={{animation: 'ripple 2.2s infinite ease-in-out'}}
                                          >
                                                PASSÉ
                                          </Typography>
                                          <Stack direction="row" spacing={2}>
                                                <StyledBadgeDisable
                                                      overlap="circular"
                                                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                      variant="dot"
                                                      >
                                                      <Avatar
                                                            sx={{
                                                            backgroundColor: 'error.main',
                                                            height: 50,
                                                            width: 50,
                                                            border:'1px solid white',
                                                            boxShadow: 4
                                                            }}
                                                      >
                                                            {archive_cour.length >0?(archive_cour.length):('0')}
                                                            {/* <EmojiPeople/> */}
                                                      </Avatar>
                                                </StyledBadgeDisable>
                                          </Stack> 
                                    </Grid>
                              </Grid>
                              <Divider sx={{background:'blue'}} flexItem variant='middle'/>
                              <Box
                                    sx={{
                                    pt: 1,                        
                                    display: 'flex',
                                    alignItems: 'center',
                                    // border:'1px solid red',
                                    borderRaduis: '50px'
                                    }}
                              >
                                    <AvatarGroup total={proffesseur.length} sx={{ boxShadow: 8, borderRadius: 20}}>                                       
                                          {proffesseur && proffesseur.map((data, index)=>{
                                                return(
                                                <Tooltip TransitionComponent={Zoom} title={(data.last_name+' '+data.first_name).toUpperCase()}>    
                                                      <Avatar 
                                                            alt={(data.last_name).toUpperCase()} 
                                                            src={`${urlImg}${data.image}`} 
                                                            key={index}
                                                            onClick={()=>handleClickOpen()}
                                                            // sx={{'hover'}}
                                                            />
                                                </Tooltip>                                                 
                                                )
                                          })}                                              
                                    </AvatarGroup>
                                    <Typography variant='subtitle2' sx={{ml:'auto'}}>
                                          <Chip  label={`PROFFESSEURS : ${proffesseur.length >0 ?proffesseur.length: '0' }`} />
                                    </Typography>
                              </Box>
                                          
                                    </CardContent>
                              </Card>
                        </Grid>                

                  </InfiniteScroll>
            </div>     
            </Grid> 
          </>
         )}
    </Container>
    {/* <DetailPanelProf /> */}
    </>
  )
}

export default Home
