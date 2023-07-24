import { useState, useContext } from 'react';
import Axios from 'axios';
import AnimationFade from './AnimationFade';
import { AuthContext } from '../contexts/AuthProvider';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function SignIn() {

  const {setId, setRole, setAuth, setUser} = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    Axios.post("http://localhost/API/Login.php", { Username: username, Password: password })
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
        
        navigate('/');
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
    Axios.post("http://localhost/API/Register.php", { Username: username, Password: password })
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleCheck = () => {
    setRememberMe(!rememberMe)
  }

  return (
    <AnimationFade>
    <div className='d-flex justify-content-center'>
      <main className='col-lg-4 col-sm-12'>

        <div>
          <ul className="nav nav-pills nav-justified mb-4" id="ex1" role="tablist">
            <li className="nav-item" role="presentation">
              <a className="nav-link active shadow-4" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                aria-controls="pills-login" aria-selected="true">Logowanie</a>
            </li>
            <li className="nav-item" role="presentation">
              <a className="nav-link shadow-4" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
                aria-controls="pills-register" aria-selected="false">Rejestracja</a>
            </li>
          </ul>
        </div>

      <div className="card shadow-4 p-4">
        <div className="tab-content">
          <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
            <form onSubmit={handleLogin}>
              <div className="mb-2">
                <label className="form-label" htmlFor="loginName">Nazwa użytkownika</label>
                <input type="text" id="loginName" className="form-control" onChange={(e) => setUsername(e.target.value)}/>
              </div>

              <div className="mb-4">
                <label className="form-label" htmlFor="loginPassword">Hasło</label>
                <input type="password" id="loginPassword" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="form-check mb-md-0">
                    <label className="form-check-label" htmlFor="loginCheck">Zapamiętaj mnie</label>
                    <input className="form-check-input" type="checkbox" checked={rememberMe} onChange={handleCheck} id="loginCheck" />
                  </div>
                </div>
              </div>
              <div className='d-flex justify-content-center'>
                <button type="submit" className="btn btn-primary mb-4">Zaloguj się</button>
              </div>
            </form>
          </div>
          <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
            <form onSubmit={handleRegister}>

              <div className="mb-2">
                <label className="form-label" htmlFor="registerUsername">Nazwa użytkownika</label>
                <input type="text" id="registerUsername" className="form-control" onChange={(e) => setUsername(e.target.value)}/>
              </div>

              <div className="mb-2">
                <label className="form-label" htmlFor="registerPassword">Hasło</label>
                <input type="password" id="registerPassword" className="form-control" />
              </div>

              <div className="mb-4">
                <label className="form-label" htmlFor="registerRepeatPassword">Powtórz hasło</label>
                <input type="password" id="registerRepeatPassword" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className='d-flex justify-content-center'>
                <button type="submit" className="btn btn-primary mb-3">Zarejestruj się</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      </main>
    </div>
    </AnimationFade>
  );
}

export default SignIn;
