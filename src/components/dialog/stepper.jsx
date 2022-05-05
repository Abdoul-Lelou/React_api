import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Divider, FormControl, TextField } from '@mui/material';


// const Theme = ()=>useTheme()  
export default class stepper extends React.Component {

    constructor(props) {
        super(props)
        // Theme()/
        const steps = [
            {
              label: 'Select campaign settings',
              description:
                  <Typography gutterBottom sx={{m:0, width: '100%'}}>
                      <FormControl fullWidth >
                          {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
                          <TextField 
                              id="outlined-basic" 
                              label="Nom" 
                              // value={email} 
                              // onChange={e=>setEmail(e.target.value)}
                              variant="outlined" placeholder='Nom'
                              sx={{ m: 1 }}
                              fullWidth
                          />
                          
                          
                          <Divider />
                      
                          {/* <InputLabel htmlFor="my-input-password">Password</InputLabel> */}
                          <TextField 
                              id="outlined-password-input" 
                              label="Prenom"
                              // value={password} 
                              // onChange={e=>setPassword(e.target.value)} 
                              variant="outlined" placeholder='Prenom'
                              sx={{ m: 1 }}
                              fullWidth
                          />
                          
                      
                          <Divider />
          
                          <TextField 
                              id="outlined-basic" 
                              label="Email" 
                              // value={email} 
                              // onChange={e=>setEmail(e.target.value)}
                              variant="outlined" placeholder='@gmail.com'
                              sx={{ m: 1 }}
                              fullWidth
                          />
                          <Divider />
                      </FormControl>
                  </Typography>,
            },
            {
              label: 'Select campaign ',
              description:
                  <Typography gutterBottom sx={{m:0, width: '100%'}}>
                      <FormControl fullWidth >
                          {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
                          <TextField 
                              id="outlined-basic" 
                              label="Username" 
                              // value={email} 
                              // onChange={e=>setEmail(e.target.value)}
                              variant="outlined" placeholder='Username'
                              sx={{ m: 1 }}
                              fullWidth
                          />
                          
                          
                          <Divider />
                      
                          {/* <InputLabel htmlFor="my-input-password">Password</InputLabel> */}
                          <TextField 
                              id="outlined-password-input" 
                              label="Tel"
                              type='number'
                              // value={password} 
                              // onChange={e=>setPassword(e.target.value)} 
                              variant="outlined" placeholder='Tel'
                              sx={{ m: 1 }}
                              fullWidth
                          />
                          
                      
                          <Divider />
          
                          <TextField 
                              id="outlined-basic" 
                              label="Role" 
                              select
                              value={'apprenant'}
                              // onChange={e=>setEmail(e.target.value)}
                              variant="outlined" placeholder='Role'
                              sx={{ m: 1 }}
                              fullWidth
                          />
                          <Divider />
                      </FormControl>
                  </Typography>,
            },
            {
              label: 'Select  settings',
              description:
                  <Typography gutterBottom sx={{m:0, width: '100%'}}>
                      <FormControl fullWidth >
                          {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
                          <TextField 
                              id="outlined-basic" 
                              label="Image" 
                              // value={email} 
                              // onChange={e=>setEmail(e.target.value)}
                              variant="outlined" placeholder='Image'
                              sx={{ m: 1 }}
                              fullWidth
                          />
                          
                          
                          <Divider />
                      
                          
                          <Divider />
                      </FormControl>
                  </Typography>,
            },
          ];
        
        this.state = {
            activeStep: "",
            tournamentCode: -1,
            maxSteps : steps.length,
            nom:'',prenom:'',email:'',tel:'',username:'',role:'',image:''
          };
    }
   
    

     handleNext = () => {
        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
        this.setState={
            activeStep: (prevActiveStep) => prevActiveStep + 1
        }
      };
    
       handleBack = () => {
        // setActiveStep((prevActiveStep) => prevActiveStep - 1);
        this.setState={
            activeStep: (prevActiveStep) => prevActiveStep - 1
        }
      };
    render() {
        return (
            <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{this.steps[this.activeStep].label}</Typography>
      </Paper>
      <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}>
        {this.steps[this.activeStep].description}
      </Box>
      <MobileStepper
        variant="text"
        steps={this.maxSteps}
        position="static"
        activeStep={this.activeStep}
        nextButton={
          <Button
            size="small"
            onClick={this.handleNext}
            disabled={this.activeStep === this.maxSteps - 1}
          >
            Next
            
          </Button>
        }
        backButton={
          <Button size="small" onClick={this.handleBack} disabled={this.activeStep === 0}>
            {this.Theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
        )
    }
}
