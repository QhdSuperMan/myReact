import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ListHeader from '../../components/ListHeader';
import ListBody from '../../components/ListBody'
export default class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div>
                <ListHeader id={this.props.params.id} />
                <div className="through" > </div>
                <ListBody id={this.props.params.id} />
            </div>
        )
    }

}