/**
 * React Monthticket_vote插件
 	@author 韩俊朋--投多张月票
 	@props data（必选属性前面带＊，非必选项目请备注默认值）
 		－*url : String,//eg
		-closeMyself : false(默认) //eg
	@example
	<Monthticket_vote data={{url:"",closeMyself:true}}/>

 */
require('./monthticket_vote.scss');

var Monthticket_vote = React.createClass({
	getInitialState: function() {
		return {
			initData:this.props.data,//后台获取的数据
			balance:this.props.data.balance,
			monList:['1张','2张','3张','4张','5张','全部'],//选中的张数
			borderBottomColor:'cmr-mv-grayColor',//input聚焦底部颜色类名cmr-mv-grayColor，失去焦点类名cmr-mv-blueColor
			currentIndex:0,//默认选中第一个
		    value:1,//充值张数，默认为1即monList数值第一个
			tost:"你的月票不足",//当你的月票不足时的提示语
			closeInputText:"none",//input后面那个关闭按钮
			backgroundColor:'#f85a44',//input框的背景，初始状态默认第一个所以背景红色
			AjaxNum:1,//ajax请求添加参数，选中用户投了几张
			Numbernum:'1'//选中那一张
		};
	},
	componentWillMount:function(){//组件将要加载之前，页面渲染之前的状态
		if(Number(this.props.data.balance) == 0){
			this.setState({
				backgroundColor:"#c3ced9",
			});
		};
	},
	componentDidMount:function(){
		this.setState({
			value:''
		})
	},
	//点击充值张数事件 1,2,3,4,5,全部
	clickChargeMoney:function(elt,index){
		var _this = this;
		if(index === 5){//对最后一个单独做处理
			var num = this.state.balance;
		}else{
			var num = elt.substring(0,1);
		};
		if(Number(_this.state.balance)!=0){
			_this.setState({Numbernum:num,backgroundColor:'#f85a44'});
		}
		
		// if(Number(num) > Number(this.state.balance)){
		// 	_this.setState({
		// 		backgroundColor:'#c3ced9' //如果大于总数input背景置灰
		// 	});
		// 	try{
		// 		cmrsdk.toast('你的月票不足');
		// 	}catch(e){
		// 		coToast.show('你的月票不足',2000);
		// 	}
		// }else if(Number(this.state.balance) == 0){
		// 	_this.setState({
		// 		backgroundColor:'#c3ced9'
		// 	})
		// }else{
		// 	_this.setState({
		// 		backgroundColor:'#f85a44'
		// 	})
		// };
		_this.refs.textInput.value = '';//点击月票张数，取消输入框字数
		this.setState({
			AjaxNum:num,
			currentIndex:index,
			// value:_this.state.monList[index]
		}),function(){
			_this.refs.textInput.value = '';
		}
	},
	//输入月票张数，如果输入张数大于月票总数tost提示‘你的月票不足’
	onchangeMoney:function(ev){
		var _this = this;
		var monthVote = ReactDOM.findDOMNode(_this.refs.monthVote);//获取虚拟DOM元素节点
		//console.log(monthVote.value);月票总数
		_this.setState({//与用户输入要用state状态绑定用户输入的value
			value:ev.target.value,
			AjaxNum:ev.target.value
		},function(){
			if(_this.refs.textInput.value.trim() !== ''){
				_this.state.closeInputText = 'block'
				
			}else{
				_this.state.closeInputText = 'none';
				_this.setState({backgroundColor:'#c3ced9'})
			};
			if(Number(_this.state.balance)!=0){
				_this.setState({
				backgroundColor:'#f85a44'
			})
			}
			
		});
	},
	//input聚焦时候状态展示下划线blue
	onFocusMoney:function(){
		var _this = this;
		if(_this.state.currentIndex == -1 && _this.refs.textInput.value.trim() == ""){
			_this.setState({
				backgroundColor:"#c3ced9"
			})
		}
		_this.setState({
			currentIndex:-1,
			borderBottomColor:'cmr-mv-blueColor',
			Numbernum:""
		})
	},
	//input失去焦点状态展示下划线gray
	onBlurMoney:function(event){
		var _this = this;
		_this.setState({
			borderBottomColor:'cmr-mv-grayColor'
		});
		if(_this.state.currentIndex == -1 && _this.refs.textInput.value.trim() == ""){
			_this.setState({backgroundColor:'#c3ced9'})
		}
	},
	//点击事件显示/隐藏input框取消按钮
	oncloseInut:function(){
		var _this = this;
		_this.refs.textInput.value = '';
		_this.setState({closeInputText:'none',backgroundColor:'#c3ced9'})
	},
	//后台传的参数url地址
	monthAjax:function(){
		var _this = this;
		console.log(_this.state.balance);//后端给的月票
		console.log(_this.state.backgroundColor);//input背景色
		console.log(_this.state.Numbernum);//选中哪一张
		console.log(_this.refs.textInput.value);//用户输入张数
		console.log(_this.state.AjaxNum);//c传给后端参数
		if(Number(_this.refs.textInput.value)>1000 && Number(_this.state.balance)!=0){
			_this.setState({backgroundColor:'#c3ced9',closeInputText:'none'});
			try{
					cmrsdk.toast('请输入1-1000的正整数');
				}catch(e){
					coToast.show('请输入1-1000的正整数',2000);
				}
			_this.refs.textInput.value = '';
		}else if(!(/^([1-9]\d{0,3}|1000)$/).test(_this.state.value) && _this.refs.textInput.value.trim() != "" && Number(_this.state.Numbernum)=="" && Number(_this.state.balance)!=0){//输入框不满足1-1000不能投
			_this.setState({backgroundColor:'#c3ced9',closeInputText:'none'});
			try{
					cmrsdk.toast('请输入1-1000的正整数');
				}catch(e){
					coToast.show('请输入1-1000的正整数',2000);
				}
			_this.refs.textInput.value = '';
		}else if(Number(_this.state.Numbernum) > Number(this.state.balance) && Number(_this.state.balance)!=0){
			try{
				cmrsdk.toast('你的月票不足');
			}catch(e){
				coToast.show('你的月票不足',2000);
			}
		}else if(Number(_this.refs.textInput.value) > Number(_this.props.data.balance)&& Number(_this.state.balance)!=0){//上面点击张数大于剩余张数不能投
			_this.setState({backgroundColor:'#c3ced9',closeInputText:'none'});
				try{
					cmrsdk.toast('你的月票不足');
				}catch(e){
					coToast.show('你的月票不足',2000);
				}
				_this.refs.textInput.value = '';
		}else if(_this.state.currentIndex == -1 && _this.refs.textInput.value.trim() == ""){//输入框为空时不能投
			
		}else if(Number(_this.state.AjaxNum) > Number(_this.props.data.balance)&& Number(_this.state.balance)!=0){//选中大于剩余张数不能投
				_this.setState({closeInputText:'none',backgroundColor:'#c3ced9'});
				try{
					cmrsdk.toast('你的月票不足');
				}catch(e){
					coToast.show('你的月票不足',2000);
				}
				_this.refs.textInput.value = '';
		}else if(Number(_this.state.balance) == 0){//剩余0张不能投票
			
		}else{
			_this.setState({backgroundColor:"#df513d"});
		setTimeout(function(){
			_this.setState({backgroundColor:"#f85a44"});
		},100);
		
		var AjaxUrl = _this.props.data.throwUrl;
		var _this = this;

			E.ajaxGet(AjaxUrl,_this,{monthTicketNum:_this.state.AjaxNum},function(res,data){
				if(res=='success'){
					if(data.status == "200"){
						try{
							cmrsdk.toast(data.data.tipsStr);
						}catch(e){
							coToast.show(data.data.tipsStr);
						}
						_this.setState({closeInputText:'none'});
						_this.refs.textInput.value = '';
						
					}else{
						try{
							cmrsdk.toast(data.messageDesc);
						}catch(e){
							coToast.show(data.messageDesc,2000);
						}
						_this.setState({closeInputText:'none'});
						_this.refs.textInput.value = '';
						
					}
				}else{
					try{
						cmrsdk.toast(res);
					}catch(e){
						coToast.show(res);
					}
					_this.setState({closeInputText:'none'});
					_this.refs.textInput.value = '';
					
				}
				
			});
			
		}
	},
	render: function() {
		var _this = this;
		return (
			<div className="cmr-monthticket_vote">
				<section className="cmr-mv-touvote">
					{this.state.monList.map(function(elt,index){
						return (
							<li key={index}
								className={(_this.state.currentIndex === index) ? 'active' : ''}
								onClick={this.clickChargeMoney.bind(null,elt,index)}>
							{elt}
							</li>
						)
					}.bind(_this))
					}
				</section>
				<section className="cmr-mv-server">
					<div className="cmr-mv-money">
						<em className="co-font-bigger">其它数额：</em>
						<em className={_this.state.borderBottomColor}>
							<input type="text" 
							ref="textInput" 
							placeholder="请输入月票张数" 
							onChange={this.onchangeMoney}
							onFocus={this.onFocusMoney}
							onBlur={this.onBlurMoney}
							className="co-font-bigger"
							/>
						<i className="co-icon co-close-icon cmr-mv-bv" style={{display:this.state.closeInputText}} onClick={this.oncloseInut}></i>
						</em>
					</div>
					<div className="cmr-font-bigger cmr-mv-star">
						<em className="cmr-mv-monti" style={{color:'#969f9a'}}>我的剩余月票：</em>
						<i className="cmr-mv-qian" ref="monthVote">{this.props.data.balance}张</i><i className="cmr-mv-qi"></i>
						<a href={this.props.data.helpUrl} className="cmr-mv-monthUrl">如何获取
							<i className="co-icon co-greater-icon co-font-big cmr-mv-toicon"></i>
						</a>
						
					</div>
					<a onClick={this.monthAjax} className="co-font-large cmr-mv-tove"  style={{background:this.state.backgroundColor}}>投月票</a>
				</section>
			</div>
		);
	}
});

module.exports = Monthticket_vote;
