import React from 'react';
import { Link } from 'react-router-dom';

 const About=()=> {
 
  return (
    <div>
      <h1> 404 </h1>
      <hr className="pageNotFoundRedLine" />
      <h2> Page Not Found </h2>
      <p> Do you even internet!? </p>
      <Link to="/home">Go to Home </Link>
    </div>
  );
}
export default About;