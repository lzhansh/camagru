import React, {useState} from 'react';

const CreatePost = () => {
	const [title, setTitle] = useState("")
	const [body, setBody] = useState("")
	const [image, setImage] = useState("")

	const postDetails = () => {
		const data = new FormData();
		data.append("file", image);
		data.append("upload-preset", "camagru1");
		data.append("cloud_name", "lzhansha");
		fetch("	https://api.cloudinary.com/v1_1/lzhansha/image/upload", {
			method: "post",
			body: data
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
		}).catch(e => {
			console.log(e);
		})
	}

	return (
		<div className="card input-field" style={{
			margin: "30px auto",
			maxWidth: "500px",
			padding: "20px",
			textAlign: "center"
		}}>
			<input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
			<input type="text" placeholder="title" value={body} onChange={(e)=>setBody(e.target.value)}/>
			<div className="file-field input-field">
				<div className="btn #5e35b1 deep-purple darken-1">
					<span>Upload</span>
					<input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
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