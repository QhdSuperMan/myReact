import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './style.less'
export default class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            control:this.props.isLoad
        }
    }

    render() {
        return (
            <div className="Load_more"  ref="load" >
                {
                    this.state.control
                    ? <div>加载中</div>
                    : <div onClick={ this.load.bind(this) }>加载更多</div>
                }
            </div>
        )
    }
    load(){
        this.setState({
            control:true
        })
        this.props.load()
        this.setState({
            control:false
        })
    }
    componentDidMount(){
        let fn = this.props.load;
        let loadDom = this.refs.load ;
        let timer;
        function callback(){
            let top = window.screen.height
            let oTop = loadDom.getBoundingClientRect().top
            if(oTop < top){
                fn()
            }
        }
        window.addEventListener('scroll', function () {
            if (this.state.control) {
                return
            }
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(callback, 50)
        }.bind(this), false);
    }
}