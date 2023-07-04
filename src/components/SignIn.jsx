import { useState, useContext } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import AnimationFade from './AnimationFade';
import { AuthContext } from '../contexts/AuthProvider';
import Cookies from 'js-cookie';

function SignIn() {

  const {setId, setRole, setAuth, setUser} = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    Axios.post("http://localhost/API/Login.php", {
      Username: username,
      Password: password
    })
    .then((response) => {
      if( response.data.Response === "OK"){
        setId(response.data.Id);
        setRole(response.data.Role);
        setUser(response.data.Username);
        setAuth(true);

        if(rememberMe){
        const userData = JSON.stringify({
          id: response.data.Id,
          user: response.data.Username,
          role: response.data.Role,
          auth: true
        });
        Cookies.set('userData', userData);
        }

        window.location.href = '/';
      }
      else{
        setMessage(response.data.Response);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    Axios.post("http://localhost/API/Register.php", {
      Username: username,
      Password: password
    })
    .then((response) => {
      setMessage(response.data.Response);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <AnimationFade>
    <main className='col-lg-6 col-sm-12'>
      <div className="tab-content">
        <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
          <form onSubmit={handleLogin}>
            <div className="form-outline mb-4">
              <input type="text" id="loginName" className="form-control" onChange={(e) => setUsername(e.target.value)}/>
              <label className="form-label" for="loginName">Nazwa użytkownika</label>
            </div>

            <div className="form-outline mb-4">
              <input type="password" id="loginPassword" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
              <label className="form-label" for="loginPassword">Hasło</label>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <div className="form-check mb-3 mb-md-0">
                  <input className="form-check-input" type="checkbox" value="" id="loginCheck" />
                  <label className="form-check-label" for="loginCheck">Zapamiętaj mnie</label>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">Zaloguj się</button>
          </form>
        </div>
        <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
          <form onSubmit={handleRegister}>

            <div className="form-outline mb-4">
              <input type="text" id="registerUsername" className="form-control" onChange={(e) => setUsername(e.target.value)}/>
              <label className="form-label" for="registerUsername">Nazwa użytkownika</label>
            </div>

            <div className="form-outline mb-4">
              <input type="password" id="registerPassword" className="form-control" />
              <label className="form-label" for="registerPassword">Hasło</label>
            </div>

            <div className="form-outline mb-4">
              <input type="password" id="registerRepeatPassword" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
              <label className="form-label" for="registerRepeatPassword">Powtórz hasło</label>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-3">Zarejestruj się</button>
          </form>
        </div>
      </div>

      <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
        <li className="nav-item" role="presentation">
          <a className="nav-link active" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
            aria-controls="pills-login" aria-selected="true">Logowanie</a>
        </li>
        <li className="nav-item" role="presentation">
          <a className="nav-link" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
            aria-controls="pills-register" aria-selected="false">Rejestracja</a>
        </li>
      </ul>
    </main>
    </AnimationFade>
  );
}

export default SignIn;
