/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { Seal } = require('../seal')
const { MsgCreateCertificate } = require('../certify/msgCreateCertificate')
const { MsgCreateSecret } = require('../certify/msgCreateSecret')
const { sprintf } = require('../../utils/string')

/**
 * Transaction wraps a message, its signature infos and the nonce time used to sign the message.
 */
class Transaction {

  /**
   * Transaction constructor.
   * @param message {Object}
   * @param seal {Seal}
   * @param nonceTime {string}
   */
  constructor(message, seal, nonceTime) {
    this._message = message
    this._seal = seal
    this._nonceTime = nonceTime
  }

  /**
   * message getter.
   * @return {Object}
   */
  getMessage() {
    return this._message
  }

  /**
   * toJSON returns the json representation of a Transaction.
   * @return {string}
   */
  toJSON() {
    return JSON.stringify({
      message: this._message.toObject(),
      nonce_time: this._nonceTime,
      seal: this._seal.toObject(),
    })
  }

  /**
   * fromObject accepts an object representation of a Transaction and returns a new instance.
   * @param object {Object}
   * @return {Transaction}
   */
  static fromObject(object) {
    if (object.message.type in Transaction.MESSAGES_MAPPING) {
      const message = Transaction.MESSAGES_MAPPING[object.message.type].fromObject(object.message.value)
      const seal = Seal.fromObject(object.seal)
      return new Transaction(message, seal, object.nonce_time)
    } else {
      throw new Error(sprintf('unknown message type: %s', object.message.type))
    }
  }
}

Transaction.MESSAGES_MAPPING = {
  [MsgCreateCertificate.TYPE]: MsgCreateCertificate,
  [MsgCreateSecret.TYPE]: MsgCreateSecret,
}

module.exports = {
  Transaction,
}