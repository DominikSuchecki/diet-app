import { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { TagsInput } from 'react-tag-input-component';
import AnimationFade from './AnimationFade';
import { AuthContext } from '../contexts/AuthProvider';

function Recipes() {

	const { auth } = useContext(AuthContext)
	const params = useParams();
	const [recipes, setRecipes] = useState([]);
	const [filter, setFilter] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const [id, setId] = useState(null)
	const [name, setName] = useState("Produkt")
	const [calories, setCalories] = useState(0)
	const [carbs, setCarbs] = useState(0)
	const [fats, setFats] = useState(0)
	const [proteins, setPrtoeins] = useState(0)
	const [description, setDescription] = useState('')
	const [ingredients, setIngredients] = useState(["Składnik"]);
	const [time, setTime] = useState(0)
	const [portions, setPortions] = useState(1)
	const [difficulty, setDifficulty] = useState(1)
	const [image, setImage] = useState(null)

	useEffect(() => {
	Axios.get(`http://localhost/API/Recipes.php`)
	.then((response) => {
		setRecipes(response.data);
		setIsLoading(false);
	})
	.catch((error) => {
		console.log(error);
		setIsLoading(true);
	})
	}, []);

	const handleFilter = (e) => {
		setFilter(e.target.value);
	}

	const handleFileChange = (e) => {
    	setImage(e.target.files[0]);
  	};

	const filteredRecipes = recipes.filter(recipe => {
		return recipe.Name.toLowerCase().includes(filter.toLowerCase())
	})

	const addRecipe = () => {
		Axios.post('http://localhost/API/Recipes.php', {
			name: name,
			calories: calories,
			carbs: carbs,
			fats: fats,
			proteins: proteins,
			description: description,
			ingredients: ingredients,
			time: time,
			difficulty: difficulty,
			portions: portions
		}).then((response) => {
			console.log(response)
		}).catch((error) => {
			console.log(error)
		})
	}

	const deleteRecipe = () => {
		Axios.delete(`http://localhost/API/Recipes.php?id=${id}`)
		.then((response) => {
			console.log(response);
		}).catch((error) => {
			console.log(error);
		})
	}

  return (
	<AnimationFade>
	<h1 className='col-lg-4 col-sm-12 fw-bold'>PRZEPISY</h1>
    <div>
	<div className="row mb-3">
		<div className="input-group col">
			<input type="text" className="form-control" name="search" placeholder="Wyszukaj..." onChange={handleFilter}/>
			<button className="btn btn-primary" name="search" type="button">
				<i className="fa fa-search"></i>
			</button>
		</div>
		{ auth && (
			<div className="col"> 
				<button type="button" className="btn btn-success" data-mdb-toggle="modal" data-mdb-target="#addModal">Dodaj przepis</button>
			</div>
		)}
	</div>
	<div className='table-responsive' style={{maxHeight:'500px'}}>
		<table className='table table-striped table-sm'>
			<thead>
				<tr>
				<th></th>
				<th></th>
				<th className='fw-bold'>Kalorie</th>
				<th className='fw-bold'>Węglowodany</th>
				<th className='fw-bold'>Tłuszcze</th>
				<th className='fw-bold'>Białko</th>
				<th></th>
				<th></th>
				</tr>
			</thead>
			<tbody>
				{isLoading ? (
					<>
					<tr>
						<td colSpan={8}>
							<div className="d-flex align-items-center">
								Pobieranie danych...
								<div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
							</div>
						</td>
					</tr>
				</>
				) : (
					filteredRecipes.map(r => (				
					<tr key={r.Id}>
						<td><img src={r.ImagePath} style={{maxWidth:100, maxHeight:100, aspectRatio:1, objectFit:'cover'}} alt={r.Name} loading='lazy'></img></td>
						<td>{r.Name}</td>
						<td>{r.Calories}</td>
						<td>{r.Carbs}</td>
						<td>{r.Fats}</td>
						<td>{r.Proteins}</td>
						<td><Link to={`/recipes/details/${r.Id}`}><button className='btn btn-primary btn-floating'><i className='fa-solid fa-info'></i></button></Link></td>
						<td><button className='btn btn-danger btn-floating' data-mdb-toggle="modal" data-mdb-target="#deleteModal" onClick={() => setId(r.Id)} ><i className='fa-solid fa-trash'></i></button></td>
					</tr>
				)))}
			</tbody>
			</table>
		</div>
	</div>

	<div className="modal fade" id="addModal" tabIndex={-1} aria-labelledby="addModal" aria-hidden="true">
		<div className="modal-dialog">
			<div className="modal-content">
			<div className="modal-header">
				<h5 className="modal-title" id="addModal">DODAWANIE PRZEPISU</h5>
				<button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
			</div>
			<div className="modal-body">	

			<ul className="nav nav-tabs nav-fill mb-3" id="ex1" role="tablist">
			<li className="nav-item" role="presentation">
				<a
				className="nav-link active"
				id="ex2-tab-1"
				data-mdb-toggle="tab"
				href="#ex2-tabs-1"
				role="tab"
				aria-controls="ex2-tabs-1"
				aria-selected="true"
				>Informacje</a>
			</li>
			<li className="nav-item" role="presentation">
				<a
				className="nav-link"
				id="ex2-tab-2"
				data-mdb-toggle="tab"
				href="#ex2-tabs-2"
				role="tab"
				aria-controls="ex2-tabs-2"
				aria-selected="false"
				>Makroskładniki</a>
			</li>
			<li className="nav-item" role="presentation">
				<a
				className="nav-link"
				id="ex2-tab-3"
				data-mdb-toggle="tab"
				href="#ex2-tabs-3"
				role="tab"
				aria-controls="ex2-tabs-3"
				aria-selected="false"
				>Opcjonalne</a>
			</li>
			</ul>

			<div className="tab-content" id="ex2-content">
			<div
				className="tab-pane fade show active"
				id="ex2-tabs-1"
				role="tabpanel"
				aria-labelledby="ex2-tab-1"
			>
				<form>
					<label htmlFor='name' className='form-label'>Nazwa</label>
					<input type="text" className="form-control" name="name" required onChange={(e) => setName(e.target.value)}/>
					<label htmlFor='calories' className='form-label mt-3'>Składniki</label>
					<TagsInput
						value={ingredients}
						onChange={setIngredients}
						name="ingredients"
					/>
					<label htmlFor='carbs' className='form-label mt-3'>Sposób przygotowania</label>
					<textarea className='form-control' onChange={(e) => setDescription(e.target.value)}></textarea>
				</form>
			</div>
			<div
				className="tab-pane fade"
				id="ex2-tabs-2"
				role="tabpanel"
				aria-labelledby="ex2-tab-2"
			>
				<form>
					<label htmlFor='calories' className='form-label'>Kalorie</label>
					<input type="number" className="form-control" name="calories" required onChange={(e) => setCalories(e.target.value)}/>
					<label htmlFor='carbs' className='form-label mt-3'>Węglowodany</label>
					<input type="number" className="form-control" name="carbs" required onChange={(e) => setCarbs(e.target.value)}/>
					<label htmlFor='fats' className='form-label mt-3'>Tłuszcze</label>
					<input type="number" className="form-control" name="fats" required onChange={(e) => setFats(e.target.value)}/>
					<label htmlFor='proteins' className='form-label mt-3'>Białko</label>
					<input type="number" className="form-control" name="proteins" required onChange={(e) => setPrtoeins(e.target.value)}/>
				</form>
			</div>
			<div
				className="tab-pane fade"
				id="ex2-tabs-3"
				role="tabpanel"
				aria-labelledby="ex2-tab-3"
			>
				<form>
					<label htmlFor='calories' className='form-label mt-3'>Ilość porcji</label>
					<input type="number" className="form-control" name="calories" required onChange={(e) => setPortions(e.target.value)}/>
					<label htmlFor='calories' className='form-label mt-3'>Czas przygotowania (min.)</label>
					<input type="number" className="form-control" name="calories" required onChange={(e) => setTime(e.target.value)}/>
					<label htmlFor='calories' className='form-label mt-3'>Poziom trudności</label>
					<div>
						<div className="btn-group">
						<input type="radio" className="btn-check" name="options" id="option1" value='1' onChange={(e) => setDifficulty(e.target.value)}/>
						<label className="btn btn-secondary" htmlFor="option1">Łatwy</label>
						<input type="radio" className="btn-check" name="options" id="option2" value='2' onChange={(e) => setDifficulty(e.target.value)}/>
						<label className="btn btn-secondary" htmlFor="option2">Średni</label>
						<input type="radio" className="btn-check" name="options" id="option3" value='3' onChange={(e) => setDifficulty(e.target.value)}/>
						<label className="btn btn-secondary" htmlFor="option3">Trudny</label>
						</div>
					</div>
					<label className="form-label mt-3" htmlFor="customFile">Dodaj zdjęcie</label>
					<input type="file" className="form-control" id="customFile" onChange={handleFileChange}/>
				</form>
			</div>
			</div>

			</div>
			<div className="modal-footer">
				<button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Anuluj</button>
				<button type="button" className="btn btn-success" data-mdb-dismiss="modal" onClick={addRecipe}>Dodaj</button>
			</div>
		</div>
		</div>
	</div>

	<div className="modal fade" id="deleteModal" tabIndex={-1} aria-labelledby="deleteModal" aria-hidden="true">
		<div className="modal-dialog">
			<div className="modal-content">
			<div className="modal-header">
				<h5 className="modal-title" id="deleteModal">Usuń przepis</h5>
				<button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
			</div>
			<div className="modal-body">
				<div className='d-flex justify-content-between'>
					<button type="button" className="btn btn-primary d-block" data-mdb-dismiss="modal">Anuluj</button>
					<button type="button" className="btn btn-danger d-block" data-mdb-dismiss="modal" onClick={deleteRecipe}>Usuń</button>
			</div>
			</div>
			</div>
		</div>
	</div>
	</AnimationFade>
  );
}

export default Recipes;