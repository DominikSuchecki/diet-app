import { useContext, useState } from 'react'
import { ActivityContext } from '../contexts/ActivityProvider'
import { DietContext } from '../contexts/DietProvider'
import Axios from 'axios'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { AuthContext } from '../contexts/AuthProvider'
import Alert from '../components/Alert'
import { API_URL } from '../api'
import InfoAlert from '../components/InfoAlert'

function ActivityLog(){

	const { token } = useContext(AuthContext);
	const { update: updateActivity, setUpdate: setUpdateActivity } = useContext(ActivityContext);
	const { update: updateDiet, setUpdate: setUpdateDiet } = useContext(DietContext);	
	const [selectedDiet, SetSelectedDiet] = useState(null);
	const [message, setMessage] = useState(["",0]);

	const handleActivityDelete = (id) => {
		Axios.delete(`${API_URL}/activity/${id}`,
		{
			headers: {Authorization: `Bearer ${token}`},
		}
		)
		.then((response) => {
			setMessage(["Activity deleted",1])
			setUpdateActivity(!updateActivity);
		})
		.catch((error) => {
			setMessage(["Couldnt delete activity",0])
		});
	}

	const handleDietDelete = (id) => {
		Axios.delete(`${API_URL}/diet/${id}`,
		{
			headers: {Authorization: `Bearer ${token}`},
		}
		)
		.then((response) => {
			setMessage(["Diet deleted",1])
			setUpdateDiet(!updateDiet);
		})
		.catch((error) => {
			setMessage(["Couldnt delete diet",0])
		});
	}

	const {activity} = useContext(ActivityContext);
	const {diet} = useContext(DietContext);
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState('breakfast');

	const tileClassName = ({ date, view }) => {
		const formattedDate = date.toISOString().slice(0, 10);
		const hasActivity = activity.some((a) => a.date === formattedDate);
		const hasDiet = diet.some((d) => d.date === formattedDate);
		if (view === 'month') {
			if (hasActivity && !hasDiet) {
				return 'activity-tile';
			} else if (hasDiet && !hasActivity) {
				return 'diet-tile';
			} else if (hasDiet && hasActivity) {
				return 'both-tile';
			}
		}
		return null;
	};

	const displayModal = (id) => {
		const selectedDiet = diet.find((d) => d.id === id);
		if (!selectedDiet || !selectedDiet.products_eaten) {
		  return;
		}
	  
		try {
		  const parsedProducts = JSON.parse(selectedDiet.products_eaten);
		  SetSelectedDiet(parsedProducts);
		} catch (error) {
		}
	};

	const isDataEmpty = !activity.some((a) => a.date === date.toISOString().slice(0, 10)) && !diet.some((d) => d.date === date.toISOString().slice(0, 10));

    return(
	<>
	<h1 className='fw-bold'>LOG</h1>
	<div className='row'>
		<div className='col-lg-4 col-sm-12'>
			<Calendar locale="eng" className='shadow-4 mb-3' onChange={setDate} value={date} tileClassName={tileClassName}/>
		</div>

		<div className='col-lg-8 col-sm-12'>
			<h1 className='fw-bold'>{date.toLocaleDateString()}</h1>
			{message[0] !== "" && <Alert content={message[0]} success={message[1]} />}
			{isDataEmpty && <InfoAlert content="No data found for this date" />}
				<div className='row mb-6'>
					{activity.map(a => {
						if (a.date === date.toISOString().slice(0, 10)) {
							return (
							<>
							<div className="card shadow-4 p-4 mb-4">			
							<div className="row"  key={a.id}>
								<div></div>
								<div className="col text-center col-sm-4 mb-lg-0 position-relative">
									<i className="fas fa-person-running fa-xl text-primary mb-3"></i>
									<h6 className="text fw-bold mt-1 mb-3">{a.type}</h6>
									<div className="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
								</div>
								<div className="col text-center col-sm-4 mb-md-5 mb-lg-0 position-relative">
									<i className="fas fa-clock fa-xl text-primary mb-3"></i>
									<h6 className="text fw-bold mt-1 mb-3">{a.duration}:00</h6>
									<div className="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
								</div>
								<div className="col text-center col-sm-4 mb-md-0 position-relative">
									<i className="fas fa-fire fa-xl text-primary mb-3"></i>
									<h6 className="text fw-bold mt-1 mb-3">{a.calories_burnt + "kcal"}</h6>
								</div>
								<p className='fw-bold'>{a.description}</p>
								<div className='d-flex justify-content-between'>
									<button className="w-50 col-sm-6 d-block btn btn-danger m-auto" onClick={() => handleActivityDelete(a.id)}>Delete</button>
								</div>
							</div>
							</div>
							</>
							);
						}
					})}

					{diet.map(d => {
						if (d.date === date.toISOString().slice(0, 10)){
							return (
								<div className="col-lg-12 col-sm-12 card shadow-4 p-4 mt-4">	
								<div className="row text-center"  key={d.id}>
								<div className="col col-sm-3 mb-md-5 mb-lg-0 position-relative">
									<h6 className='text-primary fw-bold'>Calories</h6>
									<h6 className="text fw-bold mb-3">{d.calories_eaten + "/" + d.calories_goal}</h6>
									<div className="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
								</div>
								<div className="col col-sm-3 mb-md-0 position-relative">
								<h6 className='text-primary fw-bold'>Carbs</h6>
									<h6 className="text fw-bold mb-3">{d.carbs_eaten + "/" + d.carbs_goal}</h6>
									<div className="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
								</div>
								<div className="col col-sm-3 mb-md-0 position-relative">
								<h6 className='text-primary fw-bold'>Fats</h6>
									<h6 className="text fw-bold mb-3">{d.fats_eaten + "/" + d.fats_goal}</h6>
									<div className="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
								</div>
								<div className="col col-sm-3 mb-md-0 position-relative">
								<h6 className='text-primary fw-bold'>Proteins</h6>
									<h6 className="text fw-bold mb-3">{d.proteins_eaten + "/" + d.proteins_goal}</h6>
									<div className="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
								</div>
								<div className='row'>
									<div className="col mb-md-0 position-relative">
										<button className="btn btn-primary" type="submit" data-mdb-toggle="modal" data-mdb-target="#detailsModal" onClick={() => displayModal(d.id)}>Details</button>
									</div>
									<div className="col mb-md-0 position-relative mb-4">
										<button className="btn btn-danger" style={{width:122}} onClick={() => handleDietDelete(d.id)}>Delete</button>
									</div>
								</div>
							</div>
							</div>
							)}
						}
					)}
				</div>
			</div>
		</div>

		<div className="modal fade" id="detailsModal" tabIndex={-1} aria-labelledby="detailsModal" aria-hidden="true">
		<div className="modal-dialog modal-xl">
			<div className="modal-content">
			<div className="modal-header">
				<h5 className="modal-title" id="addModal">Szczegóły diety</h5>
				<button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
			</div>
			<div className="modal-body">			
			<ul className="nav nav-pills nav-justified mb-4" id="ex-with-icons-2" role="tablist">
		<li className="nav-item" role="presentation">
			<a className="nav-link shadow-3 active col" id="ex-with-icons-tab-1-2" data-mdb-toggle="tab" href="#ex-with-icons-tabs-1-2" role="tab"
			aria-controls="ex-with-icons-tabs-1-2" aria-selected="true" name="breakfast" onClick={(e) => setTime(e.target.name)}>Breakfast</a>
		</li>
		<li className="nav-item" role="presentation">
			<a className="nav-link shadow-3 col" id="ex-with-icons-tab-2-2" data-mdb-toggle="tab" href="#ex-with-icons-tabs-2-2" role="tab"
			aria-controls="ex-with-icons-tabs-2-2" aria-selected="false" name="dinner" onClick={(e) => setTime(e.target.name)}>Dinner</a>
		</li>
		<li className="nav-item" role="presentation">
			<a className="nav-link shadow-3 col" id="ex-with-icons-tab-3-2" data-mdb-toggle="tab" href="#ex-with-icons-tabs-3-2" role="tab"
			aria-controls="ex-with-icons-tabs-3-2" aria-selected="false" name="snack" onClick={(e) => setTime(e.target.name)}>Snack</a>
		</li>
		<li className="nav-item" role="presentation">
			<a className="nav-link shadow-3 col" id="ex-with-icons-tab-3-2" data-mdb-toggle="tab" href="#ex-with-icons-tabs-3-2" role="tab"
			aria-controls="ex-with-icons-tabs-3-2" aria-selected="false" name="supper" onClick={(e) => setTime(e.target.name)}>Supper</a>
		</li>
  	</ul>


	<div className="tab-content" id="ex-with-icons-content">
  <div className="tab-pane fade show active" id="ex-with-icons-tabs-1-2" role="tabpanel" aria-labelledby="ex-with-icons-tab-1-2">
  	<div className='table-responsive'>
		<table className='table table-striped table-sm'>
		<thead>
			<tr>
			<th></th>
			<th className='fw-bold'>Calories</th>
			<th className='fw-bold'>C</th>
			<th className='fw-bold'>F</th>
			<th className='fw-bold'>P</th>
			</tr>
		</thead>
		<tbody className="table-group-divider">
				{selectedDiet?.filter(f => f.time == 'breakfast').map(p => (
				<tr key={p.id}>
					<td>{p.name}</td>
					<td>{p.calories}</td>
					<td>{p.carbs}</td>
					<td>{p.fats}</td>
					<td>{p.proteins}</td>
				</tr>
				))}
		</tbody>
		</table>
		</div>
  </div>
  <div className="tab-pane fade" id="ex-with-icons-tabs-2-2" role="tabpanel" aria-labelledby="ex-with-icons-tab-2-2">
  <div className='table-responsive'>
			<table className='table table-striped table-sm'>
			<thead>
				<tr>
				<th></th>
				<th className='fw-bold'>Calories</th>
				<th className='fw-bold'>C</th>
				<th className='fw-bold'>F</th>
				<th className='fw-bold'>P</th>
				</tr>
			</thead>
			<tbody className="table-group-divider">
			{selectedDiet?.filter(f => f.time == 'dinner').map(p => (
				<tr key={p.id}>
					<td>{p.name}</td>
					<td>{p.calories}</td>
					<td>{p.carbs}</td>
					<td>{p.fats}</td>
					<td>{p.proteins}</td>
				</tr>
				))}
			</tbody>
			</table>
		</div>
  </div>
  <div className="tab-pane fade" id="ex-with-icons-tabs-3-2" role="tabpanel" aria-labelledby="ex-with-icons-tab-3-2">
  <div className='table-responsive'>
			<table className='table table-striped table-sm'>
			<thead>
				<tr>
				<th></th>
				<th className='fw-bold'>Calories</th>
				<th className='fw-bold'>C</th>
				<th className='fw-bold'>F</th>
				<th className='fw-bold'>P</th>
				</tr>
			</thead>
			<tbody className="table-group-divider">
			{selectedDiet?.filter(f => f.time == 'snack').map(p => (
				<tr key={p.id}>
					<td>{p.name}</td>
					<td>{p.calories}</td>
					<td>{p.carbs}</td>
					<td>{p.fats}</td>
					<td>{p.proteins}</td>
				</tr>
				))}
			</tbody>
			</table>
		</div>
  </div>
  <div className="tab-pane fade" id="ex-with-icons-tabs-4-2" role="tabpanel" aria-labelledby="ex-with-icons-tab-4-2">
  <div className='table-responsive'>
			<table className='table table-striped table-sm'>
			<thead>
				<tr>
				<th></th>
				<th className='fw-bold'>Calories</th>
				<th className='fw-bold'>C</th>
				<th className='fw-bold'>F</th>
				<th className='fw-bold'>P</th>
				</tr>
			</thead>
			<tbody className="table-group-divider">
				{selectedDiet?.filter(f => f.time == 'supper').map(p => (
					<tr key={p.id}>
						<td>{p.name}</td>
						<td>{p.calories}</td>
						<td>{p.carbs}</td>
						<td>{p.fats}</td>
						<td>{p.proteins}</td>
					</tr>
					))}
			</tbody>
			</table>
		</div>
  </div>
</div>
			</div>
			<div className="modal-footer">
				<button type="button" className="btn btn-primary" data-mdb-dismiss="modal">Return</button>
			</div>
			</div>
		</div>
	</div>
	</>
    )
}

export default ActivityLog;