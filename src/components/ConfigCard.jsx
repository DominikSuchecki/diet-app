import { Link } from "react-router-dom";

const ConfigCard = () => {
	return (
	<div className="card mt-3">
		<div className="card-body">
			<h5 className="card-title">Config</h5>
			<p className="card-text">Calculate your calorie intake demand.</p>
			<div>
				<div className="mb-3">
					<Link to="/calculator"><button type="button" className="btn btn-primary">Calculator</button></Link>
				</div>
				<div>
					<Link to="/adjust"><button type="button" className="btn btn-primary">Adjust config</button></Link>
				</div>
			</div>
		</div>
	</div>
    )
}

export default ConfigCard;