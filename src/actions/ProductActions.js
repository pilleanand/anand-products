import {
  FETCH_PRODUCTS_PAGINATION_REQUEST,
  FETCH_PRODUCTS_PAGINATION_REQUEST_SUCCESS,
  FETCH_PRODUCTS_PAGINATION_REQUEST_FAIL
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
  payload: error
});
