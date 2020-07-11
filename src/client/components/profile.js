import React, {useEffect} from 'react';

const Profile = () => {
	useEffect(() => {
		fetch('/mypost', {
			headers: {
				"Authorization": "Bearer " + localStorage.getItem("jwt")
			}
		}).then(res=> res.json())
		.then(result => {
			
		})
	})
	return (
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
					<h4>Name Surname</h4>
					<div style={{
						display:"flex",
						justifyContent:"space-between",
						width: "108%"
						}}>
						<h5>N posts</h5>
						<h5>N followers</h5>
						<h5>N following</h5>
					</div>
				</div>
			</div>
		<div className="gallery">
			<img className="item" src="https://images.unsplash.com/photo-1504376379689-8d54347b26c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=762&q=80"/>
			<img className="item" src="https://images.unsplash.com/photo-1504376379689-8d54347b26c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=762&q=80"/>
			<img className="item" src="https://images.unsplash.com/photo-1504376379689-8d54347b26c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=762&q=80"/>
			<img className="item" src="https://images.unsplash.com/photo-1504376379689-8d54347b26c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=762&q=80"/>
			<img className="item" src="https://images.unsplash.com/photo-1504376379689-8d54347b26c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=762&q=80"/>
			<img className="item" src="https://images.unsplash.com/photo-1504376379689-8d54347b26c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=762&q=80"/>
		</div>
		</div>
	)
}

export default Profile;