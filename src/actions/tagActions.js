import {tagConstants} from '../constants/tagConstants';

const actionLoadMore = (payload) => ({
    type: tagConstants.TAG_LOADMORE,
    payload: {
        hasMore: payload.hasMore,
        elements: payload.elements,
        numberPage: payload.numberPage,
    }
});

const actionReset = () => ({
    // type: tagConstants.TAG_RESET,
    // payload: {
    //     hasMore: payload.hasMore,
    //     elements: payload.elements,
    //     numberPage: payload.numberPage,
    // }
});

export const tagActions = {
    actionLoadMore,
    actionReset
}
