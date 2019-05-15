/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

/**
 * SealState wraps a message and additional values in order to define the unique message state to be signed.
 */
class SealState {

  /**
   * SealState constructor.
   * @param message {Object}
   * @param chainID {string}
   * @param nonceTime {string}
   */
  constructor(message, chainID, nonceTime) {
    this._message = message
    this._chainID = chainID
    this._nonceTime = nonceTime
  }

  /**
   * getSignBytes returns the sorted and marshaled values of a seal state.
   * @return {Buffer}
   */
  getSignBytes() {
    return Buffer.from(JSON.stringify({
      chain_id: this._chainID,
      message: this._message.toObject(),
      nonce_time: this._nonceTime,
    }), 'utf8')
  }

}

module.exports = {
  SealState,
}