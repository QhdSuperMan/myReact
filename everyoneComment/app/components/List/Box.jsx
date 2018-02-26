import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './Box.less';
import { Link } from 'react-router';

export default class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className="box">
                <div className="box_img">
                    <Link to={'/detail/id='+this.props.value.id}>
                        <img src={this.props.value.img} alt="美食"/>
                    </Link>
                </div>
                <div className="box_text">
                    <p>
                        <span>{ this.props.value.title }</span>
                        <span>{ this.props.value.distance }</span>
                    </p>
                    <p>
                        {this.props.value.subTitle}
                    </p>
                    <p>
                        <span>
                            ￥{ this.props.value.price }
                        </span>
                        <span>
                            { this.props.value.mumber }
                        </span>
                    </p>
                </div>
            </div>
        )
    }
}