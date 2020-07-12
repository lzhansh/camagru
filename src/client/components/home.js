import React,{useState, useContext, useEffect} from 'react';
// import {Link, useHistory} from 'react-router-dom'
// import { userContext } from '../App'
// import M from 'materialize-css';

const Home = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch("/allposts", {
			headers: {
				"Authorization": "Bearer " + localStorage.getItem("jwt")
			}
		}).then(res => res.json())
		.then(result => {
			setData(result.posts);
		})
	}, []);
	let liked = false;
	const likePost = (id) => {
		liked = true;
		fetch('/like', {
			method: "put",
			headers:{
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("jwt")
			},
			body: JSON.stringify({
				postId: id
			})
		}.then(res => res.json())
		.then(result => {
			console.log(result);
		})
		)
	}

	const unlikePost = (id) => {
		liked = false;
		fetch('/unlike', {
			method: "put",
			headers:{
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("jwt")
			},
			body: JSON.stringify({
				postId: id
			})
		}.then(res => res.json())
		.then(result => {
			console.log(result);
		})
		)
	}

	return (
		<div className="home">
			{
				data.map(item => {
					return (
						<div className="card home-card" key={item._id}>
							<h5>{item.postedBy.name}</h5>
							<div className="card-image">
								<img src={item.image} />
							</div>
							<div className="card-content">
							<i className="material-icons" style={{color: "red"}} onClick = {() => {liked ? likePost(item._id) : unlikePost(item._id)}  }>favorite_border</i>
								<h6>{item.likes.length} likes</h6>
								<h6>{item.title}</h6>
								<p>{item.body}</p>
								<input type="text" placeholder="Add a comment"/>
							</div>
						</div>
					)
				})
			}
		</div>
	)
}

export default Home;