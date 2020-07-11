import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';

const Signup = () => {
	const history = useHistory();
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const postData = () => {
		if (email && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
			M.toast({html:"invalid email", classes:"#f44336 red"});
		} else {
			fetch("/signup",{
				method:"post",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify({
					name,
					password,
					email
				})
			}).then(res=>res.json())
			.then(data =>{
				if (data.error) {
					M.toast({html:data.error, classes:"#f44336 red"});
				} else {
					M.toast({html: data.message, classes:"#4caf50 green"});
					history.push('/signin');
				}
			}).catch(err => {
				console.log(err);
			});
		}
	}

	return (
		<div className="mycard">
			 <div className="card login-card input-field">
				<h2>Camagru</h2>
				<input type = "text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
				<input type = "text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
				<input type = "password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
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