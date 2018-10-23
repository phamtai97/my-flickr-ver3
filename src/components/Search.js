import React, {Component} from 'react';
import SearchInput from 'react-search-input'
import '../styles/search.css';
import iconSearch from '../resource/iconsearch.png';
import {withRouter} from "react-router-dom";
import {searchActions} from '../actions/searchActions';
import { connect } from 'react-redux';

class Search extends Component {
    constructor(props) {
        super(props);
        this.searchUpdated = this.searchUpdated.bind(this);
        this.searchItems = this.searchItems.bind(this);
    }

    searchUpdated (item) {
        let payload = {};
        payload.item = item;
        this.props.searchUpdated(payload);
    }

    searchItems(){
        const {item} = this.props;
        this.props.history.push('/photos/tags/' + item);
    }

    getTag(){
        const url = window.location.href.split('/');
        if(url.length === 6 && url[4] === "tags"){
            return url[5];
        }else{
            return null;
        }
    }

    render() {
        const {item} = this.props;
        return (
            <div className="search">
                <div className = "search-conatainer" >
                    <SearchInput value={item} className="search-input" onChange={this.searchUpdated} onKeyUp={(event) => {
                        if (event.key === 'Enter') {
                            this.searchItems();
                        }}}/>
                </div>
                <button className="btnSearch" onClick={this.searchItems}>
                    <img src={iconSearch}/>
                </button>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    item: state.searchReducers.item,
})

const mapDispatchToProps = (dispatch) => ({
    searchUpdated: (payload) => dispatch(searchActions.actionSearch(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));
