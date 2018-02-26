import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as fetch from '../../fetch/detail/detai';
import List from './List.jsx';

import './style.less';

export default class DetailBody extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data:[],
            age:0
        }
    }
    render() {
        return (
            <div className="d_Comment">
                <div className="d_main clear" >
                    <span className="float-left" >网友点评</span>
                    <span className="float-right">查看全部<i className="icon iconfont icon-enter" ></i></span>
                </div>
                {
                    this.state.data.length
                    ? <List data={this.state.data}  load={ this.load.bind(this) } />
                    : <div>加载中...</div>
                }
            </div>
        )
    }
    componentDidMount(){
        this.isMount = true;
        this.load()
    }
    componentWillUnmount(){
        this.isMount = false;
    }
    load(){
        let result = fetch.getCommentData(this.state.age,this.props.id);
        result.then(data=>{
            return data.json()
        }).then(json=>{
            if(!this.isMount){
                return
            }
            this.setState ({
                data:this.state.data.concat(json.data)
            })
            this.setState({
                age:this.state.age+1
            })
        })
    }
}