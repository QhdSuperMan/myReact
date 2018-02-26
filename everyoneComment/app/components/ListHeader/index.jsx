import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as fetch from '../../fetch/detail/detai';
import { hashHistory } from 'react-router';
import CommontHeader from '../commontHeader';
import Add from './Add';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actioner from '../../actions/store';


import './style.less';

class ListHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state ={
            data:'',
            isLogin:false,
            isCollect:false
        }
    }
    render() {
        return (
             <div className="d_info" >
                 <CommontHeader title="商户详情" />
                <div className="d_shop" >
                    <div className="d_shopImg" >
                        <img src={ this.state.data.img } alt="稍等"/>
                    </div>
                    <div className="d_shopText" >
                        <p>{ this.state.data.title }</p>
                        <p>
                            {
                                [0, 1, 2, 3, 4].map((value, index) => {
                                    return <i key={ index } className={index < this.state.data.star
                                        ? 'icon iconfont icon-star action' : 'icon iconfont icon-star' }
                                    ></i>
                                })
                            }
                            <span>￥{ this.state.data.price }/人</span>
                        </p>
                        <p>{ this.state.data.subTitle }</p>
                    </div>
                </div>
                 <div className="workTime" >
                     <p  dangerouslySetInnerHTML={{__html: this.state.data.desc}} ></p>
                 </div>
                 <Add id={ this.props.id }
                 isCollect={ this.state.isCollect }
                 collect={ this.collect.bind(this) }
                 buy={ this.buy.bind(this) }
                 />
            </div>
        )
    }
    componentDidMount(){
        let result = fetch.getInfoData(this.props.id)
        result.then((data)=>{
            return data.json()
        }).then(json=>{
            this.setState({
                data:json
            })
        })
        this.props.username.store.map((value)=>{
            if(value===this.props.id){
                this.setState({
                    isCollect:true
                })
            }
        })
        this.checking()
    }
    //验证登录
    checking(){
        if(!this.props.username.userinfo.username){
            return
        }
        this.setState({
            isLogin:true
        })
    }
    //收藏函数
    collect(){
        if(!this.state.isLogin){
            hashHistory.push('/Login/'+encodeURIComponent('/detail/' + this.props.id))
            return
        }
        if(this.state.isCollect){
            this.props.add.rm(this.props.id);
            this.setState({
                isCollect:false
            })
        }else{
            this.props.add.add(this.props.id);
            this.setState({
                isCollect:true
            })
        }
    }
    //购买函数
    buy(){
        if(!this.state.isLogin){
            hashHistory.push('/Login/'+encodeURIComponent('/detail/' + this.props.id))
            return
        }
        hashHistory.push('/user')
    }
}
function mapStateToProps(state){
    return{
        username:state
    }
}
function mapDispatchToProps(dispatch){
    return {
        add:bindActionCreators(actioner,dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListHeader)