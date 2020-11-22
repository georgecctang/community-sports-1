import { Link, Redirect } from 'react-router-dom';
import React from 'react'


import './Profile.scss'
export default function ProfileForm () {
 
  return (
    <React.Fragment>
    <nav>
    <div>
      <Link to='/'>Sports</Link>
    </div>
    <ul className="menu">
      <li><Link to='/profile'>My Profile</Link></li>
      <li><Link to="/logout">Logout</Link></li> 
    </ul>
  </nav>
    <div className="profile">
  <p>
  User information
  </p>
  </div>   
  </React.Fragment> 
  )
}