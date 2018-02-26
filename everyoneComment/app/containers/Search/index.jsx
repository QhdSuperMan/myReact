import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SearchInput from '../../components/SearchInput';
import {hashHistory} from 'react-router';
import List from './subpage/List'

import './style.less';

export default class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className="search" >
                <div className="searchHeader"  >
                    <div className="goBack" onClick={ this.goBack.bind(this) }  >
                        <i className="icon iconfont icon-right-copy" >  </i>
                    </div>
                    <div className="search_container" >
                        <i className="icon iconfont icon-search" ></i>
                        <SearchInput
                            value={ this.props.params.category }
                            enterHandle={ this.enterHandle.bind(this) }

                            className="search_input" />
                    </div>
                </div>
                <List     category={ this.props.params.category }
                          keyword={ this.props.params.keyword}
                />
            </div>
        )
    }
    componentDidMount(){

    }
    enterHandle(val){
        hashHistory.push('/search/all/keyword='+encodeURIComponent(val))
    }
    goBack(){
        window.history.back(-1);
    }
}