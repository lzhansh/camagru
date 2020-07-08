import React from 'react';

const Home = () => {
	return (
		<div className="home">
			<div className="card home-card">
				<h5>Name</h5>
				<div className="card-image">
					<img src="" />
				</div>
				<div className="card-content">
				<i className="material-icons" style={{color: "red"}}>favorite_border</i>
					<h6>Title</h6>
					<p>Body olololo</p>
					<input type="text" placeholder="Add a comment"/>
				</div>
			</div>
		</div>
	)
}

export default Home;