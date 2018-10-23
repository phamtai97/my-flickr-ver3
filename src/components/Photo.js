import React, {Component} from 'react';
import axios from 'axios';
import ReactLoading from "react-loading";
import '../styles/photo.css';
import {withRouter} from "react-router-dom";
import {photoActions} from '../actions/photoActions.js';
import {searchActions} from '../actions/searchActions';
import { connect } from 'react-redux';

const key_flickr = "f37e96732f6075d33fc9f734702eaf7d";
class Photo extends Component {
    constructor(props) {
        super(props);
        this.state={
            isload: true
        }
        this.loadImage = this.loadImage.bind(this);
        let payload = {};
        payload.item = '';
        this.props.setTag(payload);
    }
    type = "spokes";

    async loadImage(id){
        const {setImageSize, setImageInfo, setFav} = this.props;

        let urlSize = `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${key_flickr}&photo_id=${id}&format=json&nojsoncallback=1`;
        let urlInfo = `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${key_flickr}&photo_id=${id}&format=json&nojsoncallback=1`;
        let urlFav = `https://api.flickr.com/services/rest/?method=flickr.photos.getFavorites&api_key=${key_flickr}&photo_id=${id}&format=json&nojsoncallback=1`
        let payload = {};
        payload.isLoading = true;
        this.props.setIsLoading(payload);
        await axios.get(urlSize)
        .then((res)=>{
            payload = {};
            payload.imageSize = res.data.sizes.size[7];
            setImageSize(payload);
            payload = {};
            payload.isLoading = false;
            this.props.setIsLoading(payload);
        })

        await axios.get(urlInfo)
        .then((res)=>{
            const payload = {};
            payload.imageInfo = res.data.photo;
            setImageInfo(payload);
        })

        axios.get(urlFav)
        .then((res)=>{
            const payload = {};
            payload.fav = res.data.photo.total;
            setFav(payload);
        })
    }

    goToPagTags(tagRaw){
        let payload = {};
        payload.item = tagRaw;
        this.props.setTag(payload);
        this.props.history.push('/photos/tags/' + tagRaw)
    }

    render() {
        const {imageSize, imageInfo, fav, isLoading} = this.props;

        if(this.state.isload){
            const id = this.props.match.params.id;
            this.loadImage(id);
            this.setState({
                isload:false,
            })
        }

        return (
            <div className="main-photo">
                {(imageSize === null) || (imageInfo === null) ?
                    (
                        <div className="loader" key={0}>
                            <ReactLoading type={this.type} color="black" height={100} width={100}/>
                        </div>
                    )
                    :
                    (
                        <div className="container-photo">
                            <div className="photo">
                                {isLoading ?
                                    (
                                        <div className="loading" key={0}>
                                            <ReactLoading type={this.type} color="black" height={70} width={70}/>
                                         </div>
                                    )
                                    :
                                    (<img src={imageSize.source}></img>)
                                }
                            </div>

                            <div className="content">
                                <div className="content-left">
                                    <div className="owner-name-photo">
                                        {imageInfo.owner.username}
                                    </div>
                                    <div className="title-photo">
                                        {imageInfo.title._content}
                                    </div>
                                    <div className="discription">
                                        {imageInfo.description._content}
                                    </div>
                                </div>

                                <div className="content-right">
                                    <div className="view">
                                        <div className="number-item">
                                            {imageInfo.views}
                                        </div>
                                        <div className="text-item">
                                            views
                                        </div>
                                    </div>

                                    <div className="fav">
                                        <div className="number-item">
                                            {fav}
                                        </div>
                                        <div className="text-item">
                                            favorite
                                        </div>
                                    </div>
                                    <div className="comments">
                                        <div className="number-item">
                                            {imageInfo.comments._content}
                                        </div>
                                        <div className="text-item">
                                            comments
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="list-tag">
                                {
                                    imageInfo.tags.tag.map((tag)=>{
                                        return(
                                            <div key={tag.id} className="tag" onClick={()=>{this.goToPagTags(tag.raw)}}>{tag.raw}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    imageSize: state.photoReducers.imageSize,
    imageInfo: state.photoReducers.imageInfo,
    fav: state.photoReducers.fav,
    isLoading: state.photoReducers.isLoading,
    item: state.searchReducers.item,

})

const mapDispatchToProps = (dispatch) => ({
    setImageSize: (payload) => dispatch(photoActions.actionGetImageSize(payload)),
    setImageInfo: (payload) => dispatch(photoActions.actionGetImageInfo(payload)),
    setFav: (payload) => dispatch(photoActions.actionGetFav(payload)),
    setTag: (payload) => dispatch(searchActions.actionSearch(payload)),
    setIsLoading: (payload) => dispatch(photoActions.actionSetLoading(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Photo));
