import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less'
export default class Add extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className="collect">
                {
                    this.props.isCollect
                    ? <span className="action" onClick={ ()=>{
                        this.props.collect()
                    } }>已收藏</span>
                    : <span onClick={ ()=>{
                        this.props.collect()
                    } }>收藏</span>
                }
                <span onClick={ ()=>{
                    this.props.buy()
                } }>购买</span>
            </div>
        )
    }
}