import AnimationFade from "./AnimationFade";

function Account(){

	return (
	<AnimationFade>

	<h1 className='fw-bold'>KONTO</h1>

	<div className="row">
		<div className="col-lg-4 col-sm-12 mt-3">
			<div className="card">
				<div className="card-body">
					<div className="mb-2">
						<label className="form-label" htmlFor="currentPassword">Hasło</label>
						<input type="password" id="currentPassword" className="form-control" />
					</div>
					<div className="mb-2">
						<label className="form-label" htmlFor="newPassword">Nowe hasło</label>
						<input type="password" id="newPassword" className="form-control" />
					</div>
					<div className="mb-4">
						<label className="form-label" htmlFor="repeatNewPassword">Powtórz nowe hasło</label>
						<input type="password" id="repeatNewPassword" className="form-control" />
					</div>
					<button type="button" className="btn btn-primary mb-3">Zmień hasło</button>
				</div>
			</div>
		</div>

		<div className="col-lg-4 col-sm-12 mt-3">
			<div className="card">
				<div className="card-body">
					<div className="mb-2">
						<label className="form-label" htmlFor="currentPassword">Hasło</label>
						<input type="password" id="currentPassword" className="form-control" />
					</div>
					<div className="mb-4">
						<label className="form-label" htmlFor="repeatCurrentPassword">Powtórz hasło</label>
						<input type="password" id="repeatCurrentPassword" className="form-control" />
					</div>
					<button type="button" className="btn btn-danger mb-3" data-mdb-toggle="modal" data-mdb-target="#deleteAccount">Usuń konto</button>
				</div>
			</div>
		</div>
	</div>

	<div className="modal fade" id="deleteAccount" tabIndex={-1} aria-labelledby="deleteAccount" aria-hidden="true">
		<div className="modal-dialog">
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title" id="deleteAccount">Czy jesteś pewny?</h5>
					<button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
				</div>
				<div className="modal-body">			
					<p>Dane twojego konta zostaną usunięte bezpowrotnie.</p>
					<div className='d-flex justify-content-between'>
						<button type="button" className="btn btn-primary d-block" data-mdb-dismiss="modal">Anuluj</button>
						<button type="button" className="btn btn-danger d-block" data-mdb-dismiss="modal">Usuń</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	</AnimationFade>
    )
}

export default Account;