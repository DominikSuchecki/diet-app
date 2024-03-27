import { lazy, Suspense, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import ProtectedRoute from './ProtectedRoute';
import NavbarUser from './NavbarUser';
import NavbarGuest from './NavbarGuest';

const ResetPassword = lazy(() => import('../pages/ResetPassword'));
const SetPassword = lazy(() => import('../pages/SetPassword'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Log = lazy(() => import('../pages/Log'));
const Diet = lazy(() => import('../pages/Diet'));
const AdjustDiet = lazy(() => import('../pages/AdjustDiet'));
const Calc = lazy(() => import('../pages/Calc'));
const Activity = lazy(() => import('../pages/Activity'));
const SignIn = lazy(() => import('../pages/SignIn'));
const Account = lazy(() => import('../pages/Account'));
const NotFound = lazy(() => import('../pages/NotFound'));

const MyRoute = ({ path, component }) => (
  <TransitionGroup>
    <CSSTransition
      in={true}
      timeout={300}
      classNames="my-transition"
      unmountOnExit
    >
      <Route path={path} component={component} />
    </CSSTransition>
  </TransitionGroup>
);

const Nav = () => {
  const { auth } = useContext(AuthContext);

  return (
    <>
      {auth ? <NavbarUser /> : <NavbarGuest />}
      <div className='container mt-4 mb-4'>
        <Suspense>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="log" element={<Log />} />
              <Route path="diet" element={<Diet />} />
              <Route path="adjust" element={<AdjustDiet />} />
              <Route path="account" element={<Account />} />
            </Route>

            <Route path="calculator" element={<Calc />} />
            <Route path="activity" element={<Activity />} />
            <Route path="signIn" element={<SignIn />} />
            <Route path="resetPassword" element={<ResetPassword />} />
            <Route path="setPassword" element={<SetPassword />} />

            <Route path="/" element={<SignIn />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default Nav;
