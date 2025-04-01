import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'



const Navbar = () => {

    const handleLogout = () => {
        localStorage.removeItem('token');

    }
    let location = useLocation();
    useEffect(() => {

    }, [location]);
    return (
        <nav className="navbar navbar-expand bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid justify-content-start">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className={`nav-link ${location.pathname === '/' ? "active" : ''}`} aria-current="page" to="/">Home</Link>
                        <Link className={`nav-link ${location.pathname === '/about' ? "active" : ''}`} to="/About">About</Link>

                    </div>
                </div>
                {!localStorage.getItem('token') ? <form className='d-felex'>
                    <Link className="btn btn-success mx-2" to="/login" role="button">Login</Link>
                    <Link className="btn btn-info mx-2" to="/signup" role="button">Signup</Link>
                </form> : <Link className="btn btn-warning mx-2" to="/login" onClick={handleLogout} >Logout</Link>}
            </div>
        </nav>
    )
}

export default Navbar
