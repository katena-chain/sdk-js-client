/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { Seal } = require('../seal')

/**
 * Transaction wraps a message, its signature infos and the nonce time used to sign the message.
 */
class Transaction {

  /**
   * Transaction constructor.
   * @param message {Object}
   * @param msgSignature {Uint8Array}
   * @param msgSigner {PublicKeyED25519}
   * @param nonceTime {moment.Moment}
   */
  constructor(message, msgSignature, msgSigner, nonceTime) {
    this._message = message
    this._seal = new Seal(msgSignature, msgSigner)
    this._nonceTime = nonceTime
  }

  /**
   * toObject returns the Object representation of a Transaction (required for json marshaling).
   * @return {Object}
   */
  toObject() {
    return {
      message: this._message.toObject(),
      seal: this._seal.toObject(),
      nonce_time: this._nonceTime.utc().format(),
    }
  }
}

module.exports = {
  Transaction,
}