import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { useContext } from 'react';

function NavbarUser() {

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  }

  return (
  <>
    <nav className="navbar navbar-expand bg-light d-none d-md-flex sticky-top">
    <div className="container-fluid justify-content-between">
      <div>
        <NavLink to="/" className='link-inactive'><span className='fw-bold fs-1'>4ACTIVE</span></NavLink>
      </div>
      <div>
        <ul className="navbar-nav text-center">
          <li className="nav-item">
          <NavLink className="nav-link" to="dashboard"><i className="fa-solid fa-home fa-xl"></i><p>PULPIT</p></NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="diet"><i className="fa-solid fa-utensils fa-xl"></i><p>DIETA</p></NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="activity"><i className="fa-solid fa-dumbbell fa-xl"></i><p>TRENING</p></NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="log"><i className="fa-solid fa-calendar fa-xl"></i><p>DZIENNIK</p></NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link link-inactive" data-mdb-toggle="modal" data-mdb-target="#logutModal"><i className="fa-solid fa-circle-arrow-right fa-xl"></i><p>WYLOGUJ</p></NavLink>
          </li>
        </ul>
        </div>
    </div>
    </nav>

    <nav className="navbar navbar-expand bg-light fixed-bottom d-sm-flex d-md-none">
    <div className="container-fluid justify-content-center">
      <ul className="navbar-nav text-center justify-content-evenly d-flex w-100">
        <li className="nav-item">
        <NavLink className="nav-link" to="dashboard"><i className="fa-solid fa-home fa-xl"></i><p>PULPIT</p></NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="diet"><i className="fa-solid fa-utensils fa-xl"></i><p>DIETA</p></NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="activity"><i className="fa-solid fa-dumbbell fa-xl"></i><p>TRENING</p></NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="log"><i className="fa-solid fa-calendar fa-xl"></i><p>DZIENNIK</p></NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link link-inactive" data-mdb-toggle="modal" data-mdb-target="logutModal"><i className="fa-solid fa-circle-arrow-right fa-xl"></i><p>WYLOGUJ</p></NavLink>
        </li>
      </ul>
    </div>
    </nav>

    <div className="modal fade" id="logutModal" tabIndex={-1} aria-labelledby="logutModal" aria-hidden="true">
		<div className="modal-dialog" style={{maxWidth:400}}>
			<div className="modal-content">
			<div className="modal-header">
				<h5 className="modal-title" id="adjustModal">Chcesz się wylogować?</h5>
				<button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
			</div>
			<div className="modal-body">
        <div>
          
        </div>
        <div className='d-flex justify-content-between'>
        <button type="button" className="btn btn-primary d-block" data-mdb-dismiss="modal">Powrót</button>
        <button type="button" className="btn btn-danger d-block" data-mdb-dismiss="modal" onClick={handleLogout}>Wyloguj</button>
        </div>
      </div>
			</div>
		</div>
	</div>
  </>
  )
}

export default NavbarUser;