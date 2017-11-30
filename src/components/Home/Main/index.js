import React from "react";
import "./index.scss";
import {connect} from "react-redux";

class Main extends React.Component{
	constructor(){
		super();
		this.state={
		}
	}
	componentDidMount() {

	   if(this.props.MainList.length==0){
	   		this.props.getList();
	   }
	}
	render(){
		return <div>
			<ul className="mainul">
				{
					this.props.MainList.map(item=>
					<li key={item.id}>
							<div className="shopinfo">
								<img src={item.picture_url.replace(/http\w{0,1}:\/\//g,'https://images.weserv.nl/?url=')}/>
							<span>{item.name}</span>
							<p>{item.intro}</p>
							</div>
							<ol className="shoplist">
							 {item.skus.map(item=>
								<li key={item.id} onClick={this.handleClick.bind(this,item.id)}>
								<img src={item.photo_url.replace(/http\w{0,1}:\/\//g,'https://images.weserv.nl/?url=')}/>
								<p>{item.title}</p>	
								<span>￥{item.price_couple[0]}</span>{!item.price_couple[1]?"":<s>￥{item.price_couple[1]}</s>}						
								</li>
								)
								}
							</ol>
						</li>
					)
				}
			</ul>
		</div>
	}
	handleClick(id){
		this.props.history.push(`/detail/MainList/${id}`);
	}
}

export default connect(
		(state)=>{
			// console.log(state.MainList);
			return {
				MainList:state.MainList
			}
		},
		{
			getList:()=>{ 
				console.log(1);
				 //异步action 借助 redux-thunk 中间件实现 
				 return (dispatch)=>{
				 	axios.get("/api/home/shops?page=1&page_size=10").then(res=>{
					    	console.log(res.data.data);
					    	res.data.data.shops.splice(0,1);
					    	dispatch({
					    		type:"MainList",
					    		payload:res.data.data.shops
					    	})
					})
				 }
			}
		}

	)(Main);