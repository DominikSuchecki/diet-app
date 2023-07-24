import {useContext} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { ConfigContext } from '../contexts/ConfigProvider';

function Config(){

	const { config, isLoading, lastConfig } = useContext(ConfigContext);

	return (
	<>
		<div className='table-responsive'>
		<table className='table table-sm table-striped'>
		<thead>
			<tr>
			<th className='fw-bold'>Kalorie</th>
			<th className='fw-bold'>Węglowodany</th>
			<th className='fw-bold'>Tłuszcze</th>
			<th className='fw-bold'>Białko</th>
			</tr>
		</thead>
		<tbody className="table-group-divider">
			{isLoading ? (
			<>
				<td colSpan={4}>
					<div className="d-flex align-items-center">
						Pobieranie danych...
						<div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
					</div>
				</td>
			</>
			) :
				Array.isArray(config) ? (
				<tr>
					<td>{lastConfig?.Calories}</td>
					<td>{lastConfig?.Carbs}</td>
					<td>{lastConfig?.Fats}</td>
					<td>{lastConfig?.Proteins}</td>
				</tr>
				) : (
				<tr>
					<td colSpan={4}>Zalecamy ustalić zapotrzebowanie za pomocą <Link to='/calculator'>kalkulatora</Link></td>
				</tr>
				)}
		</tbody>
		</table>
		</div>
	</>
    )
}

export default Config;