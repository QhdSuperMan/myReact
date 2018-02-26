import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import {bindActionCreators } from 'redux';
import * as fetch from '../../../fetch/search/search';
import LoadMore from '../../../components/LoadMore';
import ListCompoent from '../../../components/List';


const initialState = {
    data: [],
    hasMore: false,
    isLoadingMore: false,
    page: 0
}
 class SearchList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = initialState
    }

    render() {
        return (
            <div>
                {
                    this.state.data.length
                        ? <ListCompoent data={this.state.data}/>
                        : <div>{/* 加载中... */}</div>
                }
            </div>
        )
    }
     componentDidMount(){
         this.load()
     }
     componentWillUpdate(prevProps,prevState){
         let category = this.props.category;
         let keyword =  this.props.keyword;
         if(prevProps.category === category && prevProps.keyword === this.props.keyword ){
             return
         }
         this.load(prevProps.keyword,prevProps.category)
     }
     load(key=this.props.keyword,category =this.props.category ){
        let result = fetch.getSearchData(this.state.page,this.props.city,category,key)
        result.then(data=>{
            return data.json()
        }).then(json=>{
            this.setState({
                data:this.state.data.concat(json.data)
            })
            this.setState({
                page:this.state.page+1
            })
        })
     }

}
function mapStateToProps(state){
     return {
         city:state.userinfo.cityName
     }
}
function mapDispatchToProps(dispatch){
    return {

    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchList)