import {createStore,combineReducers} from "redux";
import thunk from 'redux-thunk'; //处理异步action 
import reduxpromsie from "redux-promise";
import {applyMiddleware} from "redux";

import {MainList,detail,cart,search,categorytypelist} from "../Reducer";


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk,reduxpromsie),
  // other store enhancers if any
); //开发阶段 调试redux 工具要加的话



const store = createStore(combineReducers({
	MainList:MainList,
	detail:detail,
	cart:cart,
  search:search,
  categorytypelist:categorytypelist
}),enhancer);


export default store;


//combineReducers:把多个reducer ,合并成一个大的 Reducer 