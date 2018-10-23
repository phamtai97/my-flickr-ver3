import {photoConstants} from '../constants/photoConstants';

const actionGetImageSize = (payload) => ({
  type: photoConstants.PHOTO_GET_IMAGE_SIZE,
  payload:{
    imageSize: payload.imageSize,
  }
});

const actionGetImageInfo = (payload) => ({
  type: photoConstants.PHOTO_GET_IMAGE_INFO,
  payload:{
    imageInfo: payload.imageInfo,
  }
});

const actionGetFav = (payload) => ({
  type: photoConstants.PHOTO_GET_FAV,
  payload:{
    fav: payload.fav,
  }
});

const actionSetLoading = (payload) => ({
  type: photoConstants.PHOTO_SET_LOADING,
  payload:{
    isLoading: payload.isLoading,
  }
})

// const actionGetTag = (payload) => ({
//    type: photoConstants.PHOTO_GET_TAG,
//    payload:{
//     tag: payload.tag,
//    }
// });


export const photoActions = {
  actionGetImageInfo,
  actionGetImageSize,
  actionGetFav,
  actionSetLoading,
  // actionGetTag,
}
