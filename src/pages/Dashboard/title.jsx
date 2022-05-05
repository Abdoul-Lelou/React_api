import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Avatar, Badge, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, ListItem, ListItemIcon, Menu, MenuItem, Tooltip, Typography, Zoom } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { PeopleAlt } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CommentBankIcon from '@mui/icons-material/CommentBank';       
import PersonOffIcon from '@mui/icons-material/PersonOff';
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarViewMonth';    
import brand from '../../images/brand.png';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import DetailPanelCour from '../../components/dialog/detailPanel';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex'
}));


export default function Title({user, cour, archive_user, img, first_name, last_name, role}) {

  const urlImg = 'http://127.0.0.1:8000/api';

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dateSelect, setdateSelect] = React.useState([])
  const [openDial, setOpenDial] = React.useState(false);
  const [opens, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [courSelected, setcourSelected] = React.useState('')

  let date = new Date(2022,0,1)
  date= date.getDate()
  const open = Boolean(anchorEl);
  const descriptionElementRef = React.useRef(null);
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpens = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleCloses = () => {
    setOpen(false);
  };


  React.useEffect(() => {
    console.log(dateSelect)
    if (opens) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [opens])
  
  const findDate=(e)=>{
    setdateSelect('')
    const courSearch = []
    cour && cour.map(
      data=>{
          if(moment(data.date_cour).format('DD-MM-YYYY') === moment(e).format('DD-MM-YYYY')){
           
            const courFind = [data]
            courSearch.push(courFind)
            setdateSelect((courSearch)=>[
              ...courSearch,{
                id: data.id,
                nom: data.nom,
                created_at: data.created_at,
                description: data.description,
                date_cour: data.date_cour,
                user: data.user
              }
            ])
            setOpenDial(true)
           
          }
        }
        )
  }



  const ScrollDialog=()=> {
  
    return (
      <div>
        <Dialog
          open={opens}
          onClose={handleCloses}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          TransitionComponent={Transition}
          transitionDuration={4}
        >

          {
            dateSelect.length ?(
              dateSelect && dateSelect.map((data,index)=>{
              
                return(
                  <>
                  <DialogTitle 
                    id="scroll-dialog-title" 
                    sx={{ boxShadow: 3, display:'inline-flex', width:'90%', borderRadius: '0px 20px 20px 0px'}}
                    >
                      {data.nom}
                      <Typography align='right' sx={{ marginLeft:' auto'}}>
                        {/* <Tooltip title='detail' TransitionComponent={Zoom}> */}
                            <IconButton
                                size='small'
                                // color='primary'
                                
                                title='détail'
                              >
                                
                                  <DetailPanelCour detail={[data]} user={user} />
                              </IconButton>
                        {/* </Tooltip> */}
                      </Typography>

                  </DialogTitle>


                  <DialogContent dividers={scroll === 'paper'} key={index}>
                    &nbsp;
                    <DialogContentText
                      id="scroll-dialog-description"
                      ref={descriptionElementRef}
                      tabIndex={-1}
                      >
                      {data.description}
                    </DialogContentText>
                  </DialogContent>

                 
                  </>
                )
              })
            ):(
                  <>
                  <DialogTitle id="scroll-dialog-title">VIDE</DialogTitle>
                  <DialogContent >
                    <DialogContentText
                      id="scroll-dialog-description"
                      ref={descriptionElementRef}
                      tabIndex={-1}
                      sx={{boxShadow: 1}}
                      >
                      <Typography variant='button' color='error'>AUCUN COUR PREVU A CETTE DATE</Typography>
                    </DialogContentText>
                  </DialogContent>

                  </>
                
            )
          }

                  <DialogActions>
                    <Button onClick={handleCloses} color='error'>QUITTER</Button>
                  </DialogActions>

        </Dialog>
      </div>
    );
  }




  return (
    <>
      <Box sx={{ flexGrow: 1 , m:2}}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            {/* <List> */}
            <Item sx={{borderBottom:'green 1px solid'}}>
              {/* <Typography variant='h6'>COURS <AutoStoriesIcon sx={{color:'#009688'}}/> </Typography> */}
              <ListItem  
                
                // selected={selectedIndex === 1}
                // onClick={(event) => {handleListItemClick(event, 1); navigate('user')}}
            >
                  <ListItemIcon onClick={()=> {window.location.pathname = 'home'}}>
                  <Badge  color="primary">
                    <Tooltip TransitionComponent={Zoom} title="DASHBOARD">
                    <IconButton sx={{background:'white', boxShadow: 4}}>
                        <DashboardIcon sx={{color:'#009688'}}/>
                      </IconButton>
                    </Tooltip>
                  </Badge>   
                  </ListItemIcon>
                 {
                  role ==='admin' && 
                  <ListItemIcon onClick={()=> {window.location.pathname = 'user'}}>
                    <Badge badgeContent={user && user.length ? user.length:'0'} color="primary">
                      <Tooltip TransitionComponent={Zoom} title="USERS">
                          <IconButton sx={{background:'white', boxShadow: 4}}>
                            <PeopleAlt sx={{color:'#009688'}}/>
                          </IconButton>
                      </Tooltip>
                    </Badge>   
                  </ListItemIcon>
                  }
                  <ListItemIcon onClick={()=> {window.location.pathname = 'cour'}}>
                    <Badge badgeContent={cour && cour.length ? cour.length: '0'} color="primary">
                      <Tooltip TransitionComponent={Zoom} title="COURS">
                        <IconButton sx={{background:'white', boxShadow: 4}}>
                          <AutoStoriesIcon sx={{color:'#009688'}}/>
                        </IconButton>
                      </Tooltip>
                    </Badge>   
                  </ListItemIcon>
                 {
                   role === 'admin' &&
                   <ListItemIcon onClick={()=> {window.location.pathname = 'archive_users'}}>
                   <Badge badgeContent={archive_user && archive_user.length? archive_user.length:'0'} color="primary">
                       <Tooltip TransitionComponent={Zoom} title="ARCHIVES USERS">
                         <IconButton sx={{background:'white', boxShadow: 4}}>
                           <PersonOffIcon sx={{color:'#009688'}}/>
                         </IconButton>
                       </Tooltip>
                   </Badge>   
                 </ListItemIcon>
                 }
                  <ListItemIcon onClick={()=> {window.location.pathname = 'profile'}}>
                    <Badge  color="primary">
                      <Tooltip TransitionComponent={Zoom} title="PROFILE">
                        <IconButton sx={{background:'white', boxShadow: 4}}>
                          <CommentBankIcon sx={{color:'#009688'}}/>
                        </IconButton>
                      </Tooltip>
                    </Badge>
                  </ListItemIcon>
                  
                  {/* <ListItemText  /> */}
              </ListItem>
            {/* <Typography align='right' sx={{}}> */}
                <IconButton size='small' disabled >
                  <img 
                    src={brand} 
                    alt="Bakeli" 
                    className='App-logo'  
                    style={{padding:0, borderRadius:20, boxShadow:2}}/> 
                </IconButton>
            {/* </Typography> */}
            </Item>
            
          {/* </List> */}
          </Grid>
          <Grid item xs={4}>
            <Item sx={{borderBottom:'green 1px solid'}}>
                <Typography variant='h6'>
                    {/* ARCHIVE <Archive sx={{color:'#009688'}}/> */}
                    
                    <ListItemIcon disabled  sx={{p:0.2}}>
                      {/* <Badge  color="primary">
                        <Tooltip TransitionComponent={Zoom} title="DASHBOARD"> */}
                          <IconButton disabled sx={{background:'transparent', boxShadow: 0}}>
                            <Avatar 
                              id='avatar'
                              alt={first_name}
                              src={`http://127.0.0.1:8000/api${img}`}
                              // aria-controls={open ? 'basic-menu' : undefined}
                              aria-haspopup="true"
                              // aria-expanded={open ? 'true' : undefined}
                            
                            />
                          
                          {/* <img src={`http://127.0.0.1:8000/api${img}`} alt="ok"  /> */}
                          
                          </IconButton>
                        {/* </Tooltip>
                      </Badge>    */}
                  </ListItemIcon>
                </Typography>
                  <Typography variant='overline' component='column'>
                          <strong>{first_name} {last_name}</strong>
                  </Typography>
                  <Typography variant='overline' flex={6} component='td' sx={{border:'none'}}>
                      &nbsp;
                      <Tooltip TransitionComponent={Zoom} title="CALENDRIER">
                          {/* <IconButton>
                              <CalendarMonthSharpIcon sx={{color:'#009688'}} />                  
                          </IconButton> */}
                          <IconButton
                              id="basic-button"
                              aria-controls={open ? 'basic-menu' : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? 'true' : undefined}
                              onClick={handleClick}
                            >
                              <CalendarMonthSharpIcon sx={{color:'#009688'}} />  
                            </IconButton>
                      </Tooltip>     
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        <MenuItem >
                            <Calendar
                              minDate={new Date(2017, 0, 1)}
                              onClickDay={handleClickOpens('body')}
                              tileDisabled={({ date }) => date.getDay() === 0 || date.getDay() === 6 }
                              onChange={e=>findDate(e)}
                              prev2AriaLabel={false}
                              // onClick={() => findDate()}
                              // minDate={new Date()}
                              next2Label={null}
                              prev2Label={null}
                              
                            />
                           
                        </MenuItem>
                      </Menu>
                    
                  </Typography>
                    
            </Item>
          </Grid>
          
        </Grid>
      </Box>

      {/* <EditDialog /> */}
      <ScrollDialog />
    </>
  );
}
