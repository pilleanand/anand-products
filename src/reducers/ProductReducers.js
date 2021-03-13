import {
  FETCH_CATEGORIES_REQUEST_SUCCESS,
  FETCH_PRODUCTS_PAGINATION_REQUEST,
  FETCH_PRODUCTS_PAGINATION_REQUEST_FAIL,
  FETCH_PRODUCTS_PAGINATION_REQUEST_SUCCESS,
  FILTER_CATEGORIES_BY_SEARCH_TERM,
  FILTER_PRODUCTS_BY_SELECTED_CATEGORIES
} from "../constants/ProductActionTypes";
import {
  filterCategoriesBySearchSearchTerm,
  filterProductsBySelectedCategories
} from '../helpers/Product.helpers';

const INITIAL_STATE = {
  totalProducts: [],
  filteredProducts: [],
  fliteredCategoriesByText: [],
  selectedFilters:[],
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
          let filteredProducts = filterProductsBySelectedCategories(products, state.selectedFilters);
          currentState = {
            ...state,
            showProgress: false,
            totalProducts: products,
            filteredProducts,
            refresh: false,
            allowFetch,
          };
        }
        //Handling result when paginated ie, when pagenumber is more than 0, need to concat the result
        else if (pageNumber > 1) {
          let totalProducts = state.totalProducts.concat(products);
          let filteredProducts = filterProductsBySelectedCategories(totalProducts, state.selectedFilters);
          currentState = {
            ...state,
            showProgress: false,
            totalProducts: totalProducts,
            filteredProducts,
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
      case FILTER_PRODUCTS_BY_SELECTED_CATEGORIES:
      let filteredProducts = filterProductsBySelectedCategories(state.totalProducts, action.payload)
      currentState = {
        ...state,
        filteredProducts,
        selectedFilters: action.payload
      };
      break;
    default: break;
  }
  return currentState;
}