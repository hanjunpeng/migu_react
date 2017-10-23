/**
 * React Monthticket_benefit插件
 	@author 韩俊朋--月票福利
 	@props data（必选属性前面带＊，非必选项目请备注默认值）
 		－*url : String,//eg
		-closeMyself : false(默认) //eg
	@example
	<Monthticket_benefit data={{url:"",closeMyself:true}}/>

 */
require('./monthticket_benefit.scss');
var Pagger=require('plugin/pagger');

var Monthticket_benefit = React.createClass({
	getInitialState: function() {
		return {
			data:this.props.data,
			hasMore:Number(this.props.data.currentPage) >= Number(this.props.data.totalPage)?false:true
		};
	},
    componentDidMount:function () {
        $(".cmr-mb-monthtic-detail,.cmr-mb-monthtic-detailsecond,.cmr-mb-monthtic-detailthird").each(function(index,data ){
            console.log(data);
            var height = $(data).find("em")[0].getBoundingClientRect().height;
            if (height < 30) {
                data.className = "cmr-mb-monthtic-detail";
            } else if (height < 50) {
                data.className = "cmr-mb-monthtic-detailsecond";
            } else {
                data.className = "cmr-mb-monthtic-detailthird";
            }
        })
    },
	ajaxdata:function(self){
		var _this = this;
		var pageNo = Number(_this.state.data.currentPage) + 1;
		setTimeout(function(){
			E.ajaxGet("a/ms.growup.cardService/getMonthlyTicketList.json",_this,{pageNo:pageNo},function(res,data){
				if(res === "success"){
					_this.state.data.dataList = _this.state.data.dataList.concat(data.data.dataList);
					_this.state.data.currentPage = pageNo;
					_this.setState({
						data: _this.state.data,
						hasMore:Number(data.data.currentPage) >= Number(data.data.totalPage) ? false :true
					},function(){
						self.setState({
							paggerEnable:true
						});
					});
				};
			})
		},500)
	},
	pageLoad:function(){
		var _this = this;
		return (
			<div style={{display:_this.state.hasMore?"block":"none"}}>
				<Pagger data={{callback:_this.ajaxdata,hasMore:_this.state.hasMore}}  />
            </div>
		);
	},
	listdata:function(){
		var _this = this;
		return (//函数返回要有return，加载函数return返回这里面的东西
			_this.props.data.dataList.map(function(item,index){
				console.log(item.bookName.length);
				var book = "";
				if(item.bookName.length < 11){
					book = "cmr-mb-monthtic-detail";
				}else if( item.bookName.length < 25){
					book = "cmr-mb-monthtic-detailsecond";
				}else{
					book = "cmr-mb-monthtic-detailthird";
				};
				return (
					<div className = {book} key={index} ref="book">
						<em ref="em">{item.bookName}</em>
						<em>消耗月票：{item.useNum}张</em>
						<em>使用时间：{item.useTime}</em>
					</div>
				);
			})
		)
	},
	render: function() {
		var _this = this;
		return (
			<div className="cmr-monthticket_benefit">
				<section className="cmr-mb-title">
					<i></i>
					<span className="cmr-mb-month-title">您有{_this.props.data.cardCount}<em>张月票</em></span>
					<span>即将失效</span>
				</section>
				<section className="cmr-mb-growhead">
					<i></i>权益说明
				</section>
				<section className="cmr-mb-fuwen">
				<div dangerouslySetInnerHTML={{__html: this.props.data.richContent}}/>
				</section>
				<section className="cmr-mb-growhead">
					<i></i>{_this.props.data.title}
				</section>
				<section className="cmr-mb-dcontainer">
					{_this.listdata()}
					{_this.pageLoad()}
				</section>
			</div>
		);
	}
});

module.exports = Monthticket_benefit;
