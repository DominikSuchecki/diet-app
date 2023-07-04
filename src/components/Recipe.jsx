import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import AnimationFade from './AnimationFade';

function Recipe() {

	const params = useParams();
	console.log(params.id);
	const [recipe, setRecipe] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
	Axios.get(`http://localhost/API/Recipes.php?Id=${params.id}`)
	.then((response) => {
		setRecipe(response.data[0]);
		setIsLoading(false);
	})
	.catch((error) => {
		console.log(error);
		setIsLoading(true);
	})
	}, [params.id]);

	const renderIngredients = () => {
		if (recipe.Ingredients) {
		const ingredients = recipe.Ingredients.split(',');
		return ingredients.map((i, index) => (
			<li className='list-group-item' key={index}>{i.trim()}</li>
		));
		}
		return null;
	};

  return (
  <AnimationFade>
	{isLoading ? (
			  <div className="text-center p-5">
				<div className="spinner-border" role="status"></div>
			  </div>
	) : (
    <div className='row'>
		<div className='col-lg-4 sm-12'>
			<img src={recipe.ImagePath} style={{maxWidth:400, maxHeight:400, aspectRatio:1, objectFit:'cover'}} alt={recipe.Name}></img>
		</div>
		<div className='col-lg-8 sm-12'>
      <h2>
		{recipe.Name + ' '}
	  </h2>
	  <p>{recipe.Description}</p>

	  <p>Składniki: 
		<ul className='list-group list-group-light list-group-numbered'>
				{renderIngredients()}
		</ul>
	  </p>

	  <p>
	  Poziom trudności: 
	  {recipe.Difficulty == 1 && <> <i className="fas fa-circle"></i> <i className="far fa-circle"></i> <i className="far fa-circle"></i></>}
	  {recipe.Difficulty == 2 && <> <i className="fas fa-circle"></i> <i className="fas fa-circle"></i> <i className="far fa-circle"></i></>}
	  {recipe.Difficulty == 3 && <> <i className="fas fa-circle"></i> <i className="fas fa-circle"></i> <i className="fas fa-circle"></i></>}
	  </p>
	  
	  <p>
	  Czas przygotowania: <i className="fa-solid fa-clock"> </i> {recipe.Time} minut
	  </p>

	  <p>
	  Ilość porcji: <i className="fa-solid fa-user"> </i> {recipe.Portions}
	  </p>

	  <div className="col-lg-6 ">
		<div className='table-responsive'>
			<table className='table table-striped table-sm'>
			<thead>
				<tr>
				<th>Kalorie</th>
				<th>Węglowodany</th>
				<th>Tłuszcze</th>
				<th>Białko</th>
				</tr>
			</thead>
			<tbody className="table-group-divider">
				<tr>
					<td>{recipe.Calories}</td>
					<td>{recipe.Carbs}</td>
					<td>{recipe.Fats}</td>
					<td>{recipe.Proteins}</td>
				</tr>
			</tbody>
			</table>
		</div>
    	</div>
		</div>
	</div>
	)}
	</AnimationFade>
  );
}

export default Recipe;