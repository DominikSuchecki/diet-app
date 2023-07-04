import AnimationFade from './AnimationFade';
import { Link } from 'react-router-dom';

function NotFound404(){
    return(
	<AnimationFade>
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <h2>Ups, coś poszło nie tak</h2>
                <h4>nie możemy odznaleźć tego adresu strony</h4>
            </div>
	</AnimationFade>
    )
}

export default NotFound404;