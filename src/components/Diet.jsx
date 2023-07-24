import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios'
import { ConfigContext } from '../contexts/ConfigProvider';
import AnimationFade from './AnimationFade';

function Diet(){

	const { lastConfig } = useContext(ConfigContext)
	const [products, setProducts] = useState([])
	const [recipes, setRecpies] = useState([])
	const [consumedProducts, setConsumedProducts] = useState([])
	const [productsSummary, setProductsSummary] = useState()

	const [amount, setAmount] = useState(1)
	const [ID, setID] = useState(0)
	const [filter, setFilter] = useState('')
	const formattedDate = new Date().toISOString().slice(0, 10)
	const [date, setDate] = useState(formattedDate)
	const [isLoading, setIsLoading] = useState(true)

	const [time, setTime] = useState('breakfast')

	useEffect(() => {
		Axios.get("http://localhost/API/Products.php")
		.then((response) => {
			setIsLoading(false);
			setProducts(response.data);
		})
		.catch((error) => {
			setIsLoading(true);
			console.log(error);
		})

		Axios.get("http://localhost/API/Recipes.php")
		.then((response) => {
			setIsLoading(false);
			setRecpies(response.data);
		})
		.catch((error) => {
			setIsLoading(true);
			console.log(error);
		})
	}, [] )

	useEffect(() => {
		summary()
	}, [consumedProducts])

	const handleFilter = (e) => {
		setFilter(e.target.value);
	}
	
	const filteredProducts = products.filter(product => {
		return product.Name.toLowerCase().includes(filter.toLowerCase())
	})

	const filteredRecipes = recipes.filter(recipe => {
		return recipe.Name.toLowerCase().includes(filter.toLowerCase())
	})

	const addProduct = (id) => {
		const newProduct = products.find(p => p.Id === id)
		setID(ID+1)
		setConsumedProducts([...consumedProducts, { ...newProduct, Id: ID , Time: time}])
	}

	const addRecipe = (id) => {
		const newRecipe = recipes.find(r => r.Id === id);
		setID(ID+1)
		setConsumedProducts([...consumedProducts, { ...newRecipe, Id: ID , Time: time}]);
	}
	  
	const removeProduct = (id) => {
		setConsumedProducts(consumedProducts.filter(p => p.Id !== id))
	}

	const editProduct = (id) => {
		const editedProduct = consumedProducts.find(p => p.Id === id)
		const editedProductIndex = consumedProducts.findIndex(p => p.Id === id)

		editedProduct.Name = editedProduct.Name + ' x' + amount
		editedProduct.Calories *= amount
		editedProduct.Carbs *= amount
		editedProduct.Fats *= amount
		editedProduct.Proteins *= amount

		const updatedProducts = consumedProducts.map((element, index) => {
			if (index == editedProductIndex) {
			  return editedProduct || element
			} else {
			  return element
			}
		  })

		setConsumedProducts(updatedProducts)
		setAmount(1)
	}

	const deleteDay = () => {
		setID(0)
		setConsumedProducts([])
	}

	const summary = () => {
		const productsSummary = {
			Id: consumedProducts.length,
			Name: "",
			Calories: consumedProducts.reduce((sum, row) => sum + Number(row.Calories), 0),
			Carbs: consumedProducts.reduce((sum, row) => sum + Number(row.Carbs), 0),
			Fats: consumedProducts.reduce((sum, row) => sum + Number(row.Fats), 0),
			Proteins: consumedProducts.reduce((sum, row) => sum + Number(row.Proteins), 0),
		}
		setProductsSummary(productsSummary)
	}

	const [productName, setProductName] = useState("Produkt")
	const [productCalories, setProductCalories] = useState(0)
	const [productCarbs, setProductCarbs] = useState(0)
	const [productFats, setProductFats] = useState(0)
	const [productProteins, setProductProteins] = useState(0)
	let ownProduct
	
	useEffect(() => {
		ownProduct = {
			Id: 0,
			Name: productName,
			Calories: productCalories,
			Carbs: productCarbs,
			Fats: productFats,
			Proteins: productProteins
		}
	}, [productName,productCalories,productCarbs,productFats,productProteins])

	const addOwnProduct = () => {
		setID(ID+1)
		setConsumedProducts([...consumedProducts, { ...ownProduct, Id: ID, Time: time } ])
	}

    return(
	<AnimationFade>
	<h1 className='col-lg-4 col-sm-12 fw-bold'>DIETA</h1>
	<div className='row'>
	  <div className="col-lg-6 ">

	<ul className="nav nav-pills mb-3 nav-fill" id="ex-with-icons-2" role="tablist">
		<li className="nav-item" role="presentation">
			<a className="nav-link shadow-3 active" id="ex-with-icons-tab-1-2" data-mdb-toggle="tab" href="#ex-with-icons-tabs-1-2" role="tab"
			aria-controls="ex-with-icons-tabs-1-2" aria-selected="true" name="breakfast" onClick={(e) => setTime(e.target.name)}>Śniadanie</a>
		</li>
		<li className="nav-item" role="presentation">
			<a className="nav-link shadow-3" id="ex-with-icons-tab-2-2" data-mdb-toggle="tab" href="#ex-with-icons-tabs-2-2" role="tab"
			aria-controls="ex-with-icons-tabs-2-2" aria-selected="false" name="dinner" onClick={(e) => setTime(e.target.name)}>Obiad</a>
		</li>
		<li className="nav-item" role="presentation">
			<a className="nav-link shadow-3" id="ex-with-icons-tab-3-2" data-mdb-toggle="tab" href="#ex-with-icons-tabs-3-2" role="tab"
			aria-controls="ex-with-icons-tabs-3-2" aria-selected="false" name="snack" onClick={(e) => setTime(e.target.name)}>Przekąska</a>
		</li>
		<li className="nav-item" role="presentation">
			<a className="nav-link shadow-3" id="ex-with-icons-tab-4-2" data-mdb-toggle="tab" href="#ex-with-icons-tabs-4-2" role="tab"
			aria-controls="ex-with-icons-tabs-4-2" aria-selected="false" name="supper" onClick={(e) => setTime(e.target.name)}>Kolacja</a>
		</li>
	</ul>
<div className="tab-content" id="ex-with-icons-content">
  <div className="tab-pane fade show active" id="ex-with-icons-tabs-1-2" role="tabpanel" aria-labelledby="ex-with-icons-tab-1-2">
  	<div className='table-responsive'>
		<table className='table table-striped table-sm'>
		<thead>
			<tr>
			<th></th>
			<th className='fw-bold'>Kalorie</th>
			<th className='fw-bold'>Węglowodany</th>
			<th className='fw-bold'>Tłuszcze</th>
			<th className='fw-bold'>Białko</th>
			<th></th>
			<th></th>
			</tr>
		</thead>
		<tbody className="table-group-divider">
				{consumedProducts.length > 0 && consumedProducts.filter(f => f.Time == 'breakfast').map(p => (
				<tr key={p.Id}>
					<td>{p.Name}</td>
					<td>{p.Calories}</td>
					<td>{p.Carbs}</td>
					<td>{p.Fats}</td>
					<td>{p.Proteins}</td>
					<td><button className='btn btn-primary btn-floating' data-mdb-toggle="modal" data-mdb-target="#adjust" onClick={() => setID(p.Id)}><i className='fa-solid fa-scale-unbalanced-flip'></i></button></td>
					<td><button className='btn btn-danger btn-floating' onClick={() => removeProduct(p.Id)}><i className='fa-solid fa-trash'></i></button></td>
				</tr>
				))}
		</tbody>
		</table>
		</div>
  </div>
  <div className="tab-pane fade" id="ex-with-icons-tabs-2-2" role="tabpanel" aria-labelledby="ex-with-icons-tab-2-2">
  <div className='table-responsive'>
			<table className='table table-striped table-sm'>
			<thead>
				<tr>
				<th></th>
				<th className='fw-bold'>Kalorie</th>
				<th className='fw-bold'>Węglowodany</th>
				<th className='fw-bold'>Tłuszcze</th>
				<th className='fw-bold'>Białko</th>
				<th></th>
				<th></th>
				</tr>
			</thead>
			<tbody className="table-group-divider">
					{consumedProducts.length > 0 && consumedProducts.filter(f => f.Time == 'dinner').map(p => (
					<tr key={p.Id}>
						<td>{p.Name}</td>
						<td>{p.Calories}</td>
						<td>{p.Carbs}</td>
						<td>{p.Fats}</td>
						<td>{p.Proteins}</td>
						<td><button className='btn btn-primary btn-floating' data-mdb-toggle="modal" data-mdb-target="#adjust" onClick={() => setID(p.Id)}><i className='fa-solid fa-scale-unbalanced-flip'></i></button></td>
						<td><button className='btn btn-danger btn-floating' onClick={() => removeProduct(p.Id)}><i className='fa-solid fa-trash'></i></button></td>
					</tr>
					))}
			</tbody>
			</table>
		</div>
  </div>
  <div className="tab-pane fade" id="ex-with-icons-tabs-3-2" role="tabpanel" aria-labelledby="ex-with-icons-tab-3-2">
  <div className='table-responsive'>
			<table className='table table-striped table-sm'>
			<thead>
				<tr>
				<th></th>
				<th className='fw-bold'>Kalorie</th>
				<th className='fw-bold'>Węglowodany</th>
				<th className='fw-bold'>Tłuszcze</th>
				<th className='fw-bold'>Białko</th>
				<th></th>
				<th></th>
				</tr>
			</thead>
			<tbody className="table-group-divider">
					{consumedProducts.length > 0 && consumedProducts.filter(f => f.Time == 'snack').map(p => (
					<tr key={p.Id}>
						<td>{p.Name}</td>
						<td>{p.Calories}</td>
						<td>{p.Carbs}</td>
						<td>{p.Fats}</td>
						<td>{p.Proteins}</td>
						<td><button className='btn btn-primary btn-floating' data-mdb-toggle="modal" data-mdb-target="#adjust" onClick={() => setID(p.Id)}><i className='fa-solid fa-scale-unbalanced-flip'></i></button></td>
						<td><button className='btn btn-danger btn-floating' onClick={() => removeProduct(p.Id)}><i className='fa-solid fa-trash'></i></button></td>
					</tr>
					))}
			</tbody>
			</table>
		</div>
  </div>
  <div className="tab-pane fade" id="ex-with-icons-tabs-4-2" role="tabpanel" aria-labelledby="ex-with-icons-tab-4-2">
  <div className='table-responsive'>
			<table className='table table-striped table-sm'>
			<thead>
				<tr>
				<th></th>
				<th className='fw-bold'>Kalorie</th>
				<th className='fw-bold'>Węglowodany</th>
				<th className='fw-bold'>Tłuszcze</th>
				<th className='fw-bold'>Białko</th>
				<th></th>
				<th></th>
				</tr>
			</thead>
			<tbody className="table-group-divider">
					{consumedProducts.length > 0 && consumedProducts.filter(f => f.Time == 'supper').map(p => (
					<tr key={p.Id}>
						<td>{p.Name}</td>
						<td>{p.Calories}</td>
						<td>{p.Carbs}</td>
						<td>{p.Fats}</td>
						<td>{p.Proteins}</td>
						<td><button className='btn btn-primary btn-floating' data-mdb-toggle="modal" data-mdb-target="#adjust" onClick={() => setID(p.Id)}><i className='fa-solid fa-scale-unbalanced-flip'></i></button></td>
						<td><button className='btn btn-danger btn-floating' onClick={() => removeProduct(p.Id)}><i className='fa-solid fa-trash'></i></button></td>
					</tr>
					))}
			</tbody>
			</table>
		</div>
  </div>
</div>

	<div className="card mt-3">
		<div className="card-body">
			Kalorie {productsSummary?.Calories}/{lastConfig?.Calories}
			Węglowodany {productsSummary?.Carbs}/{lastConfig?.Carbs}
			Tłuszcze {productsSummary?.Fats}/{lastConfig?.Fats}
			Białko {productsSummary?.Proteins}/{lastConfig?.Proteins}
		</div>
	</div>

		<div className='mt-3 d-md-flex d-none'>
			<div className='col-lg-4 '>
				<button className='btn btn-danger' onClick={deleteDay}><i className='fa-solid fa-trash me-2'></i>Wyczyść</button>
			</div>
			<div className='col col-lg-8'>
				<div className="input-group">	
						<input type="date" className='form-control' defaultValue={date}/>
						<button className='btn btn-primary'>Zapisz dzień</button>
				</div>
			</div>
		</div>
	</div>
		
		
	<div className='col-lg-6'>

<ul className="nav nav-pills mb-3 nav-fill" id="ex-with-icons" role="tablist">
  <li className="nav-item" role="presentation">
    <a className="nav-link shadow-3 active" id="ex-with-icons-tab-1" data-mdb-toggle="tab" href="#ex-with-icons-tabs-1" role="tab"
      aria-controls="ex-with-icons-tabs-1" aria-selected="true"><i className="fa-regular fa-apple-whole fa-xl me-2"></i>Produkty</a>
  </li>
  <li className="nav-item" role="presentation">
    <a className="nav-link shadow-3" id="ex-with-icons-tab-2" data-mdb-toggle="tab" href="#ex-with-icons-tabs-2" role="tab"
      aria-controls="ex-with-icons-tabs-2" aria-selected="false"><i className="fa-regular fa-bowl-food fa-xl me-2"></i>Dania</a>
  </li>
</ul>

<div className="input-group mb-3">
	<input type="text" className="form-control" name="search" placeholder="Wyszukaj..." onChange={handleFilter}/>
	<button className="btn btn-primary" name="search" type="button">
		<i className="fa fa-search"></i>
	</button>
</div>

<div className="tab-content" id="ex-with-icons-content">
  <div className="tab-pane fade show active" id="ex-with-icons-tabs-1" role="tabpanel" aria-labelledby="ex-with-icons-tab-1">
  <div className='table-responsive'>
			<table className='table table-striped table-sm'>
			<thead>
				<tr>
					<th></th>
					<th className='fw-bold'>Kalorie</th>
					<th className='fw-bold'>Węglowodany</th>
					<th className='fw-bold'>Tłuszcze</th>
					<th className='fw-bold'>Białko</th>
					<th></th>
				</tr>
			</thead>
			<tbody className="table-group-divider">
			{isLoading ? (
			<>
				<tr>
					<td colSpan={6}>
						<div className="d-flex align-items-center">
							Pobieranie danych...
							<div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
						</div>
					</td>
				</tr>
			</>
			) : (
				filteredProducts.map(p => (
				<tr key={p.Id}>
					<td>{p.Name}</td>
					<td>{p.Calories}</td>
					<td>{p.Carbs}</td>
					<td>{p.Fats}</td>
					<td>{p.Proteins}</td>
					<td><button className='btn btn-success btn-floating' onClick={() => addProduct(p.Id)}><i className='fa-solid fa-plus'></i></button></td>
				</tr>
				)))}
			</tbody>
			</table>
		</div>
  </div>
  <div className="tab-pane fade" id="ex-with-icons-tabs-2" role="tabpanel" aria-labelledby="ex-with-icons-tab-2">
  <div className='table-responsive' >
			<table className='table table-striped table-sm'>
			<thead>
				<tr>
					<th></th>
					<th className='fw-bold'>Kalorie</th>
					<th className='fw-bold'>Węglowodany</th>
					<th className='fw-bold'>Tłuszcze</th>
					<th className='fw-bold'>Białko</th>
					<th></th>
					<th></th>
				</tr>
			</thead>
			<tbody className="table-group-divider">
			{isLoading ? (
			<>
				<tr>
					<td colSpan={6}>
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
					<td>{r.Name}</td>
					<td>{r.Calories}</td>
					<td>{r.Carbs}</td>
					<td>{r.Fats}</td>
					<td>{r.Proteins}</td>
					<td><button className='btn btn-success btn-floating' onClick={() => addRecipe(r.Id)}><i className='fa-solid fa-plus'></i></button></td>
					<td><Link to={`/recipes/details/${r.Id}`}><button className='btn btn-primary btn-floating'><i className='fa-solid fa-info'></i></button></Link></td>
				</tr>
				)))}
			</tbody>
			</table>
		</div>
  </div>
	
	<div className='row mt-3'>
		<div className='col-lg-4 col-sm-12'>
			<button type="button" className="btn btn-success" data-mdb-toggle="modal" data-mdb-target="#addModal">Dodaj produkt</button>
		</div>
			<div className='mt-3 d-s -flex d-none'>
				<div className='col-lg-4 '>
					<button className='btn btn-danger' onClick={deleteDay}><i className='fa-solid fa-trash me-2'></i>Wyczyść</button>
				</div>
				<div className='col col-lg-8'>
					<div className="input-group">	
							<input type="date" className='form-control' defaultValue={date}/>
							<button className='btn btn-primary'>Zapisz dzień</button>
					</div>
				</div>
			</div>
	</div>
		
