
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import AttributionIcon from '@mui/icons-material/Attribution';
import InfiniteScroll from 'react-infinite-scroller';
import { Avatar, Checkbox, Divider, IconButton, List, ListItem, Chip, ListItemButton, ListItemText } from '@mui/material';
import moment from 'moment'


export default function ControlledAccordions({userLogin}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    console.log(isExpanded)
    console.log(event)

  };

  const style = {
    width: '100%',
    // maxWidth: 360,
    bgcolor: 'background.paper',
    // border:'1px solid red'
  };

// console.log(userLogin)

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

            
    </div>
  );
}


      