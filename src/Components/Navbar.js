import React from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'

export const Navbar = () => {

    let location = useLocation();
    const navigate = useNavigate();

    const onLogout =()=>{
        navigate("/login");
        localStorage.removeItem('token');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand bg-danger rounded px-2 text-light" href="/">Job Portal</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Jobs</Link>
                        </li>
                    </ul>
                    { localStorage.getItem('token')?<button className="d-flex btn btn-info mx-1"onClick={()=>{onLogout()}}>Logout</button>:
                            <form className="d-flex" >
                                <Link className='btn btn-info mx-1' to="/login">Login</Link>
                                <Link className='btn btn-info mx-1' to="/signup">Sign Up</Link>
                            </form>
                        }
                </div>
            </div>
        </nav>
    )
}
