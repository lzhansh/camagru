import React, {useEffect, createContext, useReducer, useContext} from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { auth_token, user_user, user_biotemp, post_posts, post_isdone } from './actions/types';
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'

import Header from './components/header/header';
import Login from './components/login';
import Home from './components/home';
import Profile from './components/profile';
import Signup from './components/signup';
import CreatePost from './components/createPost';
import UserProfile from './components/userProfile';
import {userReducer, initialState} from './reducers/user'

import './App.css';

export const userContext = createContext()

const Routing = () => {
	const history = useHistory();
	const {state, dispatch} = useContext(userContext);
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			dispatch({type:"USER", payload:user});
		} else {
			history.push('/signin');
		}
	},[])
	return (
		<Switch>
			<Route exact path='/'>
				<Home />
			</Route>
			<Route path="/signin">
				<Login />
			</Route>
			<Route path="/signup">
				<Signup />
			</Route>
			<Route exact path="/profile">
				<Profile />
			</Route>
			<Route path="/createpost">
				<CreatePost />
			</Route>
			<Route path="/profile/:id">
				<UserProfile />
			</Route>
		</Switch>
	)	
}

function App() {
	const [state, dispatch] = useReducer(userReducer, initialState);
	return (
		<userContext.Provider value = {{state,dispatch}} >
		<BrowserRouter>
			<Header />
			<Routing />
		</BrowserRouter>
		</userContext.Provider>
	);
}

export default App;