const Alert = ({ content, success }) => {
    return(
		<>
			{success ? (
				<p className='alert alert-success'><i className="fas fa-circle-check"></i> {content}</p>
				) : (
				<p className='alert alert-danger'><i className="fas fa-circle-xmark"></i> {content}</p>
			)}
		</>
    )
}

export default Alert;