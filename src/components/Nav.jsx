import { Routes, Route } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { useContext, lazy, Suspense } from 'react';
import ProtectedRoute from './ProtectedRoute';
import NavbarUser from './NavbarUser';
import NavbarGuest from './NavbarGuest';
import Hero from './Hero';

const Account = lazy(() => import('./Account'));
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

      <div className='container mt-4 mb-4'>
        <Suspense>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<Dashboard />}/>
              <Route path="log" element={<Log /> }/>
              <Route path="diet" element={<Diet /> } />
              <Route path="adjust" element={<AdjustDiet /> } />
              <Route path="recipes/details/:id" element={<Recipe /> } />
              <Route path="account" element={<Account />} />
            </Route>

            <Route path="calculator" element={<Calc /> } />
            <Route path="activity" element={<Activity /> } />
            <Route path="products" element={<Products /> } />
            <Route path="recipes" element={<Recipes /> } />
            <Route path="signIn" element={<SignIn /> } />

            <Route path="/" element={<Hero />} />
            <Route path="*" element={<NotFound /> } />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default Nav;
