import { useState } from 'react';
import Axios from 'axios';
import { API_URL } from '../api';
import Alert from '../components/Alert';

function ResetPassword() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(["",0])

  const handleReset = () => {
    Axios.post(`${API_URL}/resetPassword`, {email: email})
    .then((response) => {
      console.log(response.data)
      setMessage(["Password reset link sent",1])
    })
    .catch((error) => {
      console.log(error);
      setMessage(["Couldnt send reset password link", 0])
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
              <h2 className='fw-bold mb-3'>RESET PASSWORD</h2>
              <p className=''>Enter your email below, then mail with password rest link will be sent to you.</p>
                <label className="form-label" htmlFor="loginName">Email</label>
                <input type="text" id="loginName" className="form-control" onChange={(e) => { setEmail(e.target.value) } }/>
              </div>

              <div className='d-flex justify-content-center'>
                <button className="btn btn-primary mt-2 mb-2" onClick={handleReset}>Send</button>
              </div>
              </div>
              <div className='mt-3 mb-3'>
                { message[0] != "" && <Alert content={message[0]} success={message[1]} /> }
              </div>
              </div>
              </div>
      </main>
      </div>
    </>
  );
}

export default ResetPassword;
