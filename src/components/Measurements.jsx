import { useState, useEffect } from 'react';
import Axios from 'axios';
import AnimationFade from './AnimationFade';

function Measurements(){

	const [measurements, setMeasurements] = useState([])	
	const formattedDate = new Date().toISOString().slice(0, 10);
	const [date, setDate] = useState(formattedDate)
	
	useEffect(() => {
		Axios.get("http://localhost/API/Measurements.php")
		.then((response) => {
			setMeasurements(response.data);
		})
		.catch((error) => {
			console.log(error);
		})
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault();
		Axios.post("http://localhost/API/Measurements.php")
		.then((response) => {
		})
		.catch((error) => {
			console.log(error);
		})
	}

    return(
	<AnimationFade>
		<form onSubmit={handleSubmit}>
		<div className='row'>
			<div className='col-lg col-sm-12 mt-3'>
				<label htmlFor="chest" className='form-label'>Klatka</label>
				<input type="number" className="form-control" name="chest" placeholder="cm" defaultValue={measurements[measurements.length-1]?.chest}/>
			</div>
			<div className='col-lg col-sm-12 mt-3'>
				<label htmlFor="waist" className='form-label'>Talia</label>
				<input type="number" className="form-control" name="waist" placeholder="cm" defaultValue={measurements[measurements.length-1]?.waist}/>
			</div>
			<div className='col-lg col-sm-12 mt-3'>
				<label htmlFor="arm" className='form-label'>Ramię</label>
				<input type="number" className="form-control" name="arm" placeholder="cm" defaultValue={measurements[measurements.length-1]?.arm}/>
			</div>
			<div className='col-lg col-sm-12 mt-3'>
				<label htmlFor="forearm" className='form-label'>Przedramię</label>
				<input type="number" className="form-control" name="forearm" placeholder="cm" defaultValue={measurements[measurements.length-1]?.forearm}/>
			</div>
			<div className='col-lg col-sm-12 mt-3'>
				<label htmlFor="hips" className='form-label'>Biodra</label>
				<input type="number" className="form-control" name="hips" placeholder="cm" defaultValue={measurements[measurements.length-1]?.hips}/>
			</div>
			<div className='col-lg col-sm-12 mt-3'>
				<label htmlFor="thigh" className='form-label'>Udo</label>
				<input type="number" className="form-control" name="thigh" placeholder="cm" defaultValue={measurements[measurements.length-1]?.thigh}/>
			</div>
			<div className='col-lg col-sm-12 mt-3'>
				<label htmlFor="calf" className='form-label'>Łydka</label>
				<input type="number" className="form-control" name="calf" placeholder="cm" defaultValue={measurements[measurements.length-1]?.calf}/>
			</div>
		</div>
		<div className='col-lg-4 col-sm-12 mt-3'>
			<div className="input-group">	
				<input type="date" className='form-control' defaultValue={date}/>
				<button className="btn btn-primary" type="submit">Zaaktualizuj</button>
			</div>
		</div>
		{measurements.length>0 && <span className="form-text d-block">Ostatnia aktualizacja: {measurements[measurements.length-1]?.measurementsDate}</span>}
		</form>
	</AnimationFade>
    )
}

export default Measurements;