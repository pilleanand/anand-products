import lodash from 'lodash';
import {
  FETCH_CATEGORIES_REQUEST_SUCCESS,
  FETCH_PRODUCTS_PAGINATION_REQUEST,
  FETCH_PRODUCTS_PAGINATION_REQUEST_FAIL,
  FETCH_PRODUCTS_PAGINATION_REQUEST_SUCCESS,
  FILTER_CATEGORIES_BY_SEARCH_TERM
} from "../constants/ProductActionTypes";
import { filterCategoriesBySearchSearchTerm } from '../helpers/Product.helpers';

const INITIAL_STATE = {
  totalProducts: [],
  filteredProducts: [],
  selectedcategoryFilters: [],
  fliteredCategoriesByText: [],
  allCategories: [],
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
            allowFetch,
          };
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
    case FETCH_CATEGORIES_REQUEST_SUCCESS:
      currentState = {
        ...state,
        allCategories: action.payload,
        fliteredCategoriesByText: action.payload
      };
      break;
      case FILTER_CATEGORIES_BY_SEARCH_TERM:
        let fliteredCategoriesByText = filterCategoriesBySearchSearchTerm(state.allCategories, action.payload)
      currentState = {
        ...state,
        fliteredCategoriesByText
      };
      break;
    default: break;
  }
  return currentState;
}