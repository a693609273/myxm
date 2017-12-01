import React from "react"

import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import App from "../components/App";
import Home from "../components/Home";
import Search from "../components/Search";
import {Provider}  from "react-redux";
import Main from "../components/Home/Main"
import Category from "../components/Home/category"
import Cart from "../components/Home/cart"
import User from "../components/Home/user"
import categorytype from "../components/Home/categorytype"
import detail from "../components/detail"
import store  from "../Redux/Store";
const router = (
	<Provider store={store}>
	<Router>		
		<App>
			 <Switch>
			 	{
			 		//switch 只加载匹配路径的第一个孩子
			 	}
			 	<Route path="/home" render={()=>

					<Home>
						<Switch>
							<Route path="/home/main" component={Main}/>
							<Route path="/home/category" component={Category}/>
							<Route path="/home/cart" component={Cart}/>
							<Route path="/home/user" component={User}/>
							<Redirect from="/home" to="/home/main"/>
						</Switch>
					</Home>
				}/>
				<Route path="/search" component={Search}/>
				<Route path="/detail/:type/:detailinfo" component={detail}/>
				<Route path="/categorytype/:id" component={categorytype}/>
				<Redirect from="*" to="/home"/>
			</Switch>
		</App>
	</Router>
	</Provider>
)


export default router;
