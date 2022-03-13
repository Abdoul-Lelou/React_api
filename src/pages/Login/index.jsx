import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { Button, Container, Divider, FormControl, FormHelperText, Grid, Input, InputLabel, Paper, TextField, Typography } from '@mui/material';

const Login = () => {

    const [email, setEmail] = useState('abdoul@gmail.com');
    const [password, setPassword] = useState('bakeli22');
    const navigate = useNavigate();


    // useEffect(() => {
       
    // })

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
                if (res.access) {
                    localStorage.setItem('tokenDjango', res.access);
                    window.location.pathname = 'home'
                }else{

                    console.log('object');
                    // setErrorMessage(true)
                    // setTimeout(() => {
                    //   setErrorMessage(false)
                    // }, 3000);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Container maxWidth="sm">
            <Grid container maxWidth='sm' sx={{border:'#009688 solid 0.5px', boxShadow:10, margin:2}} justify = "center">
                {/* <Grid item justifyContent='center' sx={{bgcolor:'white', boxShadow:10, width:'100vh', marginTop:5}} maxWidth='sm'> */}
                <FormControl sx={{width:'75%',  margin:'15px auto', boxShadow:8, padding:2}}>
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
                    <Divider />
                    <br />
                    <Typography align='center'>
                            <Button variant="contained" color="success" size='small' onClick={()=>login() }>
                                Success
                            </Button>
                    </Typography>
                </FormControl>
                {/* </Grid> */}
            </Grid>
        </Container>
    )
}

export default Login
