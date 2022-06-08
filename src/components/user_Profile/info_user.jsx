
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import AttributionIcon from '@mui/icons-material/Attribution';
import { Divider, IconButton, List, ListItem, Chip, ListItemText, TextField, Button } from '@mui/material';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PasswordIcon from '@mui/icons-material/Password';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
// import { Button, IconButton, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';



export default function ControlledAccordions({userLogin}) {
  const [expanded, setExpanded] = React.useState(false);
  const [new_password, setnewPassword] = React.useState('');
  const [confirm_password, setconfirmPassword] = React.useState('');
  const [imageAsFile, setImageAsFile] = React.useState('')
  const [statusPassword, setstatusPassword] = React.useState('')

  const bearer_token = localStorage.getItem('tokenDjango')

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };


  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  const notify = (msg) => toast(msg);
  const errorMsg = (icon, msg) => Toast.fire({
  icon: icon,
  title: msg
  })

  const ListInfo1=()=>{
      return(
        <List sx={{boxShadow:4, background:'background.paper'}} component="li" aria-label="mailbox folders" key={userLogin.id}>
            <ListItem >
                <ListItemText >
                <Typography component='span' sx={{display:'flex'}}>
                    <Typography align='left' variant='caption' component='li' color='primary' > NOM: </Typography>
                    <Typography align='right' variant='caption' component='li' sx={{ml:'auto'}}> 
                        <Chip  sx={{maxHeight:25}} label={userLogin.last_name}/>
                    </Typography>
                </Typography>
                </ListItemText>
            </ListItem>
            <Divider />
            <ListItem  divider>
                <ListItemText >
                <Typography component='span' sx={{display:'flex'}}>
                    <Typography align='left' variant='caption' component='li' color='primary' > PRENOM: </Typography>
                    <Typography align='right' variant='caption' component='li' sx={{ml:'auto'}}> 
                        <Chip sx={{maxHeight:25}} label={userLogin.first_name}/>
                     </Typography>
                </Typography>
                </ListItemText>
            </ListItem>
            <ListItem >
                <ListItemText >
                <Typography component='span' sx={{display:'flex'}}>
                    <Typography align='left' variant='caption' component='li' color='primary' > RÔLE: </Typography>
                    <Typography align='right' variant='caption' component='li' sx={{ml:'auto'}}> 
                        <Chip sx={{maxHeight:25}} label={userLogin.role}/>
                    </Typography>
                </Typography>
                </ListItemText>
            </ListItem>
            <Divider light />
            {/* <ListItem >
            <ListItemText primary="Spam" />
            </ListItem> */}
      </List>
      )
  }

  const ListInfo2=()=>{
    return(
      <List sx={{boxShadow:4, background:'background.paper'}} component="li" aria-label="mailbox folders">
          <ListItem >
              <ListItemText >
              <Typography component='span' sx={{display:'flex'}}>
                  <Typography align='left' variant='caption' component='li' color='primary' > USERNAME: </Typography>
                  <Typography align='right' variant='caption' component='li' sx={{ml:'auto'}}> 
                        <Chip sx={{maxHeight:25}} label={userLogin.username} />
                  </Typography>
              </Typography>
              </ListItemText>
          </ListItem>
          <Divider />
          <ListItem  divider>
              <ListItemText >
              <Typography component='span' sx={{display:'flex'}}>
                  <Typography align='left' variant='caption' component='li' color='primary' > EMAIL: </Typography>
                  <Typography align='right' variant='caption' component='li' sx={{ml:'auto'}}> 
                        <Chip sx={{maxHeight:25}} label={userLogin.email} />
                  </Typography>
              </Typography>
              </ListItemText>
          </ListItem>
          <ListItem >
              <ListItemText >
              <Typography component='span' sx={{display:'flex'}}>
                  <Typography align='left' variant='caption' component='li' color='primary' > TÉLÉPHONE: </Typography>
                  <Typography align='right' variant='caption' component='li' sx={{ml:'auto'}}> 
                        <Chip sx={{maxHeight:25}} label={userLogin.tel} />
                  </Typography>
              </Typography>
              </ListItemText>
          </ListItem>
          <Divider light />
          {/* <ListItem >
          <ListItemText primary="Spam" />
          </ListItem> */}
    </List>
    )
  }

  const handleChange = (panel) => (event, isExpanded) => {

    setExpanded(isExpanded ? panel : false);
    event.preventDefault()
  };

  const handleImageAsFile = (e) => {
    const images = e.target.files[0]
    setImageAsFile(images)
    // console.log(images)
  }


  const handleClick = (e) => {

    e.preventDefault();

    if (imageAsFile === '') {
      notify(`not an image, the image file is a ${typeof (imageAsFile)}`)
      notify('ERREUR: image vide')
      return;
    }

    let form_data = new FormData();
    form_data.append('image', imageAsFile);

    fetch(`http://localhost:8000/api/user/${userLogin.id}`, {

      method: 'PATCH',
      headers: {'Authorization': `Bearer ${bearer_token}`},
      body: form_data
    }).then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === 'success') {
          notify('Modifié')
          
          setTimeout(() => {
            window.location.pathname='profile'
          }, 1000);
        } else {
              errorMsg('error',res.data.image)
        }
      })

  }

  const editPassword = (e) => {
     e.preventDefault()

    if (new_password !== confirm_password) {
      setstatusPassword('Password ne correspond pas')
      setTimeout(() => {
        setstatusPassword('')
      }, 2000)
      return true
    }

    return fetch(`http://localhost:8000/api/user/${userLogin.id}`, {

      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${bearer_token}`
      },
      body: JSON.stringify({

        password: new_password,
      })
    }).then((res) => res.json())
      .then((res) => {
        console.log(res);
        console.log('firstline');
        if (res.status === 'success') {
          notify('Modifié')
          // closeModal();
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        } else {

          // res.detail? (
          //     window.location.pathname=''
          // ):(
          console.log(res)
          // errorMsg('error', res.data.image)
          // )
        }
      })




  }

  return (
    <div>
      

            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    <IconButton>
                        <SettingsAccessibilityIcon color='primary'/>
                    </IconButton>
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Imformations</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    {userLogin.id && ListInfo1()}
                </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    <IconButton>
                        <AttributionIcon color='primary'/>
                    </IconButton>
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                    Coodonnées
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    {userLogin.id && ListInfo2()}
                </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    <IconButton>
                    <PasswordIcon color='primary'/>
                    </IconButton>
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Modifier password</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    <TextField
                    fullWidth={true}
                    // id="outlined-basic" 
                    label="New password"
                    type='password'
                    value={new_password}
                    onChange={e => { setnewPassword(e.target.value) }}
                    variant="outlined" placeholder='New password'
                    // sx={{ m: 1 }}
                    />
                </Typography>
                &nbsp;
                <Typography>
                    <TextField
                    fullWidth={true}
                    // id="outlined-basic" 
                    label="Confirm password"
                    type='password'
                    value={confirm_password}
                    onChange={e => { setconfirmPassword(e.target.value) }}
                    variant="outlined" placeholder='Confirm password'
                    // sx={{ mb: 1 }}
                    />
                </Typography>
                <Typography variant='body1' align='center' color='error'>{statusPassword}</Typography>

                {
                    confirm_password !== '' && new_password !== '' ?
                    <Button variant='text' onClick={(e) => editPassword(e)}>modifier</Button> :
                    <Button variant='text' disabled onClick={(e) => editPassword(e)}>modifier</Button>

                }
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    <IconButton>
                    <AddAPhotoIcon color='primary'/>
                    </IconButton>
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                    Modifier photo
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    <TextField
                    fullWidth={true}
                    type='file'
                    // accept="image/png, image/jpeg"
                    // value={imageAsFile} 
                    // onChange={e=>{setconfirmPassword(e.target.value)}}
                    onChange={e => handleImageAsFile(e)}
                    variant="outlined" placeholder='Confirm password'

                    />
                </Typography>

                &nbsp;
                {
                    imageAsFile !== '' ?
                    <Button variant='text' onClick={(e) => handleClick(e)}>modifier</Button> :
                    <Button variant='text' color='error' disabled onClick={(e) => handleClick(e)}>modifier</Button>
                }
                </AccordionDetails>
            </Accordion>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        
    </div>
  );
}


      