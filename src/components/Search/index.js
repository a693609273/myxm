import React from "react";
import "./index.scss";
import {connect} from "react-redux";
import imgerror from "../../public/imgerror.png";

class Search extends React.Component{
	constructor(){
		super();
		this.state={
		}
	}

	render(){
		return <div>
		<input type="text" className="searchs" onKeyDown={this.textsearch.bind(this)} defaultValue={this.props.search.text} ref="search"/>
			{	this.props.search.data.length==0?
				<div className="error">
				{this.props.search.hasList?<p>请输入想要的商品</p>:<p>搜索结果不存在请重新搜索</p>}
				</div>:
				<div>
					<ul className="row">
						{this.props.search.data.map(item=>
							<li key={item.id}  className="col-xs-6" onClick={this.handleClick.bind(this,item.id)}>
							    <div className="thumbnail">
							      <img src={!item.cover_url?imgerror:item.cover_url.replace(/http\w{0,1}:\/\//g,'https://images.weserv.nl/?url=')} className="thumbnail"/>
							      <div className="caption">
							        <h5>{item.title}</h5>
							        <p>￥{item.price}</p>
							      </div>
							    </div>
							</li>
							)
					}
					</ul>
				</div>
			}
		</div>
	}
	textsearch(event){
		if(event.keyCode == 13){
			console.log(this.refs.search.value);
			this.props.sendsearch(this.refs.search.value)
		}	
	}
		handleClick(id){
		this.props.history.push(`/detail/search/${id}`);
	}
}

export default connect(
		(state)=>{
			console.log(state.search);
			return {
				search:state.search
			}
		},
		{
			sendsearch:(info)=>{
				return (dispatch)=>{
					var infos=info;
					axios.get(`/api/search?text=${info}&page=1&page_size=16&search_type=market_product`).then(res=>{
					   		var info={
					   			data:res.data.data,
					   			text:infos,
					   			hasList:true
					   		}
					    	if(res.data.data.length==0){
					    		info.hasList=false
					    	}
					    	dispatch({
						type:'search',
						payload:info
					})
					})	
				}
			}
		}
	)(Search);