import {useContext, useState } from 'react';
import Axios from 'axios';
import { WeightContext } from '../contexts/WeightProvider';
import { AuthContext } from '../contexts/AuthProvider';

function Weight(){
	const { weight } = useContext(WeightContext)
	const { id } = useContext(AuthContext)

	const [newWeight, setNewWeight] = useState(0)
	const formattedDate = new Date().toISOString().slice(0, 10)
	const [date, setDate] = useState(formattedDate)

	const handleSubmit = (e) => {
		e.preventDefault();
		Axios.post("http://localhost/API/Weight.php", {
			id: id,
			weight: newWeight,
			date: '2020-03-11'
		})
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.log(error);
		})
	};

    return(
	<div>
		<form onSubmit={handleSubmit}>
		<div className='col'>
			<label htmlFor="weight" className='form-label'>Masa ciała</label>
			<input type="number" className="form-control" name="weight" placeholder="kg" onChange={(e) => setNewWeight(e.target.value)} defaultValue={weight[weight.length-1]?.Weight}/>
		</div>
		<div className="input-group mt-3 col">	
				<input type="date" className='form-control' defaultValue={date}/>
				<button className="btn btn-primary" type="submit">Zaaktualizuj</button>
		</div>
		</form>
		{weight.length>0 && <span className="form-text">Ostatnia aktualizacja: {weight[weight.length-1]?.Date}</span>}
	</div>
    )
}

export default Weight;