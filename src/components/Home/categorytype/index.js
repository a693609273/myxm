import React from "react";
import "./index.scss";
import {connect} from "react-redux";

class categorytype extends React.Component{
	constructor(){
		super();
		this.state={
			page:1
		}
	}
	componentDidMount(){
		var details=this.props.categorytypelist;
	    var type=this.props.match.params.id;
	    this.setState({page:details.page})
		if(type!=this.props.categorytypelist.id){
	    this.getcategorytype(type);
		}

	}
	getcategorytype(id){
		this.props.getcategorytype({id:id,page:this.state.page});
	}
	handleClick(id){
		this.props.history.push(`/detail/categorytypelist/${id}`);
	}
	addallpage(type){
		if(type=="jia"){
			// console.log(this.props.categorytypelist);
			if(this.props.categorytypelist.data.length==0){
				return false;
			}
			this.setState({
					page:this.state.page+1,
				})
			this.props.getcategorytype({id:this.props.match.params.id,page:parseInt(this.state.page+1)})
		}
		if(type=="jian"){
			if(this.state.page-1<=0){
				return false;
			}
			this.setState({
					page:this.state.page-1,
				})
			this.props.getcategorytype({id:this.props.match.params.id,page:parseInt(this.state.page-1)})
		}
	}

	render(){var categorytypelist=[];
		categorytypelist.push(
		this.props.categorytypelist.data.length==0?
				<div className="error" key={1}>
				{this.props.categorytypelist.hasList?<p>已经到底了</p>:<p>请稍等...</p>}
				</div>:
				<div key={2}>
					<ul className="row">
						{this.props.categorytypelist.data.map(item=>

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
				</div>)
		return <div>
			{categorytypelist}
			<nav aria-label="Page navigation" className="text-center">
  				<ul className="pagination clearfix">
   				 <li>
     			 <a href="javascript:void(0);" aria-label="Previous">
       			 <span aria-hidden="true" onClick={this.addallpage.bind(this,'jian')}>&laquo;</span>
      			</a>
    			</li>
    				<li><a href="javascript:void(0);"  className="pageactive">{this.state.page}</a></li>
    			<li>
      			<a href="javascript:void(0);" aria-label="Next">
        	<span aria-hidden="true" onClick={this.addallpage.bind(this,'jia')}>&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
		</div>
	}
}

export default connect(
		(state)=>{
			console.log(state.categorytypelist);
			return {
				categorytypelist:state.categorytypelist
			}
		},
		{
			getcategorytype:(info)=>{
				return (dispatch)=>{
					var id=info.id;
					var page=info.page;
					axios.get(`/api/v2/marketing_category/${id}/products?page=${page}&page_size=10`).then(res=>{
						console.log(res);
					   		var info={
					   			data:res.data.data.products,
					   			id:id,
					   			hasList:true,
					   			page:page
					   		}
					    	if(res.data.data.length==0){
					    		info.hasList=false
					    	}
					    	dispatch({
						type:'categorytypelist',
						payload:info
					})
					})	
				}
			}
		}
	)(categorytype);