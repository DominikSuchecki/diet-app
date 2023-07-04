import {useContext} from 'react';
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

function WeightChart(){
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
		text: 'Historia masy ciała',
		}
	}
	};

	const labels = weight.map((w) => w.Date);
	const data = {
	labels,
	datasets: [
		{
		label: 'Masa ciała',
		data: weight.map((w) => w.Weight),
		borderColor: 'rgb(46, 204, 113)',
		backgroundColor: 'rgba(46, 204, 113, 0.5)',
		}
	]
	}

	const exampleOptions = {
		responsive: true,
		plugins: {
			legend: {
			position: 'top',
			},
			title: {
			display: true,
			text: 'Brak danych - Dodaj swoją masę ciała',
			}
		}
	};

	const exampleLabels = ['04.03.2023','19.04.2023','13.05.2023','11.06.2023','20.07.2023'];
	const exampleData = {
		labels: exampleLabels,
		datasets: [
			{
			label: 'Masa ciała',
			data: [60, 56, 58, 62, 64],
			borderColor: 'rgb(59,113,202)',
			backgroundColor: 'rgba(59,113,202, 0.5)',
			}
		]
		}

    return(
	<>
		{weight.length ? <Line options={options} data={data} /> : <Line options={exampleOptions} data={exampleData}/>}
	</>
    )
}

export default WeightChart;