import logo from './logo.svg';
import './App.css';
import SearchAppBar from './components/Toolbar/index.jsx';
import User from './pages/User';
import { Container, Grid, Typography } from '@mui/material';
import CustomColumnMenu from './components/Scrooll';
import { Box } from '@mui/system';
import { Route, Routes, withRouter,useHistory, useLocation} from 'react-router-dom'
import Login from './pages/Login';
import About from './pages/NotFound';
import Cour from './pages/Cours';
import Archive from './pages/Archives';

import { LicenseInfo } from '@mui/x-data-grid-pro';
import Home from './pages/Dashboard';

LicenseInfo.setLicenseKey(
  'x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e',
);

const App=()=> {

  const locationUrl= useLocation();
  const currentUrl= locationUrl.pathname.split('/').join('');
  const defaultRoute= currentUrl ? Number(currentUrl.split("/")[1]) : 1;
  // const [users, setUsers] = React.useState('');

 

  // React.useEffect(() => {
  //   getUsers();
  //   return () => {
  //     setUsers('')
  //   }
  // }, [])


   


  return (
    <>
        {!defaultRoute && currentUrl !== 'login'  &&  <SearchAppBar />}

        <Container disableGutters maxWidth='xl' >

            <Routes>

                <Route path="/" element={<Login />}>
                  <Route index element={<Login />} />
                  <Route path='/login'  exact element={<Login  />}/>
                  <Route  element={<About />} />
                </Route>
                <Route path="/home" element={<Home />}>  
                  <Route path="user" element={<Home />}/>
                </Route>
                <Route path="/user" element={<User />}>  
                  <Route path="user" element={<User />}/>
                </Route>
                <Route path="/cour" element={<Cour />}>  
                  <Route path="cour" element={<Cour />}/>
                </Route>
                <Route path="/archive" element={<Archive />}>  
                  <Route path="archive" element={<Archive />}/>
                </Route>

                <Route  element={<About />} />

            </Routes>    

        </Container>
        
    </>
  );
}

export default App;
