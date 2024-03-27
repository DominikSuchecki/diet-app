import Weight from '../components/Weight';
import ConfigCard from '../components/ConfigCard';
import AccountCard from '../components/AccountCard';
import WeightChart from '../components/WeightChart';

const Dashboard = () => {
    return(
	<>
		<h1 className='fw-bold'>DASHBOARD</h1>
		<div className='row'>
			<div className="col-lg-6 col-sm-12 mt-3">
				<AccountCard/>
				<ConfigCard/>
			</div>
			<div className="col-lg-6 col-sm-12 mt-3 mb-6">
				<Weight/>
				<WeightChart/>
			</div>
		</div>
	</>
    )
}

export default Dashboard;