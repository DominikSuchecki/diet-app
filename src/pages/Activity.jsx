import { useState, useEffect, useContext } from 'react'
import Axios from 'axios'
import { WeightContext } from '../contexts/WeightProvider'
import { AuthContext } from '../contexts/AuthProvider';
import Alert from '../components/Alert';
import { ActivityContext } from '../contexts/ActivityProvider';
import { API_URL } from '../api';

const Activity = () => {
	const { lastWeight } = useContext(WeightContext);
	const { token, auth } = useContext(AuthContext);
	const { update, setUpdate } = useContext(ActivityContext);
	const [message, setMessage] = useState(['',0]);

	const MET = {
		"Run": 5,
		"Walk": 3,
		"Cycling": 6,
		"Swimming": 6,
		"Jump rope": 9,
		"Dance": 5,
		"Weight training": 6,
		"Martial arts": 10
	}

	const [weightVal, setWeightVal] = useState(80);
	const [activity, setActivity] = useState('Run');
	const [duration, setDuration] = useState(0);
	const [caloriesBurnt, setCaloriesBurnt] = useState(0);
	const [description, setDescription] = useState("");
	const formattedDate = new Date().toISOString().slice(0, 10)
	const [date, setDate] = useState(formattedDate)

	useEffect(() => {
		setCaloriesBurnt(((MET[activity] * 3.5 * weightVal / 200) * duration).toFixed(0))
	}, [weightVal,activity,duration])

	const handleSubmit = (e) => {
		e.preventDefault();
		Axios.post(`${API_URL}/activity`, {
			date: date,
			type: activity,
			duration: duration,
			calories_burnt: caloriesBurnt,
			description: description
		},
		{
			headers: {Authorization: `Bearer ${token}`},
		})
		.then((response) => {
			if(response.status == 201){
				setMessage(["Activity created", 1])
			}
			setUpdate(!update);
			console.log(response);
		})
		.catch((error) => {
			setMessage(["Couldnt create activity", 0])
			console.log(error);
		});
	};

    return(
	<>
		<h1 className='col-lg-4 col-sm-12 fw-bold'>ACTIVITY</h1>
		<form onSubmit={handleSubmit}>
			<div className='row'>
			<div className='col-lg-3 col-sm-12'>
					<label htmlFor="weight" className='form-label mt-3'>Weight</label>
					<input className="form-control" type="number" name="weight" placeholder="kg" onChange={(e) => setWeightVal(e.target.value)} defaultValue={lastWeight} required/>
				</div>
				<div className='col-lg-3 col-sm-12'>
					<label htmlFor="activity" className='form-label mt-3'>Activity</label>
					<select className="form-control" name="activity" required onChange={(e) => setActivity(e.target.value)}>
						<option value="Run">Run</option>
						<option value="Walk">Walk</option>
						<option value="Cycling">Cycling</option>
						<option value="Swimming">Swimming</option>
						<option value="Jump rope">Jump rope</option>
						<option value="Dance">Dance</option>
						<option value="Weight training">Weight training</option>
						<option value="Martial arts">Martial arts</option>
					</select>
				</div>
				<div className='col-lg-3 col-sm-12'>
					<label htmlFor="trainingDuration" className='form-label mt-3'>Duration</label>
					<input className="form-control" type="number" name="trainingDuration" placeholder="min" required onChange={(e) => setDuration(Number(e.target.value))}/>
				</div>
				<div className='col-lg-3 col-sm-12'>
					<label htmlFor="caloriesBurnt" className='form-label mt-3'>Calories burnt</label>
					<input className="form-control" type="number" name="caloriesBurnt" placeholder="kcal" readOnly value={caloriesBurnt}/>
					</div>
			</div>
			{ auth &&
			<>
				<div className='col col-lg-6 col-sm-12'>
				<label htmlFor="description" className='form-label mt-3'>Notes</label>
				<textarea className="form-control" name="description" placeholder="4x10 Bench press 80kg..." rows={4} onChange={(e) => setDescription(e.target.value)}/>
				<div className="input-group mt-3 mb-3">	
					<input type="date" className='form-control' defaultValue={date} onChange={(e) => setDate(e.target.value)}/>
					 <button type="submit" className="btn btn-primary">Save</button>
				</div>
			</div>
			<div className='mb-8'>
				{message[0] !== "" && <Alert content={message[0]} success={message[1]} />}
			</div>
			</>
			}
		</form>
	</>
    )
}

export default Activity;