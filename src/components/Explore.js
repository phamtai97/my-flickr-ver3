import React, {Component} from 'react';
import '../styles/explore.css';
import axios from 'axios';
import ReactLoading from "react-loading";
import InfiniteScroller from 'react-infinite-scroller';
import Container from '../components/Container.js';
import {exploreActions} from '../actions/exploreActions.js';
import { connect } from 'react-redux';
import {searchActions} from '../actions/searchActions.js';

const key_flickr = "f37e96732f6075d33fc9f734702eaf7d";

class Explore extends Component {
    constructor(props){
        super(props);
        let payload = {};
        payload.item = '';
        this.props.setTag(payload);
    }
    type = "spokes";
    loadMore(page) {
        const {numberPage} = this.props;

        setTimeout(() => {
            let url = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${key_flickr}&date=&extras=url_z%2C+views%2C+owner_name&per_page=20&page=${page}&format=json&nojsoncallback=1`;
            axios.get(url)
            .then((res) => {
                let payload = {};
                payload.hasMore = numberPage < res.data.photos.pages ? true : false;
                payload.elements = res.data.photos.photo;
                payload.numberPage = res.data.photos.page + 1;

                this.props.loadMore(payload);
            })
        }, 0);
    }

    render() {
        const {hasMore, elements} = this.props;
        const loader =
            <div className="loader" key={0}>
                <ReactLoading type={this.type} color="black" height={100} width={100}/>
            </div>

        let images = elements.map(photo => {
            return {
                src: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`,
                id:photo.id,
                thumbnail: photo.url_z,
                thumbnailWidth: parseInt(photo.width_z),
                thumbnailHeight: parseInt(photo.height_z),
                caption: photo.title,
                ownername: photo.ownername,
                views: photo.views,
            };
        });

        return (
            <div className = "Explore" >
                <InfiniteScroller
                    className={"main-explore"}
                    pageStart={0}
                    loadMore= {this.loadMore.bind(this)}
                    hasMore= {hasMore}
                    threshold={50}
                    loader={loader}>
                    <Container images={images}></Container>
                </InfiniteScroller>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    hasMore: state.exploreReducers.hasMore,
    elements: state.exploreReducers.elements,
    numberPage: state.exploreReducers.numberPage,
    item: state.searchReducers.item,
})

const mapDispatchToProps = (dispatch) => ({
    loadMore: (payload) => dispatch(exploreActions.actionLoadMore(payload)),
    setTag: (payload) => dispatch(searchActions.actionSearch(payload)),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Explore);
