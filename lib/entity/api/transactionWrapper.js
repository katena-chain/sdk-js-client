/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { Transaction } = require('./transaction')
const { TransactionStatus } = require('./transactionStatus')

/**
 * TransactionWrapper wraps a Transaction with its blockchain status.
 */
class TransactionWrapper {

  /**
   * TransactionWrapper constructor.
   * @param transaction {Transaction}
   * @param status {TransactionStatus}
   */
  constructor(transaction, status) {
    this._transaction = transaction
    this._status = status
  }

  /**
   * transaction getter.
   * @return {Transaction}
   */
  getTransaction() {
    return this._transaction
  }

  /**
   * status getter.
   * @return {TransactionStatus}
   */
  getStatus() {
    return this._status
  }

  /**
   * fromJSON accepts a json representation of a TransactionWrapper and returns a new instance.
   * @param json {string}
   * @return {TransactionWrapper}
   */
  static fromJSON(json) {
    const jsonObject = JSON.parse(json)
    return TransactionWrapper.fromObject(jsonObject)
  }

  /**
   * fromObject accepts an object representation of a TransactionWrapper and returns a new instance.
   * @param object {Object}
   * @return {TransactionWrapper}
   */
  static fromObject(object) {
    return new TransactionWrapper(Transaction.fromObject(object.transaction), TransactionStatus.fromObject(object.status))
  }
}

module.exports = {
  TransactionWrapper,
}