import React, {Component} from 'react';
import '../styles/explore.css';
import axios from 'axios';
import ReactLoading from "react-loading";
import {bindActionCreators} from 'redux';
import InfiniteScroller from 'react-infinite-scroller';
import Container from '../components/Container.js';
import {exploreActions} from '../actions/exploreActions.js';
import { connect } from 'react-redux';

const key_flickr = "f37e96732f6075d33fc9f734702eaf7d";

class Explore extends Component {
    // constructor(props) {
    // super(props);
    // // this.state = {
    // //     hasMore: true,
    // //     elements: [],
    // //     numberPage: 1,
    // //     isLoading:false
    // //     };
    // }

    type = "spokes";
    loadMore(page) {
        const {numberPage} = this.state;
        console.log(this)
        setTimeout(() => {
            let url = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${key_flickr}&date=&extras=url_z%2C+views%2C+owner_name&per_page=20&page=${page}&format=json&nojsoncallback=1`;
            axios.get(url)
            .then((res) => {
                let payload;
                payload.hasMore = numberPage < res.data.photos.pages ? true : false;
                payload.elements = res.data.photos.photo;
                payload.numberPage = res.data.photos.page + 1;

                this.props.loadMore(payload);            
                // this.setState({
                //     elements: this.state.elements.concat(res.data.photos.photo),
                //     numberPage: res.data.photos.page + 1,
                //     hasMore: this.state.numberPage < res.data.photos.pages ? true:false,
                //     isLoading:true,
                // })
            })
        }, 0); 
    }

    render() {
        const {hasMore, elements} = this.props; 
        console.log("SDAFSD");
        console.log(this);

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


// function mapStateToProps(state){
//     const {hasMore, elements, numberPage} = state;
//     return {
//         hasMore, 
//         elements, 
//         numberPage, 
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         loadMore: bindActionCreators(exploreActions.actionLoadMore, dispatch)
//     };
// }


export default Explore;
