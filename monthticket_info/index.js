/**
 * React Monthticket_info插件
 	@author 韩俊朋--月票信息
 	@props data（必选属性前面带＊，非必选项目请备注默认值）
 		－*url : String,//eg
		-closeMyself : false(默认) //eg
	@example
	<Monthticket_info data={{url:"",closeMyself:true}}/>

 */
require('./monthticket_info.scss');
var Img = require('plugin/img');

var Monthticket_info = React.createClass({
	getInitialState: function() {
		return {};
	},
	monthInfo:function(type){
		switch(type){
			case "1":
				return (<span className="co-font-biggest cmr-mi-biao">荣登榜首，谢谢大家支持！</span>)
			break;
			case "2":
				return (<span className="co-font-biggest cmr-mi-biao">距上一名只差<i className="cmr-mi-num">{this.props.data.piecesNum}</i>张, 撒娇卖萌求打赏！</span>)
			break;
			case "3":
				return (<span className="co-font-biggest cmr-mi-biao">离上榜(100名)还差一点,撒娇卖萌求月票！</span>)
			break;	
		}
	},
	render: function() {
		return (
			//return只允许有一个顶层
			<div className="cmr-monthticket_info">
				<section className="cmr-mi-info">
					<div className="cmr-mi-top">
						<div className="cmr-mi-name">
							<span className="co-font-largest cmr-mi-wei">{this.props.data.rankingStr}</span>
							<span className="co-font-bigger cmr-mi-qian">当前排名</span>
						</div>
							<div className="cmr-mi-img">
							<Img data={{url:this.props.data.bookPicUrl}}/>
						</div>
						<div className="cmr-mi-name-right cmr-mi-name">
							<span className="co-font-largest cmr-mi-wei">{this.props.data.monthTicketNum}</span>
							<span className="co-font-bigger cmr-mi-qian">本书获月票</span>
						</div> 
					</div>
					<div className="cmr-mi-bottom">
						<img src="http://wap.cmread.com/rbc/p/content/repository/ues/image/s109/monthpiao.png" className="cmr-mi-logo" alt=""/>
						{this.monthInfo(this.props.data.hintType)}
					</div> 
				</section>
			</div>
		);
	}
});

module.exports = Monthticket_info;
