import React from 'react';

const CreatePost = () => {
	return (
		<div className="card input-field" style={{
			margin: "30px auto",
			maxWidth: "500px",
			padding: "20px",
			textAlign: "center"
		}}>
			<input type="text" placeholder="title"/>
			<input type="text" placeholder="title"/>
			<div className="file-field input-field">
				<div className="btn #5e35b1 deep-purple darken-1">
					<span>Upload</span>
					<input type="file"/>
				</div>
				<div className="file-path-wrapper">
					<input className="file-path validate" type="text"/>
				</div>
			</div>
			<button className="btn waves-effect waves-light #5e35b1 deep-purple darken-1" type="submit" name="action">
					Submit
			</button>
		</div>
	)
}

export default CreatePost;