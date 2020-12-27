import "./App.css";
import {useEffect} from "react";
import Home from "./screens/Home";
import { Switch, Route, Redirect,useHistory} from "react-router-dom";
import axios from "axios";
import Story from "./screens/Story";
import WriterScreen from "./screens/writerScreen.jsx";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import auth from "./auth.js";




function App() {
	let history = useHistory();
	useEffect(()=>{
		const getAccessToken = async()=>{
			const res = await axios.get("/api/refreshToken");
			if(!res.data.error){
				auth.accessToken = res.data.accessToken;
			}
		}
		getAccessToken();
		setInterval(()=>{
			getAccessToken()
		},900000)
	},[])
	return (
		<Switch>
			<Route path='/' component={Home} exact />
			<Route path='/story' component={Story} />
			<Route path="/login" component={LoginScreen} />
			<Route path="/writer" render={()=>{
				if(auth.accessToken === ""){
				  history.push("/login")
				}else{
					return <WriterScreen />
				}
			}} />
			<Route path="/signup" component={SignUpScreen} />
			<Redirect to="/" />
			
		</Switch>
	);
}

export default App;
