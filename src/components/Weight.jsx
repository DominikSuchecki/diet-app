import {useContext, useState } from 'react';
import Axios from 'axios';
import { WeightContext } from '../contexts/WeightProvider';
import { AuthContext } from '../contexts/AuthProvider';
import InfoAlert from '../components/InfoAlert';
import Alert from './Alert';
import { API_URL } from '../api';

const Weight = () => {
	const { weight, lastWeight, update, setUpdate } = useContext(WeightContext)
	const { token } = useContext(AuthContext)

	const [newWeight, setNewWeight] = useState(1)
	const formattedDate = new Date().toISOString().slice(0, 10)
	const [date, setDate] = useState(formattedDate)
	const [message, setMessage] = useState(["",0])

	const handleSubmit = () => {
		Axios.post(`${API_URL}/weight`, {
			weight: newWeight,
			date: date
		},
		{
			headers : {
				Authorization : `Bearer ${token}`
			}
		}
		)
		.then((response) => {
			setMessage(["Weight created", 1])
			setUpdate(!update)
			console.log(response);
		})
		.catch((error) => {
			setMessage(["Couldnt create weight", 0])
			console.log(error);
		})
	};

	const deleteWeight = (id) => {
		Axios.delete(`${API_URL}/weight/${id}`, 
		{
			headers : {
				Authorization : `Bearer ${token}`
			}
		}
		)
		.then((response) => {
			if(response.status == 204){
				setMessage(["Weight deleted", 1])
				setUpdate(!update)
			}
			console.log(response);
		})
		.catch((error) => {
			setMessage(["Couldnt delete weight", 0])
			console.log(error);
		})
	}

    return(
	<>
	<div>
		<div className='col'>
			<label htmlFor="weight" className='form-label'>Weight</label>
			<input type="number" className="form-control" name="weight" placeholder="kg" min="1" onChange={(e) => setNewWeight(e.target.value)} defaultValue={lastWeight}/>
		</div>
		<div className='row mb-3'>
		<div className="input-group mt-3 col">	
				<input type="date" className='form-control' defaultValue={date} onChange={(e) => setDate(e.target.value)}/>
				<button className="btn btn-primary" onClick={handleSubmit}>Save</button> <button className="btn btn-secondary" data-mdb-toggle="modal" data-mdb-target="#weightModal">Browse</button>
		</div>
		<div className='col'>
			
		</div>
		</div>
		{ message[0] != "" && <Alert content={message[0]} success={message[1]} /> }
	</div>

	<div className="modal fade" id="weightModal" tabIndex={-1} aria-labelledby="weightModal" aria-hidden="true">
	<div className="modal-dialog" style={{maxWidth:400}}>
		<div className="modal-content">
		<div className="modal-header">
			<h5 className="modal-title" id="weightModal">Weight log</h5>

			<button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
		</div>
		<div className="modal-body">
		<div>
		{weight.length > 0 ? (
			<>
				<div className='table-responsive'>
					<table className='table table-striped table-sm'>
					<thead>
						<tr>
							<th className='col-4'>Date</th>
							<th className='col-4'>Weight</th>
							<th className='col-2'></th>
						</tr>
					</thead>
					<tbody>
						{weight.map(w => (
						<tr key={w.id}>
							<td>{w.date}</td>
							<td>{w.weight}</td>
							<td>
							<button className='btn btn-danger btn-floating' onClick={() => deleteWeight(w.id)}>
								<i className='fa-solid fa-trash'></i>
							</button>
							</td>
						</tr>
						))}
					</tbody>
					</table>
				</div>
				{message[0] !== "" && <Alert content={message[0]} success={message[1]} />}
			</>
			) : (
			<InfoAlert content="No data for weight history" />
			)}
			</div>
	<div className='d-flex justify-content-between mt-3'>
	<button type="button" className="btn btn-primary d-block" data-mdb-dismiss="modal">Back</button>
	</div>
	</div>
			</div>
		</div>
	</div>
	</>
    )
}

export default Weight;