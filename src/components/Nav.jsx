import { Routes, Route } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { useContext } from 'react';
import Calc from './Calc';
import Activity from './Activity';
import Log from './Log';
import Diet from './Diet';
import Dashboard from './Dashboard';
import AdjustDiet from './AdjustDiet';
import Products from './Products';
import Recipes from './Recipes';
import Recipe from './Recipe';
import NotFound from './NotFound';
import ProtectedRoute from './ProtectedRoute';
import NavbarUser from './NavbarUser';
import NavbarGuest from './NavbarGuest';
import SignIn from './SignIn';

function Nav() {

  const { auth } = useContext(AuthContext);

  return (
  <>
    { auth ? <NavbarUser/> : <NavbarGuest/>}

    <Routes>
      <Route element={<ProtectedRoute/>}>
        <Route path="dashboard" element={<div className='container'> <Dashboard /> </div>}/>
        <Route path="log" element={<div className='container'>  <Log /> </div>} />
        <Route path="diet" element={<div className='container'>  <Diet /> </div>} />
        <Route path="adjust" element={<div className='container'> <AdjustDiet /> </div>} />
        <Route path="recipes/details/:id" element={<div className='container'> <Recipe/> </div>}/>
      </Route>

      <Route path="calculator" element={<div className='container'>  <Calc /> </div>} />
      <Route path="activity" element={<div className='container'>  <Activity /> </div>} />
      <Route path="products" element={<div className='container'> <Products/> </div>}/>
      <Route path="recipes" element={<div className='container'> <Recipes/> </div>}/>
      <Route path="signIn" element={<div className='container'> <SignIn /> </div>} />

      <Route path="*" element={<div className='container'> <NotFound/> </div>}/>
    </Routes>
  </>
  )
}

export default Nav;