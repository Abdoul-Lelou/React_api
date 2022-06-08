import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Container, Divider, FormControl, Grid,  TextField, Typography, useMediaQuery } from '@mui/material';
import 'animate.css';
import './index.css'

const Login = () => {

    const [email, setEmail] = useState('abdoul@gmail.com');
    const [password, setPassword] = useState('bakeli22');
    const [errorMsg, seterrorMsg] = useState('');
    const [loader, setloader] = useState(false)
    const matches = useMediaQuery('(min-width:900px)');


   

    const login= ()=>{

        fetch("http://localhost:8000/api/token", {

            method: 'POST',
                   headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
          }).then((res) => res.json())
            .then((res) => {
                
                setloader(true)
                if (res.access) {
                    localStorage.setItem('tokenDjango', res.access);
                    setTimeout(() => {
                        window.location.pathname = 'home'
                    }, 1000);
                    // setloader(false)
                }else{
                    
                    seterrorMsg(res.detail)
                    setTimeout(() => {
                        seterrorMsg('')
                        setloader(false)
                    }, 2000);
                    
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
            <>
                {
                    matches?(
                        <Container maxWidth="sm" className='bg'>
                            <Typography variant='h5' align='center' color='InfoBackground'>LOGIN</Typography>

                            <FormControl sx={{width:'75%',  margin:'30px 70px', boxShadow:20, padding:2,background:'white'}}>
                        {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
                                <TextField 
                                    id="outlined-basic" 
                                    label="Email" 
                                    value={email} 
                                    onChange={e=>setEmail(e.target.value)}
                                    variant="outlined" placeholder='@gmail.com'
                                    sx={{ m: 1, width:'95%'}}
                                    className="my-element" 
                                    />
                                
                                <br />
                                <Divider />
                                <br />
                                {/* <InputLabel htmlFor="my-input-password">Password</InputLabel> */}
                                <TextField 
                                    id="outlined-password-input" 
                                    label="Password"
                                    type="password" 
                                    value={password} 
                                    onChange={e=>setPassword(e.target.value)} 
                                    variant="outlined" placeholder='password'
                                    sx={{ m: 1, width:'95%' }}
                                    className="my-element" 
                                    />
                                
                            
                                <Divider />
                                <br />
                                <Typography align='center' color='error'>
                                        {errorMsg}
                                </Typography>
                                <Divider />
                                <br />
                                <Typography align='center'>
                                        <Button variant="contained" color="success" size='small' className='animate__pulse'  onClick={()=>login() }>
                                            Connexion {loader ? <CircularProgress size='1.5rem'  sx={{color:'black', display:{loader}}} />: null}
                                        </Button>
                                </Typography>
                            </FormControl>
                            
                        </Container>
                    ):(
                        <Grid container>
                            <Grid item md={12} sx={{ m:'0 auto', width:'90%'}}>
                                <Typography variant='h5' className="my-element"  align='center' sx={{color:'#009688', mt:2}} >LOGIN</Typography>

                                <FormControl sx={{width:'100%',background:'white', p:2, mt:2}}>
                                        <TextField 
                                            id="outlined-basic" 
                                            label="Email" 
                                            value={email} 
                                            onChange={e=>setEmail(e.target.value)}
                                            variant="outlined" placeholder='@gmail.com'
                                            sx={{ m: 1, width:'95%'}}
                                            className="my-element" 
                                            />
                                        
                                        <br />
                                        <Divider />
                                        <br />
                                        {/* <InputLabel htmlFor="my-input-password">Password</InputLabel> */}
                                        <TextField 
                                            id="outlined-password-input" 
                                            label="Password"
                                            type="password" 
                                            value={password} 
                                            onChange={e=>setPassword(e.target.value)} 
                                            variant="outlined" placeholder='password'
                                            sx={{ m: 1, width:'95%' }}
                                            className="my-element" 
                                            />
                                        
                                    
                                        <Divider />
                                        <br />
                                        <Typography align='center' color='error'>
                                                {errorMsg}
                                        </Typography>
                                        <Divider />
                                        <br />
                                        <Typography align='center'>
                                                <Button variant="contained" color="success" size='small' className='animate__pulse'  onClick={()=>login() }>
                                                    Connexion {loader ? <CircularProgress size='1.5rem'  sx={{color:'black', display:{loader}}} />: null}
                                                </Button>
                                        </Typography>
                                </FormControl>
                            </Grid>
                        </Grid>
                    )
                }
               
                
          
            </>
      
     
    )
}

export default Login
