import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import LoadMore from '../loadMore/index.jsx';
import * as fetch from '../../fetch/home/home.js' ;
import { connect }  from 'react-redux';
import Box  from './Box'
import { bindActionCreators } from 'redux'

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
       //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data:[],
            age:0,
            isLoad:false
        }
    }

    render() {
        return (
            <div className="List" >
                {
                    this.state.data.length
                    ? this.state.data.map((value,index)=>
                        <Box value={value} key={index} />
                    )
                    : <div>正在加载</div>
                }
               <LoadMore  isLoade={this.state.isLoad}  load={this.load.bind(this)} ></LoadMore>
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
        let result = fetch.getListData(this.props.cityName,this.state.age);
        result.then(data=>{
            return data.json()
        }).then(json=>{
            if(this.isMount){
                this.setState({
                    data:this.state.data.concat(json.data)
                })
                this.setState({
                    age:this.state.age+1
                })
            }
        })
    }
}
function mapStateToProps(state){
     return{
        cityName:state.userinfo.cityName
    }
}
function mapDispatchToProps(dispacth){
    return{

    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List)
