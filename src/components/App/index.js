import React from "react";
import "./index.scss";
import {NavLink} from "react-router-dom";
import Logo from "../../public/logo.png"

class App extends React.Component{
	constructor(){
		super();
		this.state={
		}
	}

	render(){
		return <div>
		<header>
			<NavLink to="/" className="logo"><img src={Logo}/></NavLink>
			<NavLink to="/search" className="search"><span className="glyphicon glyphicon-search" aria-hidden="true"></span></NavLink>
		</header>
		<section>
			{
				this.props.children
			}
		</section>
		</div>
	}
}

export default App;