import Weight from './Weight';
import WeightChart from './WeightChart';
import MeasurementsChart from './MeasurementsChart';
import Measurements from './Measurements';
import AnimationFade from './AnimationFade';
import ConfigCard from './ConfigCard';
import AdminCard from './AdminCard';

function Dashboard(){
    return(
	<AnimationFade>
		<h1 className='col-lg-4 col-sm-12 fw-bold'>PULPIT</h1>
		<div className='row'>
			<div className="col-lg-4 col-sm-12">
				<ConfigCard/>
			</div>
			<div className="col-lg-4 col-sm-12">
				<AdminCard/>
			</div>
		</div>
		<div className='row mt-3'>
			<div className="col-lg-4 col-sm-12">
				<Weight/>
			</div>
			<div>
				<Measurements/>
			</div>
		</div>
		<div className='row mt-3'>
				<div className="col-lg-6 col-sm-12">
					<WeightChart/>
				</div>
				<div className="col-lg-6 col-sm-12">
					<MeasurementsChart/>
				</div>
		</div>
	</AnimationFade>
    )
}

export default Dashboard;