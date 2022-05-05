import React,{useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {/* {'Copyright © '} */}
      <Link color="inherit" href="https://material-ui.com/">
        Created By Abdourahmane Diallo.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  
  title: {
    flexGrow: 1,
  },
  
  container: {
    paddingTop: 24,//theme.spacing(4),
    paddingBottom:24, //theme.spacing(4),
  },
  paper: {
    padding: 2,//theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
    fetch("http://localhost:8000/api/token", {

      method: 'POST',
             headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          body: JSON.stringify({
              // email: login,
              // password: password,
          })
    }).then((res) => res.json())
      .then((res) => {
          if (res.access) {
              localStorage.setItem('tokenDjango', res.access);
              window.location.pathname = 'home'
          }else{

              
          }
      })
      .catch((error) => {
          
      });
  })

  return (
   <div className={classes.root}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            {/* <Grid item xs={12} md={8} lg={9}> */}
              <Paper className={fixedHeightPaper}>
                {/* <Chart /> */}
              </Paper>
            {/* </Grid> */}
            {/* Recent Deposits */}
            {/* <Grid item xs={12} md={4} lg={3}> */}
              <Paper className={fixedHeightPaper}>
                {/* <Deposits /> */}
              </Paper>
            {/* </Grid> */}
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {/* <Orders /> */}
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      {/* </main> */}
    </div>
  );
}
