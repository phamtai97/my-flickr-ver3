import {searchConstaints} from '../constants/searchConstants.js';

const actionSearch = (payload) => ({
  type: searchConstaints.SEARCH_ITEM,
  payload: {
    item: payload.item,
  }
});

export const searchActions = {
  actionSearch,
}
