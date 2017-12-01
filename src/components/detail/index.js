import React from "react";
import "./index.scss";
import {connect} from "react-redux";
import _ from "lodash"
import imgerror from "../../public/imgerror.png";

class detail extends React.Component{
	constructor(){
		super();
		this.state={
			num:1
		}
	}
	componentDidMount() {
	    // console.log(this.props.state);
	    console.log(this.props.match.params.type)
	    // console.log(this.props.match.params.detailinfo)
	    var details=this.props.state;
	    var type=this.props.match.params.type;
	    var id=this.props.match.params.detailinfo-0;
	    var that=this;
	    if(type=="search"||type=="categorytypelist"){
	    	details[type]=details[type].data;
	    }
	    console.log(details[type]);
	    if(details[type].length==0){
	    	this.props.history.push(`/home`);
	    }
	    else{
	    _.forEach(details[type],function(value,index){
	    	if(type=="search"||type=="categorytypelist"){
	    			    	console.log(1);
	    		if(value.id==id){
	    			// console.log(value);
	    			value.photo_url=value.cover_url;
	    			that.props.senddetail(value);
	    		}
	    	}
	    	else{	
	    	if(_.find(value.skus,{id:id})){
	    		that.props.senddetail(_.find(value.skus,{id:id}));
	    	}
	    }	
	    })
	}
	}
	render(){
		var info=this.props.state.detail;
		return <div>{
			!!info?<div className="detail">
			<img className="pto" src={info.photo_url?info.photo_url.replace(/http\w{0,1}:\/\//g,'https://images.weserv.nl/?url='):imgerror}/>
			<p>{info.title}</p>
			<p><span>￥{info.price}</span>{!info.price_couple?"":<s>￥{info.price_couple[1]}</s>}</p>
			<div className="jionnum"><span className="glyphicon glyphicon-plus" aria-hidden="true" onClick={this.handclick.bind(this,'jia')}></span>
			<input type="text" onChange={this.handclick.bind(this,'val')} value={this.state.num} ref="val"/>
			<span onClick={this.handclick.bind(this,'jian')} className="glyphicon glyphicon-minus" aria-hidden="true"></span>
			<button onClick={this.jioncart.bind(this,{info:info,num:this.state.num})}>加入购物车</button>
			</div>
			</div>:<div>加载中</div>
		}
		</div>
	}
	handclick(type){
		var numchange=this.state.num;
		switch(type){	
		case "jian":
		// console.log(1);
		if(numchange==1){
			numchange=2;
		}
		this.setState({num:numchange-1});
		return;
		case "jia":
		// console.log(2);
		this.setState({num:numchange+1});
		return;
		case "val":
		this.setState({num:(this.refs.val.value-0)});
		return;
	}
	}
	jioncart(info){
		this.props.jioncart(info);
	}

}

export default connect(
		(state)=>{
			return {
				state:state
			}
		},{
			senddetail:(info)=>{
				// console.log(info);
				return (dispatch)=>{
					dispatch({
						type:'detail',
						payload:info
					})
				}
			},
			jioncart:(info)=>{
				// console.log(info);
				return (dispatch)=>{
					dispatch({
						type:'cart',
						payload:info
					})
				}
			}
		}
	)(detail);