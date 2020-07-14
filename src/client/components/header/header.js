import React, {useContext,useEffect,useState} from 'react';
import {Link, useHistory } from 'react-router-dom'
import {userContext} from '../../App'

const Header = () => {
	const {state, dispatch} = useContext(userContext);
	const history = useHistory();
	const renderList = () => {
		if (state) {
			return [
				<li><Link to="/profile">Profile</Link></li>,
				<li><Link to="/createpost">New Post</Link></li>,
				<li>
					<button className="btn waves-effect waves-light #f44336 red"
					onClick = {()=>{
						localStorage.clear()
						dispatch({type: "CLEAR"})
						history.push('/signin')
					}}>
						Log out
					</button>
				</li>
			]
		} else {
			return [
				<li><Link to="/signin">Login</Link></li>,
				<li><Link to="/signup">Sign up</Link></li>
			]
		}
	}
	return (
		<nav>
		<div className="nav-wrapper white" >
		  <Link to={state ? "/" : "/signin"} className="brand-logo left">Camagru</Link>
		  <ul id="nav-mobile" className="right">
			{renderList()}
		  </ul>
		</div>
	  </nav>
	);
}

export default Header;