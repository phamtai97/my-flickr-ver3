import {exploreConstants} from '../constants/exploreConstants.js';

const actionLoadMore = (payload) => ({
    type: exploreConstants.EXPLORE_LOADMORE,
    payload: {
        hasMore: payload.hasMore,
        elements: payload.elements,
        numberPage: payload.numberPage,
    }
});

export const exploreActions = {
    actionLoadMore,
}
