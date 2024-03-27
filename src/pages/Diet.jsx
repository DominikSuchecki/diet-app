import { useState, useEffect, useContext } from 'react'
import Axios from 'axios'
import { ConfigContext } from '../contexts/ConfigProvider';
import { AuthContext } from '../contexts/AuthProvider';
import { DietContext} from '../contexts/DietProvider'
import Alert from '../components/Alert';
import InfoAlert from '../components/InfoAlert';
import { API_URL } from '../api';

const Diet = () => {

	const { token } = useContext(AuthContext);
	const { lastConfig } = useContext(ConfigContext)
	const { update, setUpdate } = useContext(DietContext);
	const [products, setProducts] = useState([])
	const [consumedProducts, setConsumedProducts] = useState([])
	const [productsSummary, setProductsSummary] = useState()
	const [time, setTime] = useState('breakfast')
	const [amount, setAmount] = useState(1)
	const [ID, setID] = useState(0)
	const [filter, setFilter] = useState('')
	const formattedDate = new Date().toISOString().slice(0, 10)
	const [date, setDate] = useState(formattedDate)
	const [isLoading, setIsLoading] = useState(true)
	const [message, setMessage] = useState(["", 0])

	const [productName, setProductName] = useState("Produkt")
	const [productCalories, setProductCalories] = useState(0)
	const [productCarbs, setProductCarbs] = useState(0)
	const [productFats, setProductFats] = useState(0)
	const [productProteins, setProductProteins] = useState(0)
	let ownProduct

	useEffect(() => {
		Axios.get(`${API_URL}/products`,
		{
			headers: {Authorization: `Bearer ${token}`},
		})
		.then(response => {
		  setProducts(response.data);
		  setIsLoading(false);
		})
		.catch(error => {
		  setIsLoading(false);
		});

		const storedConsumed = localStorage.getItem('consumedProducts');
		storedConsumed && setConsumedProducts(JSON.parse(storedConsumed))
	}, [])

	const handleSubmit = () => {
		Axios.post(`${API_URL}/diet`, 
		{
			date: date,
			calories_eaten: productsSummary.calories,
			calories_goal: lastConfig.calories,
			carbs_eaten: productsSummary.carbs,
			carbs_goal: lastConfig.carbs,
			fats_eaten: productsSummary.fats,
			fats_goal: lastConfig.fats,
			proteins_eaten: productsSummary.proteins,
			proteins_goal: lastConfig.proteins,
			products_eaten: JSON.stringify(consumedProducts)
		},
		{
			headers: {Authorization: `Bearer ${token}`},
		}
		)
		.then((response) => {
			setMessage(["Diet created", 1])
			setUpdate(!update);
		})
		.catch((error) => {
			setMessage(["Couldnt create diet", 0])
		});
	}

	useEffect(() => {
		localStorage.setItem('consumedProducts', JSON.stringify(consumedProducts));
		summary()
	}, [consumedProducts])

	const handleFilter = (e) => {
		setFilter(e.target.value.toLowerCase());
	}
	
	const filteredProducts = products.filter(product => {
		return product.name?.toLowerCase().includes(filter.toLowerCase())
	})

	const addProduct = (id) => {
		const newProduct = products.find(p => p.id === id)
		setID(ID+1)
		setConsumedProducts([...consumedProducts, { ...newProduct, id: ID , time: time}])
	}
	  
	const removeProduct = (id) => {
		setConsumedProducts(consumedProducts.filter(p => p.id !== id))
	}

	const editProduct = (id) => {
		const editedProduct = consumedProducts.find(p => p.id === id)
		const editedProductIndex = consumedProducts.findIndex(p => p.id === id)

		editedProduct.name = editedProduct.name + ' x' + amount
		editedProduct.calories *= amount
		editedProduct.carbs *= amount
		editedProduct.fats *= amount
		editedProduct.proteins *= amount

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

	const clearDay = () => {
		setID(0)
		setConsumedProducts([])
	}

	const summary = () => {
		const productsSummary = {
			id: consumedProducts.length, name: "",
			calories: consumedProducts.reduce((sum, row) => sum + Number(row.calories), 0),
			carbs: consumedProducts.reduce((sum, row) => sum + Number(row.carbs), 0),
			fats: consumedProducts.reduce((sum, row) => sum + Number(row.fats), 0),
			proteins: consumedProducts.reduce((sum, row) => sum + Number(row.proteins), 0),
		}
		setProductsSummary(productsSummary)
	}
	
	useEffect(() => {
		ownProduct = {
			id: 0,
			name: productName,
			calories: productCalories,
			carbs: productCarbs,
			fats: productFats,
			proteins: productProteins
		}
	}, [productName,productCalories,productCarbs,productFats,productProteins])

	const addOwnProduct = () => {
		setID(ID+1)
		setConsumedProducts([...consumedProducts, { ...ownProduct, id: ID, time: time } ])
	}				

    return(
	<>
	<h1 className='col-lg-4 col-sm-12 fw-bold'>DIET</h1>
	<div className='row'>
	  <div className="col-lg-6 ">

	<ul className="nav nav-pills nav-justified mb-4" id="ex-with-icons-2" role="tablist">
		<li className="nav-item" role="presentation">
			<a className="nav-link shadow-3 active col" id="ex-with-icons-tab-1-2" data-mdb-toggle="tab" href="#ex-with-icons-tabs-1-2" role="tab"
			aria-controls="ex-with-icons-tabs-1-2" aria-selected="true" name="breakfast" onClick={(e) => setTime(e.target.name)}>Breakfast</a>
		</li>
		<li className="nav-item" role="presentation">
			<a className="nav-link shadow-3 col" id="ex-with-icons-tab-2-2" data-mdb-toggle="tab" href="#ex-with-icons-tabs-2-2" role="tab"
			aria-controls="ex-with-icons-tabs-2-2" aria-selected="false" name="dinner" onClick={(e) => setTime(e.target.name)}>Dinner</a>
		</li>
		<li className="nav-item" role="presentation">
			<a className="nav-link shadow-3 col" id="ex-with-icons-tab-3-2" data-mdb-toggle="tab" href="#ex-with-icons-tabs-3-2" role="tab"
			aria-controls="ex-with-icons-tabs-3-2" aria-selected="false" name="snack" onClick={(e) => setTime(e.target.name)}>Snack</a>
		</li>
		<li className="nav-item" role="presentation">
			<a className="nav-link shadow-3 col" id="ex-with-icons-tab-4-2" data-mdb-toggle="tab" href="#ex-with-icons-tabs-4-2" role="tab"
			aria-controls="ex-with-icons-tabs-4-2" aria-selected="false" name="supper" onClick={(e) => setTime(e.target.name)}>Supper</a>
		</li>
  	</ul>

<div className="tab-content" id="ex-with-icons-content">
  <div className="tab-pane fade show active" id="ex-with-icons-tabs-1-2" role="tabpanel" aria-labelledby="ex-with-icons-tab-1-2">
  	<div className='table-responsive'>
		<table className='table table-striped table-sm'>
		<thead>
			<tr>
				<th></th>
				<th className='fw-bold col-3'>Calories</th>
				<th className='fw-bold col-3'>C</th>
				<th className='fw-bold col-3'>F</th>
				<th className='fw-bold col-3'>P</th>
				<th></th>
				<th></th>
			</tr>
		</thead>
		<tbody className="table-group-divider">
				{consumedProducts.length > 0 && consumedProducts.filter(f => f.time == 'breakfast').map(p => (
				<tr key={p.id}>
					<td>{p.name}</td>
					<td>{p.calories}</td>
					<td>{p.carbs}</td>
					<td>{p.fats}</td>
					<td>{p.proteins}</td>
					<td><button className='btn btn-primary btn-floating' data-mdb-toggle="modal" data-mdb-target="#adjust" onClick={() => setID(p.id)}><i className='fa-solid fa-scale-unbalanced-flip'></i></button></td>
					<td><button className='btn btn-danger btn-floating' onClick={() => removeProduct(p.id)}><i className='fa-solid fa-trash'></i></button></td>
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
				<th className='fw-bold col-3'>Calories</th>
				<th className='fw-bold col-3'>C</th>
				<th className='fw-bold col-3'>F</th>
				<th className='fw-bold col-3'>P</th>
				<th></th>
				<th></th>
				</tr>
			</thead>
			<tbody className="table-group-divider">
					{consumedProducts.length > 0 && consumedProducts.filter(f => f.time == 'dinner').map(p => (
					<tr key={p.id}>
						<td>{p.name}</td>
						<td>{p.calories}</td>
						<td>{p.carbs}</td>
						<td>{p.fats}</td>
						<td>{p.proteins}</td>
						<td><button className='btn btn-primary btn-floating' data-mdb-toggle="modal" data-mdb-target="#adjust" onClick={() => setID(p.od)}><i className='fa-solid fa-scale-unbalanced-flip'></i></button></td>
						<td><button className='btn btn-danger btn-floating' onClick={() => removeProduct(p.id)}><i className='fa-solid fa-trash'></i></button></td>
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
				<th className='fw-bold col-3'>Calories</th>
				<th className='fw-bold col-3'>C</th>
				<th className='fw-bold col-3'>F</th>
				<th className='fw-bold col-3'>P</th>
				<th></th>
				<th></th>
				</tr>
			</thead>
			<tbody className="table-group-divider">
					{consumedProducts.length > 0 && consumedProducts.filter(f => f.time == 'snack').map(p => (
					<tr key={p.id}>
						<td>{p.name}</td>
						<td>{p.calories}</td>
						<td>{p.carbs}</td>
						<td>{p.fats}</td>
						<td>{p.proteins}</td>
						<td><button className='btn btn-primary btn-floating' data-mdb-toggle="modal" data-mdb-target="#adjust" onClick={() => setID(p.id)}><i className='fa-solid fa-scale-unbalanced-flip'></i></button></td>
						<td><button className='btn btn-danger btn-floating' onClick={() => removeProduct(p.id)}><i className='fa-solid fa-trash'></i></button></td>
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
				<th className='fw-bold col-3'>Calories</th>
				<th className='fw-bold col-3'>C</th>
				<th className='fw-bold col-3'>F</th>
				<th className='fw-bold col-3'>P</th>
				<th></th>
				<th></th>
				</tr>
			</thead>
			<tbody className="table-group-divider">
					{consumedProducts.length > 0 && consumedProducts.filter(f => f.time == 'supper').map(p => (
					<tr key={p.id}>
						<td>{p.name}</td>
						<td>{p.calories}</td>
						<td>{p.carbs}</td>
						<td>{p.fats}</td>
						<td>{p.proteins}</td>
						<td><button className='btn btn-primary btn-floating' data-mdb-toggle="modal" data-mdb-target="#adjust" onClick={() => setID(p.id)}><i className='fa-solid fa-scale-unbalanced-flip'></i></button></td>
						<td><button className='btn btn-danger btn-floating' onClick={() => removeProduct(p.id)}><i className='fa-solid fa-trash'></i></button></td>
					</tr>
					))}
			</tbody>
			</table>
		</div>
  </div>
</div>
			<table className='table table-striped table-sm mt-3'>
				{lastConfig ? (
				<tr className='bg-light shadow-3'>
					<th className='badge-primary  p-2'>Calories {productsSummary?.calories}/{lastConfig?.calories}</th>
					<th className='badge-primary  p-2'>C {productsSummary?.carbs}/{lastConfig?.carbs}</th>
					<th className='badge-primary  p-2'>F {productsSummary?.fats}/{lastConfig?.fats}</th>
					<th className='badge-primary  p-2'>P {productsSummary?.proteins}/{lastConfig?.proteins}</th>
				</tr>
				) : (
					<InfoAlert content="First set your calories intake demand with Calculator"/>
				)
				}
			</table>	
		<div className='mt-3 row'>
			<div className='col col-lg-4'>
				<button className='btn btn-danger'onClick={clearDay}><i className='fa-solid fa-trash'></i></button>
			</div>
			{lastConfig ? (
			<div className='col col-lg-8'>
				<div className="input-group">	
						<input type="date" className='form-control' defaultValue={date} onChange={(e) => setDate(e.target.value)}/>
						<button className='btn btn-primary' type="submit" onClick={handleSubmit}>Save</button>
				</div>
			</div>
			) : <></>
			}
		</div>
		<div className='mt-3 mb-3'>
			{ message[0] != "" && <Alert content={message[0]} success={message[1]} /> }
		</div>
	</div>
		
		
	<div className='col-lg-6'>

<ul className="nav nav-pills mb-3 nav-fill" id="ex-with-icons" role="tablist">
  <li className="nav-item" role="presentation">
    <a className="nav-link shadow-3 active" id="ex-with-icons-tab-1" data-mdb-toggle="tab" href="#ex-with-icons-tabs-1" role="tab"
      aria-controls="ex-with-icons-tabs-1" aria-selected="true"><i className="fa-regular fa-apple-whole fa-xl me-2"></i>Products</a>
  </li>
</ul>

<div className="input-group mb-3">
	<input type="text" className="form-control" name="search" placeholder="Wyszukaj..." onChange={handleFilter}/>
	<button className="btn btn-primary" name="search" type="button">
		<i className="fa fa-search"></i>
	</button>
</div>

<div className="tab-content mb-6" id="ex-with-icons-content">
  <div className="tab-pane fade show active" id="ex-with-icons-tabs-1" role="tabpanel" aria-labelledby="ex-with-icons-tab-1">
  <div className='table-responsive'>
			<table className='table table-striped table-sm'>
			<thead>
				<tr>
					<th></th>
					<th className='fw-bold col-3'>Calories</th>
					<th className='fw-bold col-3'>C</th>
					<th className='fw-bold col-3'>F</th>
					<th className='fw-bold col-3'>P</th>
					<th></th>
				</tr>
			</thead>
			<tbody className="table-group-divider">
			{isLoading ? (
			<>
				<tr>
					<td colSpan={6}>
						<div className="d-flex align-items-center">
							Loading data...
							<div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
						</div>
					</td>
				</tr>
			</>
			) : (
				filteredProducts?.map(p => (

				<tr key={p.id}>
					<td>{p.name}</td>
					<td>{p.calories}</td>
					<td>{p.carbs}</td>
					<td>{p.fats}</td>
					<td>{p.proteins}</td>
					<td><button className='btn btn-success btn-floating' onClick={() => addProduct(p.id)}><i className='fa-solid fa-plus'></i></button></td>
				</tr>
				)))}
			</tbody>
			</table>
		</div>
  </div>
  <div className="tab-pane fade" id="ex-with-icons-tabs-2" role="tabpanel" aria-labelledby="ex-with-icons-tab-2">
  </div>
	
	<div className='row mt-3'>
		<div className='col-lg-4 col-sm-12'>
			<button type="button" className="btn btn-success" data-mdb-toggle="modal" data-mdb-target="#addModal">Add product</button>
		</div>
			<div className='mt-3 d-s -flex d-none'>
				<div className='col-lg-4 '>
					<button className='btn btn-danger' onClick={clearDay}><i className='fa-solid fa-trash me-2'></i>Clear</button>
				</div>
				{lastConfig ? (
				<div className='col col-lg-8'>
					<div className="input-group">	
							<input type="date" className='form-control' defaultValue={date}/>
							<button className='btn btn-primary'>Save</button>
					</div>
				</div>
				) : <></>
				}
			</div>
	</div>

</div>
</div>
</div>

	<div className="modal fade" id="addModal" tabIndex={-1} aria-labelledby="addModal" aria-hidden="true">
		<div className="modal-dialog">
			<div className="modal-content">
			<div className="modal-header">
				<h5 className="modal-title" id="addModal">Add own product</h5>
				<button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
			</div>
			<div className="modal-body">			
				<form>
					<label htmlFor='name' className='form-label'>Name</label>
					<input type="text" className="form-control" name="name" onChange={(e) => setProductName(e.target.value)} required/>
					<label htmlFor='calories' className='form-label mt-3'>Calories</label>
					<input type="number" className="form-control" name="calories" onChange={(e) => setProductCalories(e.target.value)} required/>
					<label htmlFor='carbs' className='form-label mt-3'>Carbs</label>
					<input type="number" className="form-control" name="carbs" onChange={(e) => setProductCarbs(e.target.value)} required/>
					<label htmlFor='fats' className='form-label mt-3'>Fats</label>
					<input type="number" className="form-control" name="fats" onChange={(e) => setProductFats(e.target.value)} required/>
					<label htmlFor='protein' className='form-label mt-3'>Proteins</label>
					<input type="number" className="form-control" name="protein" onChange={(e) => setProductProteins(e.target.value)} required/>
				</form>
			</div>
			<div className="modal-footer">
				<button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Cancel</button>
				<button type="button" className="btn btn-primary" onClick={addOwnProduct} data-mdb-dismiss="modal">Add</button>
			</div>
			</div>
		</div>
	</div>

	<div className="modal fade" id="adjust" tabIndex={-1} aria-labelledby="adjust" aria-hidden="true">
		<div className="modal-dialog">
			<div className="modal-content">
			<div className="modal-header">
				<h5 className="modal-title" id="adjust">Adjust quantity</h5>
				<button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
			</div>
			<div className="modal-body">			
				<label htmlFor='amount'>Quantity</label>
				<input type="number" className="form-control" name="amount" step="0.5" value={amount} onChange={(e) => setAmount(e.target.valueAsNumber)}/>
			</div>
			<div className="modal-footer">
				<button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Cancel</button>
				<button type="button" className="btn btn-primary" onClick={() => editProduct(ID)} data-mdb-dismiss="modal">Adjust</button>
			</div>
			</div>
		</div>
	</div>
	</>
    )
}

export default Diet;