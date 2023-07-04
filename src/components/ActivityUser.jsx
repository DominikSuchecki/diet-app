import { useState, useEffect, useContext } from 'react'
import Axios from 'axios'
import Weight from './Weight'
import AnimationFade from './AnimationFade'
import { WeightContext } from '../contexts/WeightProvider'

function ActivityUser(){
	const { weight } = useContext(WeightContext);

	const MET = {
		"Bieg": 5,
		"Spacer": 3,
		"JazdaNaRowerze": 6,
		"Plywanie": 6,
		"Skakanka": 9,
		"Taniec": 5,
		"TreningSilowy": 6,
		"SztukiWalki": 10
	}

	const [activity, setActivity] = useState('Bieg');
	const [duration, setDuration] = useState(0);
	const [caloriesBurnt, setCaloriesBurnt] = useState(0);
	const [description, setDescription] = useState('');

	useEffect(() => {
		weight[0] && setCaloriesBurnt((MET[activity] * 3.5 * weight[0].Weight / 200) * duration)
	}, [weight,activity,duration])

	const handleSubmit = (e) => {
		e.preventDefault();
		Axios.post("http://localhost/API/Activity.php", {
			Date: '2020-03-11',
			Type: activity,
			Duration: duration,
			CaloriesBurnt: caloriesBurnt,
			Description: description
		})
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.log(error);
		});
	};

    return(
	<AnimationFade>
		<h1 className='col-lg-4 col-sm-12 fw-bold'>TRENING</h1>
		<div className='col-lg-4 col-sm-12'>
			<Weight/>
		</div>
		<form onSubmit={handleSubmit}>
			<div className='row'>
				<div className='col-lg-4 col-sm-12'>
					<label htmlFor="activity" className='form-label mt-3'>Aktywność</label>
					<select className="form-control" name="activity" required onChange={(e) => setActivity(e.target.value)}>
						<option value="Bieg">Bieg</option>
						<option value="Spacer">Spacer</option>
						<option value="JazdaNaRowerze">Jazda na rowerze</option>
						<option value="Plywanie">Pływanie</option>
						<option value="Skakanka">Skakanka</option>
						<option value="Taniec">Taniec</option>
						<option value="TreningSilowy">Trening siłowy</option>
						<option value="SztukiWalki">Sztuki walki</option>
					</select>
				</div>
				<div className='col-lg-4 col-sm-12'>
					<label htmlFor="trainingDuration" className='form-label mt-3'>Czas trwania</label>
					<input className="form-control" type="number" name="trainingDuration" placeholder="min" required onChange={(e) => setDuration(Number(e.target.value))}/>
				</div>
				<div className='col-lg-4 col-sm-12'>
					<label htmlFor="caloriesBurnt" className='form-label mt-3'>Wydatek energetyczny / kcal</label>
					<input className="form-control" type="number" name="caloriesBurnt" placeholder="kcal" readOnly value={caloriesBurnt}/>
					</div>
			</div>
			<label htmlFor="description" className='form-label mt-3'>Notatki</label>
			<textarea className="form-control" name="description" placeholder="Lorem ipsum..." rows={4} onChange={(e) => setDescription(e.target.value)}/>
			<input className="btn btn-primary mt-3" type="submit" value="Dodaj aktywność"/>
		</form>
	</AnimationFade>
    )
}

export default ActivityUser;