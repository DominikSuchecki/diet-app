import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { useContext } from 'react';

const NavbarUser = () => {

  const { logout } = useContext(AuthContext);

  return (
  <>
    <nav className="navbar navbar-expand bg-light d-none d-md-flex sticky-top">
    <div className="container-fluid justify-content-between">
      <div>
        <NavLink to="/" className='link-inactive'><span className='fw-bold fs-1'>Diet app</span></NavLink>
      </div>
      <div>
        <ul className="navbar-nav text-center">
          <li className="nav-item">
          <NavLink className="nav-link" to="dashboard"><i className="fa-regular fa-home fa-xl"></i><p>DASHBOARD</p></NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="diet"><i className="fa-regular fa-utensils fa-xl"></i><p>DIET</p></NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="activity"><i className="fa-regular fa-dumbbell fa-xl"></i><p>ACTIVITY</p></NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="log"><i className="fa-regular fa-calendar fa-xl"></i><p>LOG</p></NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link link-inactive" data-mdb-toggle="modal" data-mdb-target="#logoutModal"><i className="fa-regular fa-circle-arrow-right fa-xl"></i><p>LOGOUT</p></NavLink>
          </li>
        </ul>
        </div>
    </div>
    </nav>

    <nav className="navbar navbar-expand bg-light fixed-bottom d-sm-flex d-md-none">
    <div className="container-fluid justify-content-center">
      <ul className="navbar-nav text-center justify-content-evenly d-flex w-100">
        <li>
          <NavLink className="nav-link" to="diet"><i className="fa-regular fa-utensils fa-xl"></i><p>DIET</p></NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="activity"><i className="fa-regular fa-dumbbell fa-xl"></i><p>ACTIVITY</p></NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="dashboard"><i className="fa-regular fa-home fa-xl"></i><p>DASHBOARD</p></NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="log"><i className="fa-regular fa-calendar fa-xl"></i><p>LOG</p></NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link link-inactive" data-mdb-toggle="modal" data-mdb-target="#logoutModal"><i className="fa-regular fa-circle-arrow-right fa-xl"></i><p>LOGOUT</p></NavLink>
        </li>
      </ul>
    </div>
    </nav>

    <div className="modal fade" id="logoutModal" tabIndex={-1} aria-labelledby="logoutModal" aria-hidden="true">
		<div className="modal-dialog" style={{maxWidth:400}}>
			<div className="modal-content">
			<div className="modal-header">
				<h5 className="modal-title" id="adjustModal">Are you sure?</h5>
				<button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
			</div>
			<div className="modal-body">
        <div>
          
        </div>
        <div className='d-flex justify-content-between'>
        <button type="button" className="btn btn-primary d-block" data-mdb-dismiss="modal">Return</button>
        <button type="button" className="btn btn-danger d-block" data-mdb-dismiss="modal" onClick={() => logout()}>Logout</button>
        </div>
      </div>
			</div>
		</div>
	</div>
  </>
  )
}

export default NavbarUser;