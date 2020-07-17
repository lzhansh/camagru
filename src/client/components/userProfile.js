import React, {useEffect, useState, useContext} from 'react';
import {userContext} from '../App'
import {useParams} from 'react-router-dom'

const Profile = () => {
	const [userProfile, setProfile] = useState(null);
	const {state, dispatch} = useContext(userContext);
	const {id} = useParams();
	useEffect(() => {
		fetch(`/user/${id}`, {
			headers: {
				"Authorization": "Bearer " + localStorage.getItem("jwt")
			}
		}).then(res=> res.json())
		.then(result => {
			setProfile(result);
		})
	})
	return (
		<>
		{userProfile ? 
		<div style={{maxWidth:"550px", margin:"0px auto"}}>
			<div style={{
				display:"flex",
				justifyContent:"space-around",
				margin:"18px 0px"
			}}>
				<div>
					<img style = {{
						width:"160px",
						height:"160px",
						borderRadius:"80px"}}
						src="https://images.unsplash.com/photo-1504376379689-8d54347b26c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=762&q=80"/>
				</div>
				<div>
					<h4>{userProfile.user.name}</h4>
					<div style={{
						display:"flex",
						justifyContent:"space-between",
						width: "108%"
						}}>
						<h5>{userProfile.posts.length} posts</h5>
						<h5>N followers</h5>
						<h5>N following</h5>
					</div>
				</div>
			</div>
			<div className="gallery">
				{
					userProfile.posts.map(item => {
						return(
							<img key = {item._id} className="item" src={item.image} alt={item.title}/>
						)
					})
				}
			</div>
		</div>
		: <h2>loading</h2>}
		</>
	)
}

export default Profile;