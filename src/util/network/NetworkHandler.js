// @flow

'use strict';

import axios from "axios";
const memoize = require("memoizee");
import {
  APP_API_BASE_PATH,
  NETWORK_TIME_OUT,
  CACHE_MAX_AGE
} from '../NetworkConstants';

class NetworkHandler {

  constructor() {
    const instance = axios.create({
      baseURL: APP_API_BASE_PATH,
      timeout: NETWORK_TIME_OUT
    });
    // instance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.instance = instance;
  }

  handleSuccess = (response) => {
    return Promise.resolve(response);
  }

  handleError = (error) => {
    switch (error) {
      case 401: //Unauthorized
        break;
      case 404: //Host unreachable
        break;
      case 502: //Bad Gateway
        break;
      case 500: // Service Failure
        break;
      case 503: //Service Unavailable
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }

  get = (path) => {
    return new Promise((resolve, reject) => {
      this.instance
        .get(path)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getFromCache = memoize(this.get, { maxAge: CACHE_MAX_AGE, preFetch: true });

  post = (path, body, header) => {
    return new Promise((resolve, reject) => {
      let options = {}
      if (header) {
        options.header = header
      }
      this.instance
        .post(path, body, options)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  put = (path, body) => {
    return new Promise((resolve, reject) => {
      this.instance
        .put(path, body)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  delete = (path, body) => {
    return new Promise((resolve, reject) => {
      this.instance
        .delete(path, body)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

const requestHandler = new NetworkHandler();
export const DTNetworkHandler = requestHandler;
