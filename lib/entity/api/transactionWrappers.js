/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { TransactionWrapper } = require('./transactionWrapper')

/**
 * TransactionWrappers wraps a list of TransactionWrapper with the total transactions available in the blockchain.
 * The API by default, will only returns 10 transactions.
 */
class TransactionWrappers {

  /**
   * TransactionWrappers constructor.
   * @param transactions {TransactionWrapper[]}
   * @param total {Number}
   */
  constructor(transactions, total) {
    this._transactions = transactions
    this._total = total
  }

  /**
   * transactions getter.
   * @return {TransactionWrapper[]}
   */
  getTransactions() {
    return this._transactions
  }

  /**
   * total getter.
   * @return {Number}
   */
  getTotal() {
    return this._total
  }

  /**
   * fromJSON accepts a json representation of a TransactionWrappers and returns a new instance.
   * @param json {string}
   * @return {TransactionWrappers}
   */
  static fromJSON(json) {
    const jsonObject = JSON.parse(json)
    const transactionWrappers = []
    for (let i = 0; i < jsonObject.transactions.length; i++) {
      transactionWrappers.push(TransactionWrapper.fromObject(jsonObject.transactions[i]))
    }
    return new TransactionWrappers(transactionWrappers, jsonObject.total)
  }

}

module.exports = {
  TransactionWrappers,
}