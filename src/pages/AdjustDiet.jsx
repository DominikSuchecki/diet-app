import { useState, useEffect, useContext } from 'react';
import Config from './Config';
import Axios from 'axios';
import { AuthContext } from '../contexts/AuthProvider';
import Alert from '../components/Alert';
import { ConfigContext } from '../contexts/ConfigProvider';
import { API_URL } from '../api';

const AdjustDiet = () => {

	const { token } = useContext(AuthContext);
	const { update, setUpdate } = useContext(ConfigContext);

	const formattedDate = new Date().toISOString().slice(0, 10);
	const [message, setMessage] = useState(["",0]);

	const handleSubmit = (e) => {
		e.preventDefault();
		Axios.put(`${API_URL}/config`, {
			date: formattedDate,
			calories: calories,
			carbs: (calories * carbs / 100) / 4,
			fats: (calories * fats / 100) / 9,
			proteins: (calories * proteins / 100) / 4
		},
		{
			headers: {Authorization: `Bearer ${token}`},
		}
		)
		.then((response) => {
			if(response.status == 200){
				setMessage(["Config adjusted", 1])
				setUpdate(!update);
			}
			console.log(response);
		})
		.catch((error) => {
			setMessage(["Could adjust config", 0])
			console.log(error);
		});
	}

	const [calories, setCalories] = useState(2000);
	const [carbs, setCarbs] = useState(55);
	const [fats, setFats] = useState(25);
	const [proteins, setProteins] = useState(20);
	const [type, setType] = useState('');
	const [isDisabled, setIsDisabled] = useState(false);

	useEffect(() => {
		checkType();
		checkFor100();
	}, [carbs, fats, proteins, type])

	const checkType = () => {
		if(type === 'balanced') setCarbs(55), setFats(25), setProteins(20);
		if(type === 'sport') setCarbs(60), setFats(15), setProteins(25);
		if(type === 'lowCarb') setCarbs(20), setFats(60), setProteins(20);
	}

	const checkFor100 = () => {
		Number(carbs) + Number(fats) + Number(proteins) == 100 ? setIsDisabled(false) : setIsDisabled(true);
	}

	const changeCarbs = (e) => {
		setCarbs(e.target.value);
	}

	const changeFats = (e) => {
		setFats(e.target.value);
	}

	const changeProteins = (e) => {
		setProteins(e.target.value);
	}

    return(
	<>
	<h1 className='col-lg-4 col-sm-12 fw-bold'>ADJUST CONFIG</h1>
	<Config/>
		<div className="row">
			<div className='col'>
			<label htmlFor='calories' className='form-label'>Calories intake</label>
			<input type="number" className="form-control" name="calories" placeholder="kcal" value={calories} onChange={(e) => setCalories(e.target.value)}/><br/>
			</div>

			<div className='mb-3'>
				<label className="form-label d-block" htmlFor="inlineRadioOptions">Macronutrients distribution</label>
				<div className="form-check form-check-inline">
					<input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="balanced" onChange={(e) => setType(e.target.value)}/>
					<label className="form-check-label" htmlFor="inlineRadio1">Balanced (C 55%, F 25%, P 20%)</label>
				</div>
				<div className="form-check form-check-inline">
					<input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="sport" onChange={(e) => setType(e.target.value)}/>
					<label className="form-check-label" htmlFor="inlineRadio2">For athletes (C 60%, F 15%, P 25%)</label>
				</div>
				<div className="form-check form-check-inline">
					<input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="lowCarb" onChange={(e) => setType(e.target.value)}/>
					<label className="form-check-label" htmlFor="inlineRadio3">Low carb (C 20%, F 60%, P 20%)</label>
				</div>
			</div>
			
			<div className='mt-3 row'>
				<div className="col-lg-4 col-sm-12">
				<label htmlFor='carbs' className='form-label'>Carbs {carbs + " %"}</label> 
				<input type="number" className="form-control" name="carbs" value={Math.round(calories/4*carbs/100)} readOnly/>
				<input type="range" className="form-range" onChange={changeCarbs}/>
				</div>

				<div className="col-lg-4 col-sm-12">
				<label htmlFor='fats' className='form-label'>Fats {fats + " %"}</label> 
				<input type="number" className="form-control" name="fats" value={Math.round(calories/9*fats/100)} readOnly/>
				<input type="range" className="form-range" onChange={changeFats}/>
				</div>

				<div className="col-lg-4 col-sm-12">
				<label htmlFor='proteins' className='form-label'>Proteins {proteins + " %"}</label> 
				<input type="number" className="form-control" name="proteins" value={Math.round(calories/4*proteins/100)} readOnly/>
				<input type="range" className="form-range" onChange={changeProteins}/>
				</div>
			</div>
		</div>

		<input type="submit" className="btn btn-primary mt-3 mb-3" value="Adjust" onClick={handleSubmit} disabled={isDisabled ? true : false}/>
		<div className='mb-8'>
			{message[0] !== "" && <Alert content={message[0]} success={message[1]} />}
		</div>
	</>
    )
}

export default AdjustDiet;