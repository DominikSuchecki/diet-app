import { useEffect, useState, useContext } from 'react';
import AnimationFade from './AnimationFade';
import { AuthContext } from '../contexts/AuthProvider';

function Calc(){

	const { auth } = useContext(AuthContext)

	const [height,setHeight] = useState(0)
	const [weight,setWeight] = useState(0)
	const [age,setAge] = useState(0)
	const [gender,setGender] = useState("male")
	const [activity,setActivity] = useState(1.2)
	const [goal,setGoal] = useState("maintain")
	const [pace,setPace] = useState(0)
	const [result,setResult] = useState(0)
	let ppm = 0
	let kcal = 0

	const handleSubmit = (e) => {
		e.preventDefault()
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
	<AnimationFade>
		<h1 className='col-lg-4 col-sm-12 fw-bold'>KALKULATOR</h1>
		<form>
			<div className="row">
				<div className="col-lg-4 col-sm-12 mt-3">
					<label htmlFor="height" className="form-label">Wzrost</label>
					<input type="number" className="form-control" name="height" placeholder="cm" min="0" onChange={(e) => setHeight(Number(e.target.value))}/>
				</div>
				<div className="col-lg-4 col-sm-12 mt-3">
					<label htmlFor="weight" className="form-label">Masa ciała</label>
					<input type="number" className="form-control" name="weight" placeholder="kg" min="0" onChange={(e) => setWeight(Number(e.target.value))}/>
				</div>
				<div className="col-lg-4 col-sm-12 mt-3">
					<label htmlFor="age" className='form-label'>Wiek</label>
					<input type="number" className="form-control" name="age" placeholder="18" min="16" onChange={(e) => setAge(Number(e.target.value))}/>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-4 col-sm-12 mt-3">
					<label htmlFor="gender" className='form-label'>Płeć</label>
					<select className="form-control" name="gender" onChange={(e) => setGender(e.target.value)}>
						<option value="male">Mężczyzna</option>
						<option value="female">Kobieta</option>
					</select>
				</div>
				<div className="col-lg-4 col-sm-12 mt-3">
					<label htmlFor="activity" className='form-label'>Aktywność</label>
					<select className="form-control" name="activity" onChange={(e) => setActivity(Number(e.target.value))}>
						<option value="1.2">Praca siedząca</option>
						<option value="1.4">Drobne prace domowe</option>
						<option value="1.6">Praca stojąca</option>
						<option value="2">Praca fizyczna</option>
					</select>
				</div>
				<div className="col-lg-4 col-sm-12 mt-3">
					<label htmlFor="goal" className='form-label'>Cel</label>
					<select className="form-control" name="goal" onChange={(e) => setGoal(e.target.value)}>
						<option value="maintain">Utrzymać wagę</option>
						<option value="loss">Schudnąć</option>
						<option value="gain">Chcę przytyć</option>
					</select>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-4 col-sm-12 mt-3">
					<label htmlFor="pace" className='form-label'>Tempo zmiany wagi tygodniowo</label>				
					{goal === "maintain" ? (
						<input type="number" name="pace" className="form-control" step=".1" min="0" onChange={(e) => setPace(Number(e.target.value))} disabled></input>
					) : (
						<>
						<input type="number" name="pace" className="form-control" placeholder="kg" step=".1" min="0" onChange={(e) => setPace(Number(e.target.value))} required></input>
						<p className="text-muted">* Zalecane tempo, 1% masy ciała ({(weight*0.01).toFixed(1)} kg)</p>
						</>
					)
					}
				</div>
				<div className="col-lg-4 col-sm-12 mt-3">
					<label htmlFor="calories" className='form-label'>Zapotrzebowanie kaloryczne</label>
					<input type="number" name="calories" className="form-control" value={result} readOnly></input>
				</div>	
			</div>
				{ auth && <input className="btn btn-primary mt-3" type="submit" onSubmit={handleSubmit} value="Zapisz"/> }
		</form>
	</AnimationFade>
    )
}

export default Calc;