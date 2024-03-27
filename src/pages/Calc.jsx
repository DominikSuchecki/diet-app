import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { ConfigContext } from '../contexts/ConfigProvider';
import Axios from 'axios';
import Alert from '../components/Alert';
import { API_URL } from '../api';
import InfoAlert from '../components/InfoAlert';

const Calc = () => {

	const { auth, token } = useContext(AuthContext)
	const { update, setUpdate } = useContext(ConfigContext);

	const [height,setHeight] = useState(0)
	const [weight,setWeight] = useState(0)
	const [age,setAge] = useState(0)
	const [gender,setGender] = useState("male")
	const [activity,setActivity] = useState(1.2)
	const [goal,setGoal] = useState("maintain")
	const [pace,setPace] = useState(0)
	const [result,setResult] = useState(0)
	const [message, setMessage] = useState(["",0])
	const formattedDate = new Date().toISOString().slice(0, 10)
	let ppm = 0
	let kcal = 0

	const handleSubmit = () => {
		Axios.post(`${API_URL}/config`, {
			date: formattedDate,
			calories: result,
		},
		{
			headers: {Authorization: `Bearer ${token}`},
		}
		)
		.then((response) => {
			if(response.status == 201){
				setMessage(["Config created", 1])
				setUpdate(!update)
			}
			console.log(response);
		})
		.catch((error) => {
			setMessage(["Error with creating config", 0])
			console.log(error);
		});
	}

	useEffect(() => {
		if(weight!=0 && height !=0 && age !=0){
			if (gender === "male") { ppm = 66.47 + (13.7 * weight) + (5.0 * height) - (6.76 * age)}
			else { ppm = 655.1 + (9.567 * weight) + (1.85 * height) - (4.68 * age) }
		
			if (goal === "loss") { kcal = -1000 * pace }
			else if (goal === "gain") { kcal = 1000 * pace }
			else {}
		
			setResult(Number((ppm * activity + kcal).toFixed()))
		}
	}, [weight,height,age,gender,activity,pace])

    return(
	<>
		<h1 className='col-lg-4 col-sm-12 fw-bold'>CALCULATOR</h1>
		<p>

		</p>
		<form>
			<div className="row">
				<div className="col-lg-4 col-sm-12">
					<label htmlFor="height" className="form-label">Height</label>
					<input type="number" className="form-control" name="height" placeholder="cm" min="0" onChange={(e) => setHeight(Number(e.target.value))}/>
				</div>
				<div className="col-lg-4 col-sm-12 mt-3">
					<label htmlFor="weight" className="form-label">Weight</label>
					<input type="number" className="form-control" name="weight" placeholder="kg" min="0" onChange={(e) => setWeight(Number(e.target.value))}/>
				</div>
				<div className="col-lg-4 col-sm-12 mt-3">
					<label htmlFor="age" className='form-label'>Age</label>
					<input type="number" className="form-control" name="age" placeholder="18" min="16" onChange={(e) => setAge(Number(e.target.value))}/>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-4 col-sm-12 mt-3">
					<label htmlFor="gender" className='form-label'>Sex</label>
					<select className="form-control" name="gender" onChange={(e) => setGender(e.target.value)}>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>
				</div>
				<div className="col-lg-4 col-sm-12 mt-3">
					<label htmlFor="activity" className='form-label'>Activity level</label>
					<select className="form-control" name="activity" onChange={(e) => setActivity(Number(e.target.value))}>
						<option value="1.2">Sedentary job</option>
						<option value="1.4">House duties</option>
						<option value="1.6">Standing up work</option>
						<option value="2">Physical work</option>
					</select>
				</div>
				<div className="col-lg-4 col-sm-12 mt-3">
					<label htmlFor="goal" className='form-label'>Weight goal</label>
					<select className="form-control" name="goal" onChange={(e) => setGoal(e.target.value)}>
						<option value="maintain">Maintain</option>
						<option value="loss">Lose</option>
						<option value="gain">Gain</option>
					</select>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-4 col-sm-12 mt-3">
					<label htmlFor="pace" className='form-label'>Pace of weekly weight change</label>				
					{goal === "maintain" ? (
						<input type="number" name="pace" className="form-control" step=".1" min="0" onChange={(e) => setPace(Number(e.target.value))} disabled></input>
					) : (
						<>
						<input type="number" name="pace" className="form-control" placeholder="kg" step=".1" min="0" onChange={(e) => setPace(Number(e.target.value))} required></input>
							<div className='mt-3'>
								<InfoAlert content={`Recommended pace, 1% of bodyweight per week (${(weight * 0.01).toFixed(1)} kg)`} />
							</div>
						</>
					)
					}
				</div>
				<div className="col-lg-4 col-sm-12 mt-3 mb-3">
					<label htmlFor="calories" className='form-label'>Calorie intake</label>
					<input type="number" name="calories" className="form-control" value={result} readOnly></input>
				</div>	
			</div>
				{ auth && <button className="btn btn-primary mb-3" onClick={handleSubmit} >Save</button> }
				<div className='mt-3 mb-8'>
					{ message[0] != "" && <Alert content={message[0]} success={message[1]} /> }
				</div>	
		</form>
	</>
    )
}

export default Calc;