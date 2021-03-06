import React,{useState, useContext, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom'
import { userContext } from '../App' //to get info who is logged in
import M from 'materialize-css';

const Home = () => {
	const [data, setData] = useState([]);
	const {state,dispatch} = useContext(userContext)
	useEffect(() => {
		fetch("/allposts", {
			// headers: {
			// 	"Authorization": "Bearer " + localStorage.getItem("jwt")
			// }
		}).then(res => res.json())
		.then(result => {
			setData(result.posts);
		})
	}, [])

	const likePost = (id) => {
		if (!state) {
			M.toast({html:"You must be logged in", classes:"#f44336 red"});
		}
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

	const makeComment = (text, postId) => {
		fetch('/comment', {
			method: "put",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("jwt")
			},
			body: JSON.stringify({
				postId,
				text
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

	const deletePost = (postId) => {
		fetch(`/deletepost/${postId}`, {
			method: "delete",
			headers: {
				"Authorization" : "Bearer " + localStorage.getItem("jwt")
			}
		}).then(res => res.json())
		.then(result => {
			const newData = data.filter(item=>{
                 return item._id !== result._id
            })
            setData(newData);
		})
	}
// 	const likePost = (id)=>{
// 		fetch('/like',{
// 			method:"put",
// 			headers:{
// 				"Content-Type":"application/json",
// 				"Authorization":"Bearer "+localStorage.getItem("jwt")
// 			},
// 			body:JSON.stringify({
// 				postId:id
// 			})
// 		}).then(res=>res.json())
// 		.then(result=>{
// 				 //   console.log(result)
// 		  const newData = data.map(item=>{
// 			  if(item._id==result._id){
// 				  return result
// 			  }else{
// 				  return item
// 			  }
// 		  })
// 		  setData(newData)
// 		}).catch(err=>{
// 			console.log(err)
// 		})
//   }
	return (
		<div className="home">
			{
				data.map(item => {
					return (
						<div className="card home-card" key={item._id}>
							<h5 className="card-content"><Link to={state ? (item.postedBy._id != state._id ? "/profile/"+item.postedBy._id : "/profile") : "/signin"}>{item.postedBy.name}</Link> 
							{ state ? (item.postedBy._id == state._id && 
							<i className="material-icons" style={{float: "right"}} onClick={()=>{deletePost(item._id)}}
							>delete</i>) : null}
							</h5>
							
							<div className="card-image">
								<img src={item.image} />
							</div>
							<div className="card-content">
							{state ? (item.likes.includes(state._id)
                            ? 
                             <i className="material-icons" style={{color: "red"}}
                                    onClick={()=>{unlikePost(item._id)}}
                              >favorite</i>
                            : 
                            <i className="material-icons" style={{color: "red"}}
                            onClick={()=>{likePost(item._id)}}
                            >favorite_border</i>)
                            : <i className="material-icons" style={{color: "red"}}
                            onClick={()=>{likePost(item._id)}}
                            >favorite_border</i>}
							{/* {item.likes.includes(state._id)
                            ? 
                             <i className="material-icons" style={{color: "red"}}
                                    onClick={()=>{unlikePost(item._id)}}
                              >favorite</i>
                            : 
                            <i className="material-icons" style={{color: "red"}}
                            onClick={()=>{likePost(item._id)}}
                            >favorite_border</i>} */}
								<h6>{item.likes.length} likes</h6>
								<h6>{item.title}</h6>
								<p>{item.body}</p>
								{
									item.comments.map(record => {
										return (
											<h6 key={item._id}>
												<span style={{fontWeight:"500"}}>
													{record.postedBy.name}
												</span> {record.text}
											</h6>
										)
									})
								}
								{state ? 
								<form onSubmit = {(e) => {
									e.preventDefault()
									makeComment(e.target[0].value, item._id)
								}}>
									<input type="text" placeholder="Add a comment"/>
								</form> : null}
								
							</div>
						</div>
					)
				})
			}
		</div>
	)
}

export default Home;