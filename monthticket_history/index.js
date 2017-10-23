/**
 * React Monthticket_history插件
 	@author --马春延
 	@props data（必选属性前面带＊，非必选项目请备注默认值）
 		－*url : String,//eg
		-closeMyself : false(默认) //eg
	@example
	<Monthticket_history data={{url:"",closeMyself:true}}/>

 */
require('./monthticket_history.scss');
var Pagger=require('plugin/pagger');
var Monthticket_history = React.createClass({
	getInitialState: function() {
		return {
			data:this.props.data,
			hasMore:Number(this.props.data.currentPageNo) === Number(this.props.data.totalPage)?false:true
		};
	},
	getMonthtickList:function(){
     return this.state.data.records.map(function(res,i){
            return(
				<li className="cmr-month-list" key={i}>
					<p className="cmr-month-list-leftP">{res.showName}</p> 
					<p className="cmr-month-list-centerP">投了月票{res.monthTicketNum}张</p>
					<p className="cmr-month-list-lastP">{res.timeStr}</p>
				</li>  
			)
        })
	},
	abCallback:function(self){
		var me =this;
	 	var pageNo = Number(me.state.data.currentPageNo) + 1;
	 	setTimeout(function(){
	 		// a/ms.sns.MonthTicket/monthTicketHis.json
	 		// /a/ms.selection.miguGuessService/getMiguaaa.json  测试地址
		 	E.ajaxGet("a/ms.sns.MonthTicket/monthTicketHis.json",me,{pageNo:pageNo},function(res,data){
		 		if(res === 'success'){	
		 			me.state.data.records = me.state.data.records.concat(data.data.records);
		 			me.state.data.currentPageNo = pageNo;
                    me.setState({
			 			data : me.state.data,
			 			hasMore:Number(data.data.currentPageNo) >= Number(data.data.totalPage) ? false :true
	 			    },function(){
		 				self.setState({
							paggerEnable:true
						});
		 			});
		 	    }	
		 	});
		},300);
	},
	pageLoad:function(){
		return(
			<div style={{display:this.state.hasMore?"block":"none"}}>
				{
			    this.state.data.records.length === 0 || Number(this.props.data.currentPageNo) >= Number(this.props.data.totalPage)?'':
                <Pagger data={{callback:this.abCallback,hasMore:this.state.hasMore}}  />
                }
            </div>
		);
	},
	getMonthticketHistory:function(){
		return(
			<div className="co-tt-container">
				<span className="co-bold co-font-larger cmr-month-pass-title">月票记录</span>
				<ul className="cmr-month-list-warp">
                    {this.getMonthtickList()}
				</ul>
			</div>
		)
	},
	render: function() {
		return (
			<div className="cmr-monthticket_history">
			    {this.getMonthticketHistory()}
			    {this.pageLoad()}
			</div>
		);
	}
});

module.exports = Monthticket_history;
