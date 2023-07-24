import { useContext, useState } from 'react'
import AnimationFade from './AnimationFade'
import { ActivityContext } from '../contexts/ActivityProvider'
import { DietContext } from '../contexts/DietProvider'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

function ActivityLog(){

	const {activity} = useContext(ActivityContext);
	const {diet} = useContext(DietContext);
	const [date, setDate] = useState(new Date());

	const tileClassName = ({ date, view }) => {
		const formattedDate = date.toISOString().slice(0, 10);
		const isActivityDate = activity.diet && activity.some((a) => a.Date === formattedDate);
		const isDietDate = Array.diet && diet.some((d) => d.Date === formattedDate);

		if (view === 'month' && isActivityDate && !isDietDate) {
			return 'activity-tile';
		}
		else if (view === 'month' && isDietDate && !isActivityDate) {
		  return 'diet-tile';
		}
		else if (view === 'month' && isDietDate && isActivityDate) {
			return 'both-tile';
		}
		return null;
	};

    return(
	<AnimationFade>
	<div className='row'>
		<div className='col-lg-4 col-sm-12'>
		<h1 className='fw-bold'>DZIENNIK</h1>
			<Calendar className='shadow-4 mb-3' onChange={setDate} value={date} tileClassName={tileClassName}/>
		</div>

		<div className='col-lg-8 col-sm-12'>
			<h1 className='fw-bold'>{date.toLocaleDateString()}</h1>
				<div>
					{Array.activity && activity.map(a => {
						if (a.Date === date.toISOString().slice(0, 10)) {
							return (
							<>								
							<div className="row text-center mt-3"  key={a.Id}>
								<div className="col-lg-4 col-md-6 mb-5 mb-md-5 mb-lg-0 position-relative">
									<i className="fas fa-person-running fa-3x text-primary mb-4"></i>
									<h5 className="text-primary fw-bold mb-3">{a.Type}</h5>
									<div className="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
								</div>
								<div className="col-lg-4 col-md-6 mb-5 mb-md-5 mb-lg-0 position-relative">
									<i className="fas fa-clock fa-3x text-primary mb-4"></i>
									<h5 className="text-primary fw-bold mb-3">{a.Duration + ":00"}</h5>
									<div className="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
								</div>
								<div className="col-lg-4 col-md-6 mb-5 mb-md-0 position-relative">
									<i className="fas fa-fire fa-3x text-primary mb-4"></i>
									<h5 className="text-primary fw-bold mb-3">{a.CaloriesBurnt + "kcal"}</h5>
									<div className="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
								</div>
							</div>

							<div className="col-lg-3 col-md-6 mb-5 mb-md-0 position-relative">
								<i className="fas fa-comment fa-3x text-primary mb-4"></i>
								<h5 className="text-primary fw-bold mb-3">{a.Description}</h5>
							</div>
							</>
							);
						}
					})}

					{Array.diet && diet.map(d => {
						if (d.Date === date.toISOString().slice(0, 10)){
							return (
							<div className="row text-center mt-3"  key={d.Id}>
								<div className="col-lg-3 col-sm-3 mb-5position-relative">
									<i className="fas fa-cubes fa-3x text-primary mb-4"></i>
									<p className='text-muted'>Kalorie</p>
									<h5 className="text-primary fw-bold mb-3">{d.CaloriesEaten + '/' + d.CaloriesGoal}</h5>
									<div className="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
								</div>
								<div className="col-lg-3 col-sm-3 mb-5 position-relative">
									<i className="fas fa-bread-slice fa-3x text-primary mb-4"></i>
									<p className='text-muted'>Węglowodany</p>
									<h5 className="text-primary fw-bold mb-3">{d.CarbsEaten + '/' + d.CarbsGoal}</h5>
									<div className="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
								</div>
								<div className="col-lg-3 col-sm-3 mb-5 position-relative">
									<i className="fas fa-bottle-droplet fa-3x text-primary mb-4"></i>
									<p className='text-muted'>Tłuszcze</p>
									<h5 className="text-primary fw-bold mb-3">{d.FatsEaten + '/' + d.FatsGoal}</h5>
									<div className="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
								</div>
								<div className="col-lg-3 col-sm-3 position-relative">
									<i className="fas fa-drumstick-bite fa-3x text-primary mb-4"></i>
									<p className='text-muted'>Białko</p>
									<h5 className="text-primary fw-bold mb-3">{d.ProteinsEaten + '/' + d.ProteinsGoal}</h5>
								</div>
							</div>
							)}
						}
					)}
				</div>
			</div>
		</div>
	</AnimationFade>
    )
}

export default ActivityLog;