import { Link } from "react-router-dom";

function ConfigCard(){

	return (
	<div className="card">
		<div className="card-body">
			<h5 className="card-title">Konfiguracja</h5>
			<p className="card-text">Ustal swoje zapotrzebowanie kaloryczne.</p>
			<Link to="/calculator"><button type="button" className="btn btn-primary">Kalkulator</button></Link> <Link to="/adjust"><button type="button" className="btn btn-primary">Dostosuj</button></Link>
		</div>
	</div>
    )
}

export default ConfigCard;