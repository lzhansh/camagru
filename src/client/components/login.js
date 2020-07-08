import React from 'react';
import {Link} from 'react-router-dom'

const Login = () => {
	return (
		<div className="mycard">
			 <div className="card login-card input-field">
				<h2>Camagru</h2>
				<input type = "text" placeholder="email" />
				<input type = "text" placeholder="password" />
				<button className="btn waves-effect waves-light #5e35b1 deep-purple darken-1" type="submit" name="action">
					Login
				</button>
				<h5>
					<Link to='/signup'>Create new account</Link>
				</h5>
			</div>
		</div>
	)
}

export default Login;