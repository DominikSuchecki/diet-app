import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from "../contexts/AuthProvider";

const UserCard = () => {

	return (
	<div className="card">
		<div className="card-body">
			<h5 className="card-title">Hello!</h5>
			<p className="card-text">This tool was created to help you keep track of your diet and training.</p>
			<Link to="/account"><button type="button" className="btn btn-primary">Account</button></Link>
		</div>
	</div>
    )
}

export default UserCard;