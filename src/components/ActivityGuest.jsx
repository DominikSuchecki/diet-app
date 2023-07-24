import { useState, useEffect, useContext } from 'react'
import AnimationFade from './AnimationFade'

function ActivityGuest(){

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

	const [weight, setWeight] = useState(0);
	const [activity, setActivity] = useState('Bieg');
	const [duration, setDuration] = useState(0);
	const [caloriesBurnt, setCaloriesBurnt] = useState(0);

	useEffect(() => {
		setCaloriesBurnt((MET[activity] * 3.5 * weight / 200) * duration)
	}, [weight,activity,duration])

    return(
	<AnimationFade>
			<h1 className='col-lg-4 col-sm-12 fw-bold'>TRENING</h1>
			<p>
			Oszacowanie aktywności fizycznej można przeprowadzić przy użyciu jednostek MET (metabolic equivalent of task), dzięki temu można określić, ile kalorii spala się podczas danej aktywności fizycznej.
			Światowa Organizacja Zdrowia (WHO), zaleca wykonywanie co najmniej 150 minut umiarkowanej aktywności fizycznej lub 75 minut intensywnej aktywności fizycznej w ciągu tygodnia.
			</p>
			<div className='row col-lg-4 col-sm-12'>
				<div className='col'>
					<label htmlFor="weight" className='form-label'>Masa ciała</label>
					<input type="number" className="form-control" name="weight" placeholder="kg" onChange={(e) => setWeight(e.target.value)} defaultValue={weight[weight.length-1]?.Weight}/>
				</div>
			</div>
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
	</AnimationFade>
    )
}

export default ActivityGuest;