import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import AttributionIcon from '@mui/icons-material/Attribution';
import PasswordIcon from '@mui/icons-material/Password';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Button, IconButton, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

export default function EditAccordions({ userLogin }) {

  const [expanded, setExpanded] = React.useState(false);
  const [new_password, setnewPassword] = React.useState('');
  const [confirm_password, setconfirmPassword] = React.useState('');
  const [imageAsFile, setImageAsFile] = React.useState('')
  const [imageAsUrl, setImageAsUrl] = React.useState('');
  const [statusPassword, setstatusPassword] = React.useState('')

  const bearer_token = localStorage.getItem('tokenDjango')




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

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
    <>


      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
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

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
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
      {/* Same as */}
      <ToastContainer />


    </>
  );
}