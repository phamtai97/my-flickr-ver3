import {photoConstants} from '../constants/photoConstants';

const initialState = {
  imageSize: null,
  imageInfo:null,
  numberFav:0,
  tag: '',
  isLoading: true,
};

export default function photoReducers(state = initialState, actions){
  switch(actions.type){
      case photoConstants.PHOTO_GET_IMAGE_SIZE:
        return{
            ...state,
            imageSize: actions.payload.imageSize,
        };
      case photoConstants.PHOTO_GET_IMAGE_INFO:
        return{
          ...state,
          imageInfo: actions.payload.imageInfo,
        };

      case photoConstants.PHOTO_GET_FAV:
        return{
          ...state,
          fav: actions.payload.fav,
      };

      case photoConstants.PHOTO_SET_LOADING:
        return{
          ...state,
          isLoading: actions.payload.isLoading,
      };

      // case photoConstants.PHOTO_GET_TAG:
      //   return{
      //     ...state,
      //     tag:actions.payload.tag,
      //   }
      default:
          return state;
  }
}
