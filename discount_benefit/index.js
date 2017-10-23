/**
 * React Discount_benefit插件
 	@author 韩俊朋-点播折扣福利组件
 	@props data（必选属性前面带＊，非必选项目请备注默认值）
 		－*url : String,//eg
		-closeMyself : false(默认) //eg
	@example
	<Discount_benefit data={{url:"",closeMyself:true}}/>

 */
require('./discount_benefit.scss');


var Discount_benefit = React.createClass({
	getInitialState: function() {
		return {

		};
	},
	render: function() {
		return (
			<div className="cmr-discount_benefit">
				<section className="cmr-db-title">
					<i></i>
					<h1>点播享8折</h1>
				</section>
				<section className="cmr-db-centain">
					<div className="cmr-db-growhead">
						<i></i>权益说明
					</div>
					<div className="cmr-db-fuwen">
						<div dangerouslySetInnerHTML={{__html: this.props.data.richContent}}/>
						<div className="cmr-mv-oder">
							<i>用户等级</i>
							<i>享受点播折扣</i>
							<i>LV1-LV6会员用户 </i>
							<i>8折</i>
							<i> LV7-LV8会员用户</i>
							<i>7折</i>
							<i>LV10会员用户 </i>
							<i> 6折</i>
						</div>
					</div>
					
				</section>
				<a href={this.props.data.submitUrl} className="cmr-db-footer">
					马上去使用
				</a>
			</div>
		);
	}
});

module.exports = Discount_benefit;
