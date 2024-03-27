import { NavLink } from 'react-router-dom';

const NavbarGuest = () => {
  
  return (
  <>
  <nav className="navbar navbar-expand bg-light d-none d-md-flex">
    <div className="container-fluid justify-content-between">
      <div>
        <NavLink to="/" className='link-inactive'><span className='fw-bold fs-1'>Diet app</span></NavLink>
      </div>
      <div>
        <ul className="navbar-nav text-center">
          <li className="nav-item">
            <NavLink className="nav-link" to="calculator"><i className="fa-regular fa-xl fa-calculator"></i><p>CALCULATOR</p></NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="activity"><i className="fa-regular fa-dumbbell fa-xl"></i><p>ACTIVITY</p></NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="signIn"><i className="fa-regular fa-user fa-xl"></i><p>SIGN IN</p></NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <nav className="navbar navbar-expand bg-light fixed-bottom d-sm-flex d-md-none">
    <div className="container-fluid justify-content-center">
      <ul className="navbar-nav text-center justify-content-evenly d-flex w-100">
        <li className="nav-item">
          <NavLink className="nav-link" to="calculator"><i className="fa-regular fa-xl fa-calculator"></i><p>CALCULATOR</p></NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="signIn"><i className="fa-regular fa-user fa-xl"></i><p>SIGN IN</p></NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="activity"><i className="fa-regular fa-dumbbell fa-xl"></i><p>ACTIVITY</p></NavLink>
        </li>
      </ul>
    </div>
  </nav>
  </>
  )
}

export default NavbarGuest;