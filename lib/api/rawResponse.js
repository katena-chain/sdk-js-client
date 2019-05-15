/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

/**
 * RawResponse is a node-fetch response wrapper.
 */
class RawResponse {

  /**
   * RawResponse constructor.
   * @param statusCode {Number}
   * @param body {string}
   */
  constructor(statusCode, body) {
    this._statusCode = statusCode
    this._body = body
  }

  /**
   * statusCode getter.
   * @return {Number}
   */
  getStatusCode() {
    return this._statusCode
  }

  /**
   * body getter.
   * @return {string}
   */
  getBody() {
    return this._body
  }
}

module.exports = {
  RawResponse,
}