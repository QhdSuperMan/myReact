import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CommontHeader from '../commontHeader';
import { connect } from 'react-redux';
import * as fetch from '../../fetch/user/orderlist';
import CommentList from './commentList'

import './style.less'
class UserCenter extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state ={
            data:[]
        }
    }

    render() {
        return (
            <div>
                <CommontHeader title="用户中心" />
                <div  className="user_info">
                    <p><i className="icon iconfont icon-yonghu" ></i><span>{ this.props.store.userinfo.username } </span></p>
                    <p><i className="icon iconfont icon-position" ></i><span>{ this.props.store.userinfo.cityName } </span></p>
                </div>
                <div className="through"></div>
               {
                    this.state.data.length
                    ? this.state.data.map((val, index) => {
                            return <CommentList key={index} data={ val } > </CommentList>
                        })
                    : <div>正在加载...</div>
                }

            </div>
        )
    }
    componentDidMount(){
        fetch.getOrderListData(this.props.store.userinfo.username).then(data=>{
            return data.json()
        }).then(json=>{
            this.setState({
                data:json
            })
        })
    }
}
function mapStateToProps(state){
    return {
       store:state
    }
}
function mapDispatchToProps(dispatch){
    return{

    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserCenter)