import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CommontHeader from '../../components/commontHeader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MoonLogin from '../../components/Login';
import { hashHistory } from 'react-router';
import * as actioner from '../../actions/userinfo';



class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state ={
            checking:true
        }
    }

    render() {
        return (
            <div>
                <CommontHeader title="登录" />
                {
                    this.state.checking
                    ? <div>{/* 已经登录 */}</div>
                    : <MoonLogin sumbit={ this.sumbit.bind(this) } />
                }
            </div>
        )
    }
    componentDidMount(){
        this.getCheck()
    }
    getCheck(){
        if(this.props.username.username){
            this.goUser()
        }else{
            this.setState({
                checking:false
            })
        }
    }
    sumbit(data){
        let box = this.props.username;
        box.username = data
        this.props.add(box);
        if(this.props.params.router){
            hashHistory.push(this.props.params.router)
        }else{
            this.goUser()
        }
    }
    goUser(){
        hashHistory.push('/User')
    }
}
function mapStateToProps(state){
     return {
        username:state.userinfo
    }
}
function mapDispatchToProps(dispatch){
    return {
        add:bindActionCreators(actioner.update,dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)