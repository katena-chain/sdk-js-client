/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

/**
 * DataSeal is a wrapper to a raw signature (16 < x < 128 bytes) and its corresponding raw signer (16 < x < 128 bytes).
 */
class DataSeal {


  /**
   * DataSeal constructor.
   * @param signature {Buffer}
   * @param signer {Buffer}
   */
  constructor(signature, signer) {
    this._signature = signature
    this._signer = signer
  }

  /**
   * signature getter.
   * @return {Buffer}
   */
  getSignature() {
    return this._signature
  }

  /**
   * signer getter.
   * @return {Buffer}
   */
  getSigner() {
    return this._signer
  }

  /**
   * toObject returns the Object representation of a DataSeal.
   * @return {Object}
   */
  toObject() {
    return {
      signature: this._signature.toString('base64'),
      signer: this._signer.toString('base64'),
    }
  }

  /**
   * fromObject accepts an object representation of a DataSeal and returns a new instance.
   * @param object {Object}
   * @return {DataSeal}
   */
  static fromObject(object) {
    return new DataSeal(Buffer.from(object.signature, 'base64'), Buffer.from(object.signer, 'base64'))
  }
}

module.exports = {
  DataSeal,
}