import { useState } from 'react';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../api';
import Alert from '../components/Alert';

const SetPassword = () => {

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(["",0])
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  const handleSet = () => {
    Axios.post(`${API_URL}/setPassword`, {password: password, token: token})
    .then((response) => {
      console.log(response.data)
      setMessage(["Password set",1])
    })
    .catch((error) => {
      console.log(error);
      setMessage(["Couldnt set password",0])
    });
  };

  return (
    <>
    <div className='d-flex justify-content-center'>
      <main className='col-lg-4 col-sm-12'>
      <div className="card shadow-4 p-4">
        <div className="tab-content">
          <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
              <div className="mb-2">
              <h2 className='fw-bold mb-3'>SET PASSWORD</h2>

              <div className="mb-2">
                <label className="form-label" htmlFor="registerPassword">Password</label>
                <input type="password" className="form-control" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\_=\+\-]).{8}$"/>
              </div>

              <div className="mb-4">
                <label className="form-label" htmlFor="registerRepeatPassword">Confirm password</label>
                <input type="password" id="registerRepeatPassword" className="form-control danger" onChange={(e) => setPassword(e.target.value)}/>
              </div>

              </div>

              <div className='d-flex justify-content-center'>
                <button type="submit" className="btn btn-primary mt-2 mb-2" onClick={handleSet}>Set</button>
              </div>
              <div className='mt-3 mb-3'>
                { message[0] != "" && <Alert content={message[0]} success={message[1]} /> }
              </div>
              </div>
              </div>
              </div>
      </main>
      </div>
    </>
  );
}

export default SetPassword;
