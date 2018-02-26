import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect }  from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionner from '../../actions/userinfo'
import CommontHeader from '../../components/commontHeader';
import { hashHistory } from 'react-router';

import './style.less';

class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            cityList:['北京','上海','广州','深圳','南京','秦皇岛','山海关','保定',
            '天津','重庆','武汉','杭州']
        }
    }
    render() {
        return (
            <div className='city' >
                    <CommontHeader title='选择城市' />
                    <div className='offset_city' >
                        { this.props.city.cityName }
                    </div>
                    <div className='cityList' >
                        <div >
                            热门城市
                        </div>
                        <div className='citySelect' >
                            {
                                this.state.cityList.map((val,index)=>{
                                    return <div key={index} data-city={val} onClick={ this.update.bind(this,val) } >
                                            <span>{ val }</span>
                                    </div>
                                })
                            }
                        </div>
                    </div>
            </div>
        )
    }
    update(val){
        if(val!==null){
            let box =this.props.city;
            box.cityName = val
            this.props.update.update(box)
        }
        hashHistory.push('/')
    }
}
function mapStateToProps(state){
    return {
        city:state.userinfo
    }
}
function mapDispatchToProps(dispatch){
    return {
        update:bindActionCreators(actionner,dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(City)