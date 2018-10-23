import React, {Component} from 'react';
import Search from '../components/Search.js'
import '../styles/header.css';
import {withRouter} from "react-router-dom";
import {searchActions} from '../actions/searchActions.js';
import { connect } from 'react-redux';

class Header extends Component {
    goToPageExplorer(){
        let payload = {};
        payload.item = "";
        this.props.setTag(payload);
        this.props.history.push('/explore');
    }

    goToPageHome(){
        let payload = {};
        payload.item = "";
        this.props.setTag(payload);
        this.props.history.push('/');
    }

    render() {
        return ( 
            <div className = "header" >
                <div className = "app-name" onClick={this.goToPageHome.bind(this)}> 
                    My Flickr 
                </div> 

                <a className = "explore" onClick={this.goToPageExplorer.bind(this)}>
                    Explore
                </a> 

                <div className = "mssv" > 
                    1512472
                </div> 

                <div className="search">
                    <Search></Search>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    item: state.searchReducers.item,
})

const mapDispatchToProps = (dispatch) => ({
    setTag: (payload) => dispatch(searchActions.actionSearch(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
