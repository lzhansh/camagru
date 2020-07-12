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
			<Route path="/profile">
				<Profile />
			</Route>
			<Route path="/createpost">
				<CreatePost />
			</Route>
		</Switch>
	)	
}

// const App = () => {
// 	const ui = useSelector(state => state.ui);
// 	const auth = useSelector(state => state.auth);
// 	const post = useSelector(state => state.post);
// 	const dispatch = useDispatch();

// 	const _handleData = (token) => {
// 		axios.post('/user/select', {
// 			token: token,
// 		})
// 		.then(res => {
// 			if(res.data !== '') {
// 				dispatch(user_user(res.data));
// 				dispatch(user_biotemp(res.data.bio === null ? '' : res.data.bio));
// 				dispatch(post_posts([]));
// 				dispatch(post_isdone(false));
// 			} else {
// 				cookie.remove('token', { path: '/'});
// 				dispatch(auth_token(''));
// 			}
// 		});
// 	}

// 	if(auth.token === '' && cookie.load('token') !== undefined) {
// 		dispatch(auth_token(cookie.load('token')));
// 		_handleData(cookie.load('token'));
// 	}

// 	if((ui.nav === 0 || ui.nav === 1) && post.posts.length === 0 && !post.isDone) {
// 		axios.post('/post/selectAll', {
// 			token: auth.token,
// 		})
// 		.then(res => {
// 			if(res.data.length === 0) {
// 				dispatch(post_isdone(true));
// 			} else {
// 				dispatch(post_posts(res.data));
// 			}
// 		});
// 	}
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