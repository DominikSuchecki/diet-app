import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from "../contexts/AuthProvider";

function UserCard(){

	const { user } = useContext(AuthContext);

	return (
	<div className="card">
		<div className="card-body">
			<h5 className="card-title">Witaj, { user }</h5>
			<p className="card-text">Cieszymy się, że dołączyłeś do naszej społeczności! Nasze narzędzie zostało stworzone z myślą o Tobie, abyś mógł skutecznie monitorować swoją dietę oraz trening.</p>
			<Link to="/account"><button type="button" className="btn btn-primary">Konto</button></Link>
		</div>
	</div>
    )
}

export default UserCard;