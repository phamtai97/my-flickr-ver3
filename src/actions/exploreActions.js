import {exploreConstants} from '../constants/exploreConstants.js';

export const exploreActions = {
    actionLoadMore,
}

function actionLoadMore(payload){
    return {
        type: exploreConstants.EXPLORE_LOADMORE,
        payload: {
            hasMore: payload.hasMore,
            elements: payload.elements,
            numberPage: payload.numberPage,
        }
    }
}
