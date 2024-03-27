import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { AuthContext } from '../contexts/AuthProvider';
import Cookies from 'js-cookie';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import { API_URL } from '../api';

const SignIn = () => {
  const { auth, setAuth, setToken} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [message, setMessage] = useState(["", 0])
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    Axios.post(`${API_URL}/login`, { email: email, password: password })
    .then((response) => {
      if (response.status === 200) {
        const { token, user } = response.data;
        setAuth(true);
        setToken(token);
        if (rememberMe) {
          const user = JSON.stringify({ auth: true, token: token });
          Cookies.set('User', user);
        }
        setMessage(['Success', 1])
        navigate('/dashboard');
      }
    })
    .catch((error) => {
      if (error.response.status == 403) {
        setMessage(['Email is not verified', 0])
      } else {
        setMessage(['Invalid data', 0])
      }
      console.log(error);
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage(["Passwords do not match", 0]);
      return;
    }
    Axios.post(`${API_URL}/register`, { email: email, password: password })
    .then((response) => {
      if (response.status == 201) {
        setMessage(['User created', 1])
      }
    })
    .catch((error) => {
      if (error.response.status == 403) {
        setMessage(['User with that email already exists', 0])
      } else {
        setMessage(['Registration error', 0])
      }
    });
  };

  const handleCheck = () => {
    setRememberMe(!rememberMe)
  }

  useEffect(() => {
    auth && navigate('/dashboard');
  }, [])

  return (
    <>
      <div className='d-flex justify-content-center mb-6'>
        <main className='col-lg-4 col-sm-12'>
          <div>
            <ul className="nav nav-pills nav-justified mb-4" id="ex1" role="tablist">
              <li className="nav-item" role="presentation">
                <a className="nav-link active shadow-4" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                  aria-controls="pills-login" aria-selected="true">Sign in</a>
              </li>
              <li className="nav-item" role="presentation">
                <a className="nav-link shadow-4" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
                  aria-controls="pills-register" aria-selected="false">Sign up</a>
              </li>
            </ul>
          </div>
          <div className="card shadow-4 p-4">
            <div className="tab-content">
              <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                <form onSubmit={handleLogin}>
                  <div className="mb-2">
                    <label className="form-label" htmlFor="loginName">Email</label>
                    <input type="text" id="loginName" className="form-control" onChange={(e) => { setEmail(e.target.value) }}/>
                  </div>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="loginPassword">Password</label>
                    <input type="password" id="loginPassword" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                  <div className="row mb-4 mt-4">
                    <div className="col-md-6">
                      <div className="form-check mb-md-0">
                        <label className="form-check-label" htmlFor="loginCheck">Remember me</label>
                        <input className="form-check-input" type="checkbox" checked={rememberMe} onChange={handleCheck} id="loginCheck" />
                      </div>
                    </div>
                  </div>
                  {message[0] != "" && <Alert content={message[0]} success={message[1]} />}
                  <div className='d-flex justify-content-center'>
                    <button type="submit" className="btn btn-primary mb-4">Sign in</button>
                  </div>
                  <div className='d-flex justify-content-center'>
                    <Link to="/resetPassword"><button className="btn btn-secondary mb-2">Forgot password</button></Link>
                  </div>
                </form>
              </div>
              <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                <form onSubmit={handleRegister}>
                  <div className="mb-2">
                    <label className="form-label" htmlFor="registerEmail">Email</label>
                    <input type="email" id="registerEmail" className="form-control" onChange={(e) => setEmail(e.target.value)}/>
                  </div>
                  <div className="mb-2">
                    <label className="form-label" htmlFor="registerPassword">Password</label>
                    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\_=\+\-]).{8}$"/>
                  </div>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="registerRepeatPassword">Confirm password</label>
                    <input type="password" id="registerRepeatPassword" className="form-control" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\_=\+\-]).{8}$" onChange={(e) => setConfirmPassword(e.target.value)}/>
                  </div>
                  {message[0] != "" && <Alert content={message[0]} success={message[1]} />}
                  <div className='d-flex justify-content-center'>
                    <button type="submit" className="btn btn-primary mb-3">Sign up</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default SignIn;
