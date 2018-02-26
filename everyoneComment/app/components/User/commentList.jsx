import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './commentList.less'
export default class CommentList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state ={
            redux:0
        }
    }

    render() {
        return (
            <div>
                <div className="user_comment">
                    <div className="user_img">
                        <img src={ this.props.data.img } alt="美食"/>
                    </div>
                    <div className="user_text" >
                        <p>商户：{ this.props.data.title }</p>
                        <p>数量： { this.props.data.count }</p>
                        <p>价格：{ this.props.data.price }</p>
                    </div>
                    <div className="user_btn">
                        {
                            this.state.redux===0
                                ? <span onClick={()=>{
                                this.setState({ redux:1 })
                            } } className='beginComment' >评价</span>
                                : this.state.redux===2
                                    ? <span className="finishComment" >已评价</span>
                                    : ''
                        }
                    </div>
                </div>
               {
                    this.state.redux===1
                    ? <div className="user_addComment">
                            <textarea className="user_area" ></textarea>
                            <p className="user_addBtn" >
                                <span onClick={ ()=>{
                                        this.setState({redux:2})
                                }}>评价</span>
                                <span onClick={ ()=>{
                                    this.setState({redux:0})
                                }}>取消</span>
                            </p>
                    </div>
                    : ''
                }
            </div>

        )
    }
    componentDidMount(){
        this.setState({
            redux:this.props.data.commentState
        })
    }
}