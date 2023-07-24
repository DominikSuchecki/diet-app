import { Routes, Route } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { useContext, lazy, Suspense } from 'react';
import ProtectedRoute from './ProtectedRoute';
import NavbarUser from './NavbarUser';
import NavbarGuest from './NavbarGuest';

const Activity = lazy(() => import('./Activity'));
const Calc = lazy(() => import('./Calc'));
const Log = lazy(() => import('./Log'));
const Diet = lazy(() => import('./Diet'));
const Dashboard = lazy(() => import('./Dashboard'));
const AdjustDiet = lazy(() => import('./AdjustDiet'));
const Products = lazy(() => import('./Products'));
const Recipes = lazy(() => import('./Recipes'));
const Recipe = lazy(() => import('./Recipe'));
const NotFound = lazy(() => import('./NotFound'));
const SignIn = lazy(() => import('./SignIn'));

function Nav() {
  const { auth } = useContext(AuthContext);

  return (
    <>
      {auth ? <NavbarUser /> : <NavbarGuest />}
      
      <Suspense>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<div className='container'> <Dashboard /> </div>} />
            <Route path="log" element={<div className='container'> <Log /> </div>} />
            <Route path="diet" element={<div className='container'> <Diet /> </div>} />
            <Route path="adjust" element={<div className='container'> <AdjustDiet /> </div>} />
            <Route path="recipes/details/:id" element={<div className='container'> <Recipe /> </div>} />
          </Route>

          <Route path="calculator" element={<div className='container'> <Calc /> </div>} />
          <Route path="activity" element={<div className='container'> <Activity /> </div>} />
          <Route path="products" element={<div className='container'> <Products /> </div>} />
          <Route path="recipes" element={<div className='container'> <Recipes /> </div>} />
          <Route path="signIn" element={<div className='container'> <SignIn /> </div>} />

          <Route path="*" element={<div className='container'> <NotFound /> </div>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default Nav;
