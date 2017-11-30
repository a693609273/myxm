import _ from "lodash"

const MainList = (state=[],info)=>{
	let {type,payload} =info;
	switch(type){
		case "MainList":{
		state=[...payload];
			return [...payload];}
		default :
			return state; 
	}
}

const search =(state={data:[],text:"",hasList:true},info)=>{
	let {type,payload} =info;
	switch(type){
		case "search":
		state={data:payload.data,
			text:payload.text,
			hasList:payload.hasList};
			return payload;
		default :
			return state; 
	}
}

const detail =(state=null,info)=>{
	let {type,payload} =info;
	switch(type){
		case "detail":
			return payload;
		default :
			return state; 
	}
}

const cart = (state=[],info)=>{
	let {type,payload} =info;
	switch(type){
		case "cart" :
		// console.log(payload);
		var changestate;
		state=[...state,payload];
			changestate=_.uniqBy(state, 'info');
			_.forEach(changestate,function(val1,index1){
				_.forEach(state,function(val2,index2){
					if(val2.info.id==val1.info.id&&index1!=index2){
						val1.num+=val2.num;
					}
				})
			})
			state=[...changestate];
			console.log(state);
			return state;
		case "cartchange":
			let index=_.findIndex(state, function(o) { return o.info.id == payload.id; });
			if(payload.numtype=="jia"){
			state[index].num+=1;
		}
		if(payload.numtype=="jian"){
			if(state[index].num==1){
				state[index].num=2
			}
			state[index].num-=1;
		}
		if(payload.numtype=="delate"){
			state.splice(index,1);
		}
		state=[...state];
		return state;
		default :
			return state; 
	}
}



export  {MainList,detail,cart,search};

// reducer 的设计必须是一个纯函数
// 
// 只要每次给定相同的输入值，就一定会得到相同的输出值: 例如传入1与2，就一定会得到3
// 不会改变原始输入参数，或是外部的环境，所以没有副作用
// 不依頼其他外部的状态，变量或常量