</div>
</div>
</div>

	<div className="modal fade" id="addModal" tabIndex={-1} aria-labelledby="addModal" aria-hidden="true">
		<div className="modal-dialog">
			<div className="modal-content">
			<div className="modal-header">
				<h5 className="modal-title" id="addModal">Dodaj własny produkt</h5>
				<button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
			</div>
			<div className="modal-body">			
				<form>
					<label htmlFor='name' className='form-label'>Nazwa</label>
					<input type="text" className="form-control" name="name" onChange={(e) => setProductName(e.target.value)} required/>
					<label htmlFor='calories' className='form-label mt-3'>Kalorie</label>
					<input type="number" className="form-control" name="calories" onChange={(e) => setProductCalories(e.target.value)} required/>
					<label htmlFor='carbs' className='form-label mt-3'>Węglowodany</label>
					<input type="number" className="form-control" name="carbs" onChange={(e) => setProductCarbs(e.target.value)} required/>
					<label htmlFor='fats' className='form-label mt-3'>Tłuszcze</label>
					<input type="number" className="form-control" name="fats" onChange={(e) => setProductFats(e.target.value)} required/>
					<label htmlFor='protein' className='form-label mt-3'>Białko</label>
					<input type="number" className="form-control" name="protein" onChange={(e) => setProductProteins(e.target.value)} required/>
				</form>
			</div>
			<div className="modal-footer">
				<button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Anuluj</button>
				<button type="button" className="btn btn-primary" onClick={addOwnProduct} data-mdb-dismiss="modal">Dodaj</button>
			</div>
			</div>
		</div>
	</div>

	<div className="modal fade" id="adjust" tabIndex={-1} aria-labelledby="adjust" aria-hidden="true">
		<div className="modal-dialog">
			<div className="modal-content">
			<div className="modal-header">
				<h5 className="modal-title" id="adjust">Dostosuj ilość</h5>
				<button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
			</div>
			<div className="modal-body">			
				<label htmlFor='amount'>Podaj ilość</label>
				<input type="number" className="form-control" name="amount" step="0.5" value={amount} onChange={(e) => setAmount(e.target.valueAsNumber)}/>
			</div>
			<div className="modal-footer">
				<button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Anuluj</button>
				<button type="button" className="btn btn-primary" onClick={() => editProduct(ID)} data-mdb-dismiss="modal">Dostosuj</button>
			</div>
			</div>
		</div>
	</div>
	</AnimationFade>
    )
}

export default Diet;