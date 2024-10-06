import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div>
        <div className='left-content3'></div>
        <div className='right-content3'>
        <nav className='navbar-contaier3'>
            <ul className='ul3'>
                <li className='link3'><a className='a3' href="/home">HOME</a></li>
                <li className='link3'><a className='a3' href="/login">USER LOGIN</a></li>
                <li className='link3'><a className='a3' href="/register">USER SIGNUP</a></li>
                <li className='link3'><a className='a3' href="/admin/login">ADMIN LOGIN</a></li>
            </ul>
        </nav>
        </div>
    </div>
  )
}

export default Navbar
