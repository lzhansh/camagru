import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useSelector, useDispatch } from 'react-redux';
// import { auth_token, user_user, user_biotemp, post_posts, post_isdone } from './actions/types';
import {BrowserRouter, Route} from 'react-router-dom'
// import axios from 'axios';
// import cookie from 'react-cookies';

import Header from './components/header/header';
import Login from './components/login';
import Home from './components/home';
import Profile from './components/profile';
import Signup from './components/signup';
import CreatePort from './components/createPost';
// import Body from './components/body/body';
// import Footer from './components/footer/footer';
// import Sidebar from '../../function/sidebar';
// import Cover from '../../function/cover';

// import Wrapper from 'react-div-100vh';

import './App.css';
import CreatePost from './components/createPost';

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
	return (
		<BrowserRouter>
			<Header />
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
			<Route path="/create">
				<CreatePost />
			</Route>
		</BrowserRouter>
	);
}
	
// 	return (
// 		<Wrapper className='app no-drag'>
// 			<Header />
// 			<div>Hello World!</div>
// 			{/* <Body />
// 			<Footer />
// 			{ ui.nav === 1 ? <div className='sidebar-cover' /> : '' }
// 			{ ui.nav === 1 ? <Sidebar /> : '' }
// 			<Cover /> */}
// 		</Wrapper>
// 	);
// }

export default App;