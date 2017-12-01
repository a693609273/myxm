import React from "react";
import "./index.scss";
import {connect} from "react-redux";
import {NavLink } from "react-router-dom";
import _ from "lodash";
import imgerror from "../../../public/imgerror.png";

class Cart extends React.Component{
	constructor(){
		super();
		this.state={
			value:null
		}
	}
	handclick(info){
		this.props.changenum(info);
	}

	render(){
		var price=0;
		var lilist=[];
		_.forEach(this.props.cart, function(value,index) {
  			price+=((parseFloat(value.info.price)-0)*value.num);
			}); 
		this.props.cart.length!=0?
				this.props.cart.map(item=>
					lilist.push(<li key={item.info.id} className="clearfix">
						<input type="checkbox" />
						<div className="cartimg">
						<img src={item.info.photo_url.replace(/http\w{0,1}:\/\//g,'https://images.weserv.nl/?url=')}/>
						</div>
						<div className="info">
						<div className="price">
						<h5>{item.info.title}</h5>
						<span>单价:￥{parseFloat(item.info.price)}</span>
						<spam>合计:￥{(parseFloat(item.info.price)*item.num).toFixed(2)}</spam>
						<span onClick={this.handclick.bind(this,{numtype:'delate',id:item.info.id})}>删除</span>
						</div>
						<div className="num">
						<span className="glyphicon glyphicon-plus" aria-hidden="true" onClick={this.handclick.bind(this,{numtype:'jia',id:item.info.id})}></span>
						<input type="text" value={item.num} disabled="disabled"/>
						<span onClick={this.handclick.bind(this,{numtype:'jian',id:item.info.id})} className="glyphicon glyphicon-minus" aria-hidden="true"></span>
						</div>
						</div>
					</li>)
					):lilist.push(<li className="center" key={1}>购物车为空</li>);
		return <div>
			<ul className="cartul">{
				lilist
			}
			</ul>
			<p className="buyland"><span>总价: ￥{price}</span><span className="send btn btn-primary">结算</span></p>
		</div>
	}
	
}

export default connect(
		(state)=>{
			console.log(state.cart);
			return {
				cart:state.cart
			}
		},{
			changenum:(info)=>{
				return (dispatch)=>{
					dispatch({
						type:'cartchange',
						payload:info
					})
				}
			}
		}
		)(Cart);