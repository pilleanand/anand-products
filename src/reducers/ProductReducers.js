import { FETCH_PRODUCTS_PAGINATION_REQUEST, FETCH_PRODUCTS_PAGINATION_REQUEST_FAIL, FETCH_PRODUCTS_PAGINATION_REQUEST_SUCCESS } from "../constants/ProductActionTypes";

const INITIAL_STATE = {
  totalProducts: [],
  filteredProducts: [],
  categoryFilters: [],
  showProgress: false,
  refresh: true,
  allowFetch: true
}

export default (state = INITIAL_STATE, action) => {
  let currentState = state;
  switch (action.type) {
    case FETCH_PRODUCTS_PAGINATION_REQUEST:
      currentState = {
        ...state,
        showProgress: true,
        refresh: true,
        allowFetch: true
      };
      break;
    case FETCH_PRODUCTS_PAGINATION_REQUEST_SUCCESS: {
      const { pageNumber, products } = action.payload;
      if (Array.isArray(products) && products.length !== 0) {
        const allowFetch = products.length < 20 ? false : true;
        if (pageNumber === 1) {
          currentState = {
            ...state,
            showProgress: false,
            totalProducts: products,
            refresh: false,
            allowFetch
          };
          console.log('currentState---- reduer--', currentState)
        }
        //Handling result when paginated ie, when pagenumber is more than 0, need to concat the result
        else if (pageNumber > 1) {
          currentState = {
            ...state,
            showProgress: false,
            totalProducts: state.totalProducts.concat(products),
            refresh: false,
            allowFetch
          }
        }
      }
      //handles when notifications are 0 fetched or if notifications are not array object
      else {
        currentState = {
          ...state,
          showProgress: false,
          refresh: false,
          allowFetch: false
        }
      }
    }
      break;
    case FETCH_PRODUCTS_PAGINATION_REQUEST_FAIL:
      currentState = {
        ...state,
        showProgress: false,
        allowFetchNotifications: false
      };
      break;
    default: break;
  }
  return currentState;
}