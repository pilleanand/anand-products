import {
  FETCH_PRODUCTS_PAGINATION_REQUEST,
  FETCH_PRODUCTS_PAGINATION_REQUEST_SUCCESS,
  FETCH_PRODUCTS_PAGINATION_REQUEST_FAIL,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_REQUEST_SUCCESS,
  FETCH_CATEGORIES_REQUEST_FAIL
} from "../constants/ProductActionTypes";

export const fetchProductsWithPaginationRequestAction = (pageNumber) => ({
  type: FETCH_PRODUCTS_PAGINATION_REQUEST,
  payload: pageNumber
});

export const fetchProductsWithPaginationRequestSuccessAction = (products, pageNumber) => ({
  type: FETCH_PRODUCTS_PAGINATION_REQUEST_SUCCESS,
  payload: { products, pageNumber }
});

export const fetchProductsWithPaginationRequestFailAction = (error) => ({
  type: FETCH_PRODUCTS_PAGINATION_REQUEST_FAIL,
});

export const fetchCategoriesRequestAction = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesRequestSuccessAction = (payload) => ({
  type: FETCH_CATEGORIES_REQUEST_SUCCESS,
  payload
});

export const fetchCategoriesRequestFailureAction = (error) => ({
  type: FETCH_CATEGORIES_REQUEST_FAIL,
});