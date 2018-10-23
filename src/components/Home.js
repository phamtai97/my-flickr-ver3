import React, {Component} from 'react';
import '../styles/home.css';
import {searchActions} from '../actions/searchActions.js';
import { connect } from 'react-redux';

const width = window.innerWidth
class Home extends Component {
    constructor(props){
        super(props);
        let payload = {};
        payload.item = '';
        this.props.setTag(payload);
    }

    render() {
        return (
            <div className = "Home" >
                <div className = "main-home">
                    <marquee width={width} direction="left" behavior="sroll" scrollamount="30">Welcome to My Flickr</marquee>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
