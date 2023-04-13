import React from 'react';
import './footer.scss';
import { Link } from 'react-router-dom';
import Movies from '../../images/Movies.png';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footerContainer'>
        <div className='logo'>
          <img src={Movies} alt="" />
          <Link to='/' className='title'>tMovies</Link>
        </div>
        <div className='footerItems'>
          <div className='footerItem'>
            <Link to='/'>Home</Link>
            <Link to='/'>Contact us</Link>
            <Link to='/'>Term of services</Link>
            <Link to='/'>About us</Link>
          </div>
          <div className='footerItem'>
            <Link to='/'>Live</Link>
            <Link to='/'>FAQ</Link>
            <Link to='/'>Premium</Link>
            <Link to='/'>Pravacy policy</Link>
          </div>
          <div className='footerItem'>
            <Link to='/'>You must watch</Link>
            <Link to='/'>Recent release</Link>
            <Link to='/'>Top IMBD</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer