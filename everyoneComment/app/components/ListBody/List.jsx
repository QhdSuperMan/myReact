import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import LoadMore from '../loadMore';

import './List.less';

export default class DetailList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
                <div className="dList_box">
                    {
                        this.props.data.map((value,index)=>{
                            return <div className="d_List" key={index}>
                                <div className="d_usename" >
                                    <span>{ value.username }</span>
                                    <span className="float-right" >{
                                        [0, 1, 2, 3, 4].map((val,key)=>{
                                            return <i key={key}  className={
                                                key<value.star? 'action icon iconfont icon-star':'icon iconfont icon-star' } ></i>
                                        })
                                    }</span>
                                </div>
                                <p className="d_p">{ value.comment }</p>
                            </div>
                        })
                    }
                    <LoadMore load={ this.props.load } />
                </div>
        )
    }
}