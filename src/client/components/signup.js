import React,{useState} from 'react';
import {Link} from 'react-router-dom'

const Signup = () => {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const postData = () => {
		fetch("http:localhost:3000/signup",{
			method:"post",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({
				name:"",
				password:"",
				email:""
			})
		}).then(res=>{res.json()}).then(data=>{console.log(data)});
	}

	return (
		<div className="mycard">
			 <div className="card login-card input-field">
				<h2>Sign Up to Camagru</h2>
				<input type = "text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
				<input type = "text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
				<input type = "text" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
				<button className="btn waves-effect waves-light #5e35b1 deep-purple darken-1" type="submit" name="action" onClick={()=>postData()}>
					Sign up
				</button>
				<h5>
					<Link to='/signin'>Already have an account</Link>
				</h5>
			</div>
		</div>
	)
}

export default Signup;