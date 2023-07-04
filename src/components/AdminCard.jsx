import { Link } from "react-router-dom";

function AdminCard(){

	return (
	<div className="card">
		<div className="card-body">
			<h5 className="card-title">Panel administratora</h5>
			<p className="card-text">Edytuj bazę produktów i przepisów.</p>
			<Link to="/products"><button type="button" className="btn btn-primary">Produkty</button></Link> <Link to="/recipes"><button type="button" className="btn btn-primary">Przepisy</button></Link>
		</div>
	</div>
    )
}

export default AdminCard;