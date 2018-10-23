import React, {Component} from 'react';
import '../styles/explore.css';
import axios from 'axios';
import ReactLoading from "react-loading";
import InfiniteScroller from 'react-infinite-scroller';
import Container from '../components/Container';
import {tagActions} from  '../actions/tagActions.js';
import { connect } from 'react-redux';
import {searchActions} from '../actions/searchActions.js';


const key_flickr = "f37e96732f6075d33fc9f734702eaf7d";
class Tag extends Component {
    constructor(props) {
        super(props);
        this.state = {
                hasMore: true,
                elements: [],
                numberPage: 1,
                isLoading:false,
                raw: ""
            };
    }

    type = "spokes";
    loadMore(page) {
        const raw = this.props.match.params.id;
        setTimeout(() => {
            let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key_flickr}&tags=${raw}&date=&extras=url_z%2C+views%2C+owner_name&per_page=20&page=${page}&format=json&nojsoncallback=1`;
            axios.get(url)
            .then((res) => {
                this.setState({
                elements: this.state.elements.concat(res.data.photos.photo),
                numberPage: res.data.photos.page + 1,
                hasMore: this.state.numberPage < res.data.photos.pages ? true:false,
                isLoading:true,
                })
            })
        }, 0);
    }

    componentDidMount() {
        this.setState({
            raw: this.props.match.params.id
        })
    }

    componentDidUpdate() {
        const raw = this.props.match.params.id;
        if (raw != this.state.raw) {
            this.setState({
                raw,
                elements: []
            })
        }
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
        const tag = this.getTag();
        let payload = {};
        payload.item = tag;
        this.props.setTag(payload);

        const loader =
            <div className="loader" key={0}>
                <ReactLoading type={this.type} color="black" height={100} width={100}/>
            </div>

        let images = this.state.elements.map(photo => {
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
                    loadMore={this.loadMore.bind(this)}
                    hasMore={this.state.hasMore}
                    threshold={50}
                    loader={loader}>
                    <Container images={images}></Container>
                </InfiniteScroller>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    hasMore: state.tagReducers.hasMore,
    elements: state.tagReducers.elements,
    numberPage: state.tagReducers.numberPage,
    item: state.searchReducers.item,
})

const mapDispatchToProps = (dispatch) => ({
    loadMore: (payload) => dispatch(tagActions.actionLoadMore(payload)),
    reset: () => dispatch(tagActions.actionReset),
    setTag: (payload) => dispatch(searchActions.actionSearch(payload)),    
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tag);
