import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Axios from 'axios';

function MeasurementsChart(){

	const [measurements, setMeasurements] = useState([]);

	useEffect(() => {
		Axios.get("http://localhost/API/Measurements.php")
		.then((response) => {
		  setMeasurements(response.data);
		})
		.catch((error) => {
			console.log(error);
		})
	}, [] )

	const options = {
	responsive: true,
	plugins: {
		legend: {
		position: 'top',
		},
		title: {
		display: true,
		text: 'Historia wymiarów ciała',
		}
	}
	};

	const labels = measurements.map((m) => m.Date);
	
	const data = {
	labels,
	datasets: [
		{
		label: 'Klatka',
		data: measurements.map((m) => m.Chest),
		borderColor: 'rgb(46, 204, 113)',
		backgroundColor: 'rgba(46, 204, 113, 0.5)',
		},
		{
		label: 'Talia',
		data: measurements.map((m) => m.Waist),
		borderColor: 'rgb(22, 160, 133)',
		backgroundColor: 'rgba(22, 160, 133, 0.5)',
		},
		{
		label: 'Ramię',
		data: measurements.map((m) => m.Arm),
		borderColor: 'rgb(52, 152, 219)',
		backgroundColor: 'rgba(52, 152, 219, 0.5)',
		},
		{
		label: 'Przedramię',
		data: measurements.map((m) => m.Forearm),
		borderColor: 'rgb(155, 89, 182)',
		backgroundColor: 'rgb(155, 89, 182, 0.5)',
		},
		{
		label: 'Biodra',
		data: measurements.map((m) => m.Hips),
		borderColor: 'rgb(231, 76, 60)',
		backgroundColor: 'rgba(231, 76, 60, 0.5)',
		},
		{
		label: 'Udo',
		data: measurements.map((m) => m.Thigh),
		borderColor: 'rgb(230, 126, 34)',
		backgroundColor: 'rgba(230, 126, 34, 0.5)',
		},
		{
		label: 'Łydka',
		data: measurements.map((m) => m.Calf),
		borderColor: 'rgb(241, 196, 15)',
		backgroundColor: 'rgba(241, 196, 15, 0.5)',
		}
	],}
	
	const exampleOptions = {
		responsive: true,
		plugins: {
			legend: {
			position: 'top',
			},
			title: {
			display: true,
			text: 'Brak danych - Dodaj swoje wymiary',
			}
		}
	};

	const exampleLabels = ['04.03.2023','19.04.2023','13.05.2023','11.06.2023','20.07.2023'];
	const exampleData = {
		labels: exampleLabels,
		datasets: [
			{
			label: 'Klatka',
			data: [100, 98, 96, 102, 104],
			borderColor: 'rgba(59,113,202)',
			backgroundColor: 'rgba(59,113,202, 0.5)',
			},
			{
			label: 'Talia',
			data: [80, 76, 72, 78, 82],
			borderColor: 'rgb(231, 76, 60)',
			backgroundColor: 'rgb(231, 76, 60, 0.5)',
			},
			{
			label: 'Ramię',
			data: [33, 32, 32, 34, 35],
			borderColor: 'rgb(46, 204, 113)',
			backgroundColor: 'rgb(46, 204, 113, 0.5)',
			}
		]
		}

    return(
	<>
		{measurements.length ? <Line options={options} data={data}/> : <Line options={exampleOptions} data={exampleData}/>}
	</>
    )
}

export default MeasurementsChart;