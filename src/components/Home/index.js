import React from "react";
import "./index.scss";
import {NavLink } from "react-router-dom";

class Home extends React.Component{
	constructor(){
		super();
		this.state={
		}
	}

	render(){
		return <div>
			<ul className="nav">
				<li>
					<NavLink to="/home/main" activeClassName="active">首页</NavLink>
				</li>
				<li>
					<NavLink to="/home/category" activeClassName="active">分类</NavLink>
				</li>
				<li>
					<NavLink to="/home/cart" activeClassName="active">购物车</NavLink>
				</li>
				<li>
					<NavLink to="/home/user" activeClassName="active">我的</NavLink>
				</li>

			</ul>
			<div className="homechildren">
			{
				this.props.children
			}
			</div>
		</div>
	}
}

export default Home;