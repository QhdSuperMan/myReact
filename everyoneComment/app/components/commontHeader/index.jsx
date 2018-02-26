import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { hashHistory } from 'react-router';

import './style.less';

export default class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className='city_header' >
                    <div onClick={  ()=>{ hashHistory.push('/') } } >
                        <i className='icon iconfont icon-right-copy' ></i>
                    </div>
                    <div>{ this.props.title }</div>
                    <div> &nbsp;</div>
            </div>
        )
    }
}