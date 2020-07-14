import React,{useState, useContext, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom'
import { userContext } from '../App'
// import M from 'materialize-css';

const Home = () => {
	const [data, setData] = useState([]);
	const {state,dispatch} = useContext(userContext)
	useEffect(() => {
		fetch("/allposts", {
			headers: {
				"Authorization": "Bearer " + localStorage.getItem("jwt")
			}
		}).then(res => res.json())
		.then(result => {
			setData(result.posts);
		})
	}, [])

	const likePost = (id) => {
		fetch('/like', {
			method: "put",
			headers:{
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("jwt")
			},
			body: JSON.stringify({
				postId: id
			})
		}).then(res => res.json())
		.then(result => {
			const newData = data.map(item=>{
                if(item._id==result._id) {
                    return result
                } else {
                    return item
                }
            })
            setData(newData);
		}).catch(err=>{
			console.log(err)
		})
	}

	const unlikePost = (id) => {
		fetch('/unlike', {
			method: "put",
			headers:{
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("jwt")
			},
			body: JSON.stringify({
				postId: id
			})
		}).then(res => res.json())
		.then(result => {
			const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData);
		}).catch(err=>{
			console.log(err)
		})
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
							{item.likes.includes(state._id)
                            ? 
                             <i className="material-icons" style={{color: "red"}}
                                    onClick={()=>{unlikePost(item._id)}}
                              >favorite</i>
                            : 
                            <i className="material-icons" style={{color: "red"}}
                            onClick={()=>{likePost(item._id)}}
                            >favorite_border</i>
                            }
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