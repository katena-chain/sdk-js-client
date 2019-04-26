/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const nodeFetch = require('node-fetch')
const { getUri } = require('../uri')

/**
 * Client is a node-fetch wrapper to dialog with a JSON API.
 */
class Client {

  /**
   * Client constructor.
   * @param apiUrl {string}
   */
  constructor(apiUrl) {
    this._apiUrl = apiUrl
  }

  /**
   * get wraps the doRequest method to do a GET HTTP request.
   * @param route {string}
   * @param queryValues {Object}
   * @return {Promise}
   */
  get(route, queryValues) {
    return this.doRequest("GET", route, queryValues, null)
  }

  /**
   * post wraps the doRequest method to do a POST HTTP request.
   * @param route {string}
   * @param queryValues {Object}
   * @param body {Object}
   * @return {Promise}
   */
  post(route, queryValues, body) {
    return this.doRequest("POST", route, queryValues, body)
  }

  /**
   * doRequest uses the fasthttp.Client to call a distant api and returns a response.
   * The body will be marshaled to JSON.
   * @param method {string}
   * @param route {string}
   * @param queryValues {Object}
   * @param body {Object}
   * @return {Promise}
   */
  doRequest(method, route, queryValues, body) {
    const uri = getUri(this._apiUrl, [ route ], queryValues)
    const opts = {
      method,
    }
    if (body) {
      opts.headers = { 'Content-Type': 'application/json' }
      opts.body = JSON.stringify(body)
    }
    return nodeFetch(uri, opts)
  }

}

module.exports = {
  Client,
}