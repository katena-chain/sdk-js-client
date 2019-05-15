/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { sprintf } = require('../utils/string')

/**
 * ApiError allows to wrap API errors.
 */
class ApiError extends Error {

  /**
   * ApiError constructor.
   * @param code {Number}
   * @param message {string}
   */
  constructor(code, message) {
    const fullMessage = sprintf(`api error:
  Code: %s
  Message: %s`, code.toString(), message)
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = fullMessage
  }

  /**
   * oString overrides the default string format of an error.
   * @return {string}
   */
  toString() {
    return this.message
  }

  /**
   * fromJSON accepts a json representation of an ApiError and returns a new instance.
   * @param json {string}
   * @return {ApiError}
   */
  static fromJSON(json) {
    const jsonObject = JSON.parse(json)
    return new ApiError(jsonObject.code, jsonObject.message)
  }
}

module.exports = {
  ApiError,
}