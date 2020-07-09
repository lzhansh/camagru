import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css';

const Login = () => {
	const history = useHistory();
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const postData = () => {
		if (email && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
			M.toast({html:"invalid email", classes:"#f44336 red"});
		} else {
			fetch("/signin",{
				method:"post",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify({
					password,
					email
				})
			}).then(res=>res.json())
			.then(data =>{
				console.log(data);
				if (data.error) {
					M.toast({html:data.error, classes:"#f44336 red"});
				} else {
					M.toast({html: "Succesfully signed in", classes:"#4caf50 green"});
					history.push('/');
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
				<input type = "text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
				<input type = "text" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
				<button className="btn waves-effect waves-light #5e35b1 deep-purple darken-1" type="submit" name="action" onClick={()=>postData()}>
					Login
				</button>
				<h5>
					<Link to='/signup'>Create new account</Link>
				</h5>
			</div>
		</div>
	)
}

export default Login;