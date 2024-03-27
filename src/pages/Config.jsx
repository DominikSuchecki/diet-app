import {useContext} from 'react';
import { ConfigContext } from '../contexts/ConfigProvider';
import InfoAlert from '../components/InfoAlert';

const Config = () => {

	const { config, isLoading, lastConfig } = useContext(ConfigContext);

	return (
	<>
		{ config?.length==0 ? (
			<InfoAlert content="First set your calories intake demand with Calculator"/>
		) : (
		<div className='table-responsive'>
			<table className='table table-sm table-striped'>
				<thead>
					<tr>
					<th className='fw-bold'>Calories</th>
					<th className='fw-bold'>Carbs</th>
					<th className='fw-bold'>Fats</th>
					<th className='fw-bold'>Proteins</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">
					{isLoading ? (
					<>
						<td colSpan={4}>
							<div className="d-flex align-items-center">
								Loading data...
								<div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
							</div>
						</td>
					</>
					) :
						config?.length>0 && (
						<tr>
							<td>{lastConfig?.calories}</td>
							<td>{lastConfig?.carbs}</td>
							<td>{lastConfig?.fats}</td>
							<td>{lastConfig?.proteins}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
		)}
	</>
    )
}

export default Config;