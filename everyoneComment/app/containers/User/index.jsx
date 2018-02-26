import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import UserCenter from '../../components/User/User'


class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state ={
            isLogin:false
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.isLogin
                    ? <UserCenter user={ this.props.usename.usename } />
                    : ''
                }
            </div>
        )
    }
    componentDidMount(){
        if(!this.props.usename.username){
            hashHistory.push('/Login')
        }
        this.setState({
            isLogin:true
        })
    }
}
function mapStateToProps(state){
    return {
        usename:state.userinfo
    }
}
function mapDispatchToProps(dispatch){
    return {

    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(User)