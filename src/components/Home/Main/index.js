import React from "react";
import "./index.scss";
import {connect} from "react-redux";
import _ from "lodash";

class Main extends React.Component{
	constructor(){
		super();
		this.state={
			pageindex:0,
			allpage:1
		}
	}
	componentDidMount() {

	   if(this.props.MainList.length==0){
	   		this.props.getList(1);
	   }
	}
	render(){
		var mainlist=[];
		this.props.MainList.map(item=>
			mainlist.push(<li key={item.id}>
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
					))
		var page=[];
		for(let i=0;i<5;i++){
			page.push(<li key={i}><a href="javascript:void(0);"  className={this.state.pageindex==i?"pageactive":""} onClick={(e)=>this.changepage(e)}>{this.state.allpage+i}</a></li>)
		}
		if(this.state.allpage!=1&&this.props.MainList.length==0){
			mainlist.push(<li key={555} className="center">已经到底了</li>)
		}
		return <div>
			<ul className="mainul">
				{
					mainlist
				}
			</ul>
			<nav aria-label="Page navigation" className="text-center">
  				<ul className="pagination clearfix">
   				 <li>
     			 <a href="javascript:void(0);" aria-label="Previous">
       			 <span aria-hidden="true" onClick={this.addallpage.bind(this,'jian')}>&laquo;</span>
      			</a>
    			</li>
    				{page}
    			<li>
      			<a href="javascript:void(0);" aria-label="Next">
        	<span aria-hidden="true" onClick={this.addallpage.bind(this,'jia')}>&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
		</div>
					
	}
	changepage(e){
		this.setState({
			pageindex:parseInt(e.currentTarget.innerHTML)-1
		})
	this.props.getList(parseInt(e.currentTarget.innerHTML));
	}
	addallpage(type){
		if(type=="jia"){
			if(this.props.MainList.length==0){
				return false;
			}
			this.setState({
					allpage:this.state.allpage+5,
				})
			this.props.getList(parseInt(this.state.allpage+5+this.state.pageindex));
		}
		if(type=="jian"){
			if(this.state.allpage-5<0){
				return false;
			}
			this.setState({
					allpage:this.state.allpage-5,
				})
			console.log(parseInt(this.state.allpage-5+this.state.pageindex));
			this.props.getList(parseInt(this.state.allpage-5+this.state.pageindex))
		}
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
			getList:(page)=>{ 
				 //异步action 借助 redux-thunk 中间件实现 
				 return (dispatch)=>{
				 	axios.get(`/api/home/shops?page=${page}&page_size=10`).then(res=>{
					    	console.log(res.data.data);
					    	if(page==1){
					    	res.data.data.shops.splice(0,1);}
					    	var indexs=[];
					    	_.forEach(res.data.data.shops,function(val,index){
					    		if(!val.skus){
					    			indexs.push(val.id);
					    		}
					    	})
					    	for(let j=0;j<indexs.length;j++){
								res.data.data.shops.splice(_.findIndex(res.data.data.shops, function(o) { return o.id == indexs[j];}),1)
					    	}
					    	dispatch({
					    		type:"MainList",
					    		payload:res.data.data.shops
					    	})
					})
				 }
			}
		}

	)(Main);