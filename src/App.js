import {  useEffect, useState } from 'react';
import './App.css';
import SearchAppBar from './components/Toolbar/index.jsx';
import User from './pages/User';
import { Container, CssBaseline, Grid, Link, Typography } from '@mui/material';

import { Route, Routes, withRouter,useHistory, useLocation} from 'react-router-dom'
import Login from './pages/Login';
import About from './pages/NotFound';
import Cour from './pages/Cours';
import Archive from './pages/ArchiveUsers';

import { LicenseInfo } from '@mui/x-data-grid-pro';
import Home from './pages/Dashboard';
import Profile from './pages/Profile';
import moment from 'moment';

LicenseInfo.setLicenseKey(
  'x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e',
);


const App=()=> {

  const [userLogin, setuserLogin] = useState('')
  const [img, setImg] = useState('')
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [role, setrole] = useState('')
  const [courOutDate, setcourOutDate] = useState('')
  const locationUrl= useLocation();
  const currentUrl= locationUrl.pathname.split('/').join('');
  const defaultRoute= currentUrl ? Number(currentUrl.split("/")[1]) : 1;
  const bearer_token= localStorage.getItem('tokenDjango'); 
  let today = new Date().toISOString().slice(0, 10)


  useEffect(() => {

    getCours();
    console.log(courOutDate)
    convertDate()
    return fetch("http://localhost:8000/api/user_login", {
    
      method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${bearer_token}`
          },
          
    }).then((res) => res.json())
      .then((res) => {
        if(res.status ==='success') {
          setuserLogin(res.data) 
          setImg(res.data.image)  
          setFirst_name(res.data.first_name)
          setLast_name(res.data.last_name)
          setrole(res.data.role) 
          localStorage.setItem('roleLogin', res.data.role)   
        }
      })
      .catch((error) => {
          console.log(error)
          window.location.pathname =''
      });
  },[])


  const convertDate=()=>{
    courOutDate && courOutDate.map((data)=>{
        if(moment(data.date_cour).isBefore(today)){
          updateCour(data.id)
        }
    })
    // return moment(date).isAfter(today)
  }
  
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
            if(res.data){
                // setCours(res.data.filter(x=> x.status))
                setcourOutDate(res.data.filter(x=> x.status))
            }     
        })
        
  }

 const updateCour=(id)=>{

  return fetch(`http://localhost:8000/api/cour/${id}`, {
  
    method: 'PATCH',
           headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${bearer_token}`
        },body: JSON.stringify({
          status : false
      })
        
  }).then((res) => res.json())
    .then((res) => {
        console.log(res);
        // setOpenDisable(false)
        // setDisabled(disabled ? false : true)
        // window.location.reload()
    })
    
  }

  return (
    <div style={{background:'#c8d8c8', position:'initial',  height: '100vh',minHeight : '100vh',}}>
        {!defaultRoute && currentUrl !== 'login'  &&  <SearchAppBar img={img} name={first_name} role={role}/>}
        <CssBaseline />
       
          <Container disableGutters maxWidth='xl' sx={{ pb:0}}>

              <Routes>

                  <Route path="/" element={<Login />} />
                    {/* <Route index element={<Login />} />
                    <Route path='/login'  exact element={<Login  />}/>
                    <Route  element={<About />} /> */}
                  {/* </Route> */}
                  <Route path="/home" exact element={<Home img={img} first_name={first_name} last_name={last_name} role={role} />} />  
                    {/* <Route path="home" element={<Home img={img} first_name={first_name} last_name={last_name}/>}/>
                  </Route> */}
                  <Route path="/user" exact element={<User />} />  
                    {/* <Route path="user" element={<User />}/>
                  </Route> */}
                  <Route path="/cour" exact element={<Cour role={role}/>} />  
                    {/* <Route path="cour" element={<Cour />}/>
                  </Route> */}
                  <Route path="/archive_users" exact element={<Archive role={role}/>} />  
                    {/* <Route path="archive_users" element={<Archive />}/>
                  </Route> */}
                  <Route path="/profile" exact element={<Profile userLogin={userLogin}/>} />  
                    {/* <Route path="archive_cours" element={<Profile userLogin={userLogin}/>}/>
                  </Route> */}

                  <Route exact  element={<About />} />

              </Routes>    
          </Container>
        
        
    </div>
  );
}

export default App
