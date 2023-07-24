import { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { TagsInput } from 'react-tag-input-component';
import AnimationFade from './AnimationFade';
import { AuthContext } from '../contexts/AuthProvider';

function Products() {

	const { auth } = useContext(AuthContext)
	const [id, setId] = useState(null)
	const [products, setProducts] = useState([])
	const [filter, setFilter] = useState("")
	const [isLoading, setIsLoading] = useState(true)
	const [productName, setProductName] = useState("Produkt")
	const [productCalories, setProductCalories] = useState(0)
	const [productCarbs, setProductCarbs] = useState(0)
	const [productFats, setProductFats] = useState(0)
	const [productProteins, setProductProteins] = useState(0)

	useEffect(() => {
	Axios.get(`http://localhost/API/Products.php`)
	.then((response) => {
		setProducts(response.data);
		setIsLoading(false);
	})
	.catch((error) => {
		console.log(error);
		setIsLoading(true);
	})
	},[]);

	const handleFilter = (e) => {
	setFilter(e.target.value);
	}

	const addProduct = () => {
		Axios.post('http://localhost/API/Products.php', {
			name: productName,
			calories: productCalories,
			carbs: productCarbs,
			fats: productFats,
			proteins: productProteins
		})
		.then((response) => {
			console.log(response);
		}).catch((error) => {
			console.log(error);
		})
	}

	const handleEdit = (id) => {
		console.log(id)
		const editedProduct = products.find(p.Id == id)
		setProductName(editedProduct.Name)
		setProductCalories(editedProduct.Calories)
		setProductCarbs(editedProduct.Carbs)
		setProductFats(editedProduct.Fats)
		setProductProteins(editedProduct.Proteins)
	}

	const editProduct = () => {
		Axios.put(`http://localhost/API/Products.php?id=${id}`, {
			name: productName,
			calories: productCalories,
			carbs: productCarbs,
			fats: productFats,
			proteins: productProteins
		})
		.then((response) => {
			console.log(response);
		}).catch((error) => {
			console.log(error);
		})
	}

	const deleteProduct = () => {
		Axios.delete(`http://localhost/API/Products.php?id=${id}`)
		.then((response) => {
			console.log(response);
		}).catch((error) => {
			console.log(error);
		})
	}

	const filteredProducts = products.filter(product => {
		return product.Name.toLowerCase().includes(filter.toLowerCase())
	})

	return (
	<AnimationFade>
	<h1 className='col-lg-4 col-sm-12 fw-bold'>PRODUKTY</h1>
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
				<button type="button" className="btn btn-success" data-mdb-toggle="modal" data-mdb-target="#addModal">Dodaj produkt</button>
			</div>
		)}
	</div>
	<div className='table-responsive' style={{maxHeight:'500px'}}>
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
			<tbody>
				{isLoading ? (
					<>
					<tr>
						<td colSpan={5}>
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
						<td><button className='btn btn-primary btn-floating' data-mdb-toggle="modal" data-mdb-target="#editModal" onClick={() => handleEdit(p.Id)}><i className='fa-solid fa-pen'></i></button></td>
						<td><button className='btn btn-danger btn-floating'  data-mdb-toggle="modal" data-mdb-target="#deleteModal" onClick={() => setId(p.Id)}><i className='fa-solid fa-trash'></i></button></td>
					</tr>
				)))}
			</tbody>
			</table>
		</div>
	</div>
	<div className="modal fade" id="deleteModal" tabIndex={-1} aria-labelledby="deleteModal" aria-hidden="true">
		<div className="modal-dialog">
			<div className="modal-content">
			<div className="modal-header">
				<h5 className="modal-title" id="deleteModal">Usuń produkt</h5>
				<button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
			</div>
			<div className="modal-body">
				<div className='d-flex justify-content-between'>
					<button type="button" className="btn btn-primary d-block" data-mdb-dismiss="modal">Anuluj</button>
					<button type="button" className="btn btn-danger d-block" data-mdb-dismiss="modal" onClick={deleteProduct}>Usuń</button>
			</div>
			</div>
			</div>
		</div>
	</div>
	<div className="modal fade" id="addModal" tabIndex={-1} aria-labelledby="addModal" aria-hidden="true">
		<div className="modal-dialog">
			<div className="modal-content">
			<div className="modal-header">
				<h5 className="modal-title" id="addModal">Dodaj produkt</h5>
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
				<button type="button" className="btn btn-primary" data-mdb-dismiss="modal" onClick={() => addProduct()}>Dodaj</button>
			</div>
			</div>
		</div>
	</div>
	<div className="modal fade" id="editModal" tabIndex={-1} aria-labelledby="editModal" aria-hidden="true">
		<div className="modal-dialog">
			<div className="modal-content">
			<div className="modal-header">
				<h5 className="modal-title" id="editModal">Edytuj produkt</h5>
				<button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
			</div>
			<div className="modal-body">			
				<form>
					<label htmlFor='name' className='form-label'>Nazwa</label>
					<input type="text" className="form-control" name="name" value={productName} onChange={(e) => setProductName(e.target.value)} required/>
					<label htmlFor='calories' className='form-label mt-3'>Kalorie</label>
					<input type="number" className="form-control" name="calories" value={productCalories} onChange={(e) => setProductCalories(e.target.value)} required/>
					<label htmlFor='carbs' className='form-label mt-3'>Węglowodany</label>
					<input type="number" className="form-control" name="carbs" value={productCarbs} onChange={(e) => setProductCarbs(e.target.value)} required/>
					<label htmlFor='fats' className='form-label mt-3'>Tłuszcze</label>
					<input type="number" className="form-control" name="fats" value={productFats} onChange={(e) => setProductFats(e.target.value)} required/>
					<label htmlFor='protein' className='form-label mt-3'>Białko</label>
					<input type="number" className="form-control" name="protein" value={productProteins} onChange={(e) => setProductProteins(e.target.value)} required/>
				</form>
			</div>
			<div className="modal-footer">
				<button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Anuluj</button>
				<button type="button" className="btn btn-primary" data-mdb-dismiss="modal" onClick={editProduct}>Edytuj</button>
			</div>
			</div>
		</div>
	</div>
	</AnimationFade>
	);
}

export default Products;