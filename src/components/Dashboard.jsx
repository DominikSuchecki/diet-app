import Weight from './Weight';
import WeightChart from './WeightChart';
import MeasurementsChart from './MeasurementsChart';
import Measurements from './Measurements';
import AnimationFade from './AnimationFade';
import ConfigCard from './ConfigCard';
import AdminCard from './AdminCard';
import AccountCard from './AccountCard';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

function Dashboard(){

	const { role } = useContext(AuthContext);

    return(
	<AnimationFade>
		<h1 className='col-lg-4 col-sm-12 fw-bold'>PULPIT</h1>
			<div className='row'>
			<div className="col-lg-4 col-sm-12 mt-3">
					<AccountCard/>
				</div>
				<div className="col-lg-4 col-sm-12 mt-3">
					<ConfigCard/>
				</div>
		{ role == 'Admin' && (
				<div className="col-lg-4 col-sm-12 mt-3">
					<AdminCard/>
				</div>
		)}
			</div>
		<div className='row mt-3'>
			<div className="col-lg-4 col-sm-12">
				<Weight/>
			</div>
			<div>
				<Measurements/>
			</div>
		</div>
		<div className='row mt-3 pb-5'>
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