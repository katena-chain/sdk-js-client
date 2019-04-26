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
   * @param nonceTime {moment.Moment}
   */
  constructor(message, chainID, nonceTime) {
    this._message = message
    this._chainID = chainID
    this._nonceTime = nonceTime
  }

  /**
   * getSignBytes returns the sorted and marshaled values of a seal state.
   * @return {Uint8Array}
   */
  getSignBytes() {
    return Uint8Array.from(Buffer.from(JSON.stringify(this.toObject()), 'utf8'))
  }

  /**
   * toObject returns the Object representation of a SealState (required for json marshaling).
   * @return {Object}
   */
  toObject() {
    return {
      chain_id: this._chainID,
      message: this._message.toTypedObject(),
      nonce_time: this._nonceTime.utc().format(),
    }
  }
}

module.exports = {
  SealState,
}