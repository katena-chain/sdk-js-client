/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

/**
 * TransactionStatus is the blockchain status of a transaction.
 */
class TransactionStatus {

  /**
   * TransactionStatus constructor.
   * @param code {Number}
   * @param message {string}
   */
  constructor(code, message) {
    this._code = code
    this._message = message
  }

  /**
   * code getter.
   * @return {Number}
   */
  getCode() {
    return this._code
  }

  /**
   * message getter.
   * @return {string}
   */
  getMessage() {
    return this._message
  }

  /**
   * fromJSON accepts a json representation of a TransactionStatus and returns a new instance.
   * @param json {string}
   * @return {TransactionStatus}
   */
  static fromJSON(json) {
    const jsonObject = JSON.parse(json)
    return TransactionStatus.fromObject(jsonObject)
  }

  /**
   * fromObject accepts an object representation of a TransactionStatus and returns a new instance.
   * @param object {Object}
   * @return {TransactionStatus}
   */
  static fromObject(object) {
    return new TransactionStatus(object.code, object.message)
  }
}

module.exports = {
  TransactionStatus,
}