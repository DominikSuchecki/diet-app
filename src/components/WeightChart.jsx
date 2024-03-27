import { useContext } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { WeightContext } from '../contexts/WeightProvider';

const WeightChart = () => {
	const {weight} = useContext(WeightContext);

	ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
	);

	const options = {
	responsive: true,
	plugins: {
		legend: {
		position: 'top',
		},
		title: {
		display: true,
		text: 'Weight chart',
		}
	}
	};

	if( weight.length > 1 ) {
		const labels = weight.map((w) => w.date);
		var data = {
		labels,
		datasets: [
			{
			label: 'Weight',
			data: weight.map((w) => w.weight),
			borderColor: '#3b71ca',
			backgroundColor: 'rgba(59,113,202,0.5)',
			}
		]
		}
	}

	const exampleOptions = {
		responsive: true,
		plugins: {
			legend: {
			position: 'top',
			},
			title: {
			display: true,
			text: 'No weight data found',
			}
		}
	};

	const exampleLabels = ['04.03.2023','19.04.2023','13.05.2023','11.06.2023','20.07.2023'];
	const exampleData = {
		labels: exampleLabels,
		datasets: [
			{
			label: 'Weight',
			data: [72, 70, 68, 72, 76],
			borderColor: '#4f4f4f',
			backgroundColor: 'rgba(79,79,79,0.5)',
			}
		]
		}

    return(
	<div className='mt-3'>
		{weight.length > 1 ? <Line options={options} data={data} /> : <Line options={exampleOptions} data={exampleData}/>}
	</div>
    )
}

export default WeightChart;