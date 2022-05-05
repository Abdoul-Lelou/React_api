import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { Button, CircularProgress, Container, Divider, FormControl, FormHelperText, Grid, Input, InputLabel, Paper, TextField, Typography } from '@mui/material';

const Login = () => {

    const [email, setEmail] = useState('abdoul@gmail.com');
    const [password, setPassword] = useState('bakeli22');
    const [errorMsg, seterrorMsg] = useState('');
    const [loader, setloader] = useState(false)
    const navigate = useNavigate();


    useEffect(() => {
        
    })

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
        <Container maxWidth="sm" sx={{background:'#c8d8c8', pb:25}}>
            <Grid container maxWidth='sm' sx={{ boxShadow:10, background:'text.secondary'}} justify = "center">
                
                <FormControl sx={{width:'75%',  margin:'20px auto', boxShadow:8, padding:2,background:'white'}}>
                    {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
                    <TextField 
                        id="outlined-basic" 
                        label="Email" 
                        value={email} 
                        onChange={e=>setEmail(e.target.value)}
                        variant="outlined" placeholder='@gmail.com'
                        sx={{ m: 1 }}
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
                        sx={{ m: 1 }}
                        />
                     
                 
                    <Divider />
                    <br />
                    <Typography align='center' color='error'>
                            {errorMsg}
                    </Typography>
                    <Divider />
                    <br />
                    <Typography align='center'>
                            <Button variant="contained" color="success" size='small' onClick={()=>login() }>
                                Connexion {loader ? <CircularProgress size='1.5rem'  sx={{color:'black', display:{loader}}} />: null}
                            </Button>
                    </Typography>
                </FormControl>
                
            </Grid>
        </Container>
    )
}

export default Login
