/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const nodeFetch = require('node-fetch')
const { RawResponse } = require('./rawResponse')
const { getUri } = require('../utils/uri')

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
   * @return {Promise<RawResponse>}
   */
  get(route, queryValues = null) {
    return this.doRequest('GET', route, '', queryValues)
  }

  /**
   * post wraps the doRequest method to do a POST HTTP request.
   * @param route {string}
   * @param body {string}
   * @param queryValues {Object}
   * @return {Promise<RawResponse>}
   */
  post(route, body, queryValues = null) {
    return this.doRequest('POST', route, body, queryValues)
  }

  /**
   * doRequest uses the node-fetch library to call a distant api and returns a response.
   * @param method {string}
   * @param route {string}
   * @param body {string}
   * @param queryValues
   * @return {Promise<RawResponse>}
   */
  async doRequest(method, route, body, queryValues) {
    const uri = getUri(this._apiUrl, [route], queryValues)
    const options = {
      method,
    }
    if (body !== '') {
      options.headers = { 'Content-Type': 'application/json' }
      options.body = body
    }

    const response = await nodeFetch(uri, options)

    return new RawResponse(response.status, await response.text())
  }

}

module.exports = {
  Client,
}