import React from "react";
import "./index.scss";
import {NavLink } from "react-router-dom";

class Category extends React.Component{
	constructor(){
		super();
		this.state={
		}
	}

	render(){
		return <div className="text-center category">
			<div className="row">
			<div className="col-xs-4"><NavLink to="/categorytype/277">饮食</NavLink></div>
			<div className="col-xs-4"><NavLink to="/categorytype/1">服装</NavLink></div>
			<div className="col-xs-4"><NavLink to="/categorytype/235">配饰</NavLink></div>
</div>
<div className="row">
	<div className="col-xs-4"><NavLink to="/categorytype/151">包袋</NavLink></div>
	<div className="col-xs-4"><NavLink to="/categorytype/256">鞋靴</NavLink></div>
	<div className="col-xs-4"><NavLink to="/categorytype/115">美容护肤</NavLink></div>
</div>
<div className="row">
	<div className="col-xs-4"><NavLink to="/categorytype/35">家居</NavLink></div>
	<div className="col-xs-4"><NavLink to="/categorytype/183">时间</NavLink></div>
	<div className="col-xs-4"><NavLink to="/categorytype/363">3C数码</NavLink></div>
</div>
		</div>
	}
}

export default Category;