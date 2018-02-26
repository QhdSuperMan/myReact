import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less'

export default class MoonLogin extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state ={
            usename:'',
            password:''
        }
    }

    render() {
        return (
            <div className="Login_box">
                <div>
                    <span>用户名</span><input
                    value={ this.state.usename }
                    onChange={ this.getInputVal.bind(this) }
                    type="text"/>
                </div>
                <div>
                    <span>密码</span><input
                    type="password"/>
                </div>
                <span onClick={ this.sumbit.bind(this) }  className="float-right">登录</span>
            </div>
        )
    }
    getInputVal(event){
        this.setState({
            usename:event.target.value
        })
    }
    sumbit(){
        if(this.state.usename){
            this.props.sumbit(this.state.usename)
        }
    }


}