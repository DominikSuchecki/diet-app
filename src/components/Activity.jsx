import ActivityUser from './ActivityUser'
import ActivityGuest from './ActivityGuest'
import { AuthContext } from '../contexts/AuthProvider';
import { useContext } from 'react';

function Activity(){

	const { auth } = useContext(AuthContext);

    return(
		<>
			{ auth ? <ActivityUser/> : <ActivityGuest/> }
		</>
    )
}

export default Activity;