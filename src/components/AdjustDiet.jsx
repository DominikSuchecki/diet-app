import { useState, useEffect } from 'react';
import UsersDietConfig from './Config';
import AnimationFade from './AnimationFade';

function AdjustDiet(){

	const [calories, setCalories] = useState(0);
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

	const changeCalories = (e) => {
		setCalories(e.target.value);
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

	const handleSubmit = (e) => {
		e.preventDefault();
	}

    return(
	<>
	<AnimationFade>
	<h1 className='col-lg-4 col-sm-12 fw-bold'>DOSTOSUJ</h1>
	<UsersDietConfig/>
	<form>
		<div className="row">
			<div className='col'>
			<label htmlFor='calories' className='form-label'>Zapotrzebowanie kaloryczne</label>
			<input type="number" className="form-control" name="calories" placeholder="kcal" onChange={changeCalories}/><br/>
			</div>

			<div className='mb-3'>
				<label className="form-label d-block" htmlFor="inlineRadioOptions">Dystrybucja makroskładników</label>
				<div className="form-check form-check-inline">
					<input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="balanced" onChange={(e) => setType(e.target.value)}/>
					<label className="form-check-label" htmlFor="inlineRadio1">Zbilansowana (W 55%, T 25%, B 20%)</label>
				</div>
				<div className="form-check form-check-inline">
					<input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="sport" onChange={(e) => setType(e.target.value)}/>
					<label className="form-check-label" htmlFor="inlineRadio2">Dla sportowców (W 60%, T 15%, B 25%)</label>
				</div>
				<div className="form-check form-check-inline">
					<input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="lowCarb" onChange={(e) => setType(e.target.value)}/>
					<label className="form-check-label" htmlFor="inlineRadio3">Niskowęglowodanowa (W 20%, T 60%, B 20%)</label>
				</div>
			</div>

			<div className="col-lg-4 col-sm-12">
			<label htmlFor='carbs' className='form-label'>Węglowodany {carbs + " %"}</label> 
			<input type="number" className="form-control" name="carbs" value={Math.round(calories/4*carbs/100)} readOnly/>
			<input type="range" className="form-range" onChange={changeCarbs}/>
			</div>

			<div className="col-lg-4 col-sm-12">
			<label htmlFor='fats' className='form-label'>Tłuszcze {fats + " %"}</label> 
			<input type="number" className="form-control" name="fats" value={Math.round(calories/9*fats/100)} readOnly/>
			<input type="range" className="form-range" onChange={changeFats}/>
			</div>

			<div className="col-lg-4 col-sm-12">
			<label htmlFor='proteins' className='form-label'>Białko {proteins + " %"}</label> 
			<input type="number" className="form-control" name="proteins" value={Math.round(calories/4*proteins/100)} readOnly/>
			<input type="range" className="form-range" onChange={changeProteins}/>
			</div>
		</div>

		<input type="submit" className="btn btn-primary mt-3" value="Dostosuj" onSubmit={handleSubmit} disabled={isDisabled ? true : false}/>
	</form>
	</AnimationFade>
	</>
    )
}

export default AdjustDiet;