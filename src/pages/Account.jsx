import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import Axios from 'axios';
import { API_URL } from "../api";
import Alert from "../components/Alert";

const Account = () => {

	const { token } = useContext(AuthContext) 

	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [newEmail, setNewEmail] = useState("");
	const [message, setMessage] = useState(["", 0]);

	const handleUpdatePassword = () => {
		if (newPassword !== confirmNewPassword) {
			setMessage(["New password and confirmation password do not match", 0]);
			return;
		}

		Axios.put(`${API_URL}/updatePassword`, {
			current_password: currentPassword,
			new_password: newPassword,
		},
		{
			headers: {Authorization: `Bearer ${token}`},
		}
		)
		.then((response) => {
			setMessage(["Password updated", 1]);
			console.log(response);
		})
		.catch((error) => {
			setMessage(["Could not update password", 0]);
			console.log(error);
		});
	}
	
	const handleUpdateEmail = () => {
		Axios.put(`${API_URL}/updateEmail`, {
			email: newEmail,
			current_password: currentPassword,
		},
		{
			headers: {Authorization: `Bearer ${token}`},
		}
		)
		.then((response) => {
			setMessage(["Email updated", 1]);
			console.log(response);
		})
		.catch((error) => {
			setMessage(["Could not update email", 0]);
			console.log(error);
		});
	}	

	return (
		<>
		<h1 className='fw-bold'>ACCOUNT</h1>

		<div className="row">
			<div className="col-lg-4 col-sm-12 mt-3 mb-3">
				<div className="card">
					<div className="card-body">
					<h5 className="card-title">Change password</h5>
						<div className="mb-2">
							<label className="form-label" htmlFor="currentPassword">Current Password</label>
							<input type="password" id="currentPassword" className="form-control" onChange={(e) => setCurrentPassword(e.target.value)}/>
						</div>
						<div className="mb-2">
							<label className="form-label" htmlFor="newPassword">New Password</label>
							<input type="password" id="newPassword" className="form-control" onChange={(e) => setNewPassword(e.target.value)} />
						</div>
						<div className="mb-4">
							<label className="form-label" htmlFor="confirmNewPassword">Confirm New Password</label>
							<input type="password" id="confirmNewPassword" className="form-control" onChange={(e) => setConfirmNewPassword(e.target.value)}/>
						</div>
						<button type="button" className="btn btn-primary mb-3" onClick={handleUpdatePassword}>Change</button>
					</div>
				</div>
			</div>

			<div className="col-lg-4 col-sm-12 mt-3 mb-3">
				<div className="card">
					<div className="card-body">
					<h5 className="card-title">Change email</h5>
						<div className="mb-2">
							<label className="form-label" htmlFor="newEmail">New Email</label>
							<input type="email" id="newEmail" className="form-control" onChange={(e) => setNewEmail(e.target.value)}/>
						</div>		
						<div className="mb-4">
							<label className="form-label" htmlFor="currentPasswordEmail">Current Password</label>
							<input type="password" id="currentPasswordEmail" className="form-control" onChange={(e) => setCurrentPassword(e.target.value)}/>
						</div>
						<button type="button" className="btn btn-primary mb-3" onClick={handleUpdateEmail}>Change</button>
					</div>
				</div>
			</div>
		</div>
		<div className="mb-8">
			{message[0] != "" && <Alert content={message[0]} success={message[1]} />}
		</div>
		</>
	)
}

export default Account;