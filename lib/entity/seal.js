/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { PublicKey: PublicKeyED25519 } = require('../crypto/ED25519/publicKey')

/**
 * Seal is a wrapper to an ED25519 signature and its corresponding ED25519 public key.
 */
class Seal {

  /**
   * Seal constructor.
   * @param signature {Buffer}
   * @param signer {PublicKeyED25519}
   */
  constructor(signature, signer) {
    this._signature = signature
    this._signer = signer
  }

  /**
   * toObject returns the object representation of a Seal.
   * @return {Object}
   */
  toObject() {
    return {
      signature: this._signature.toString('base64'),
      signer: this._signer.getKey().toString('base64'),
    }
  }

  /**
   * fromObject accepts an object representation of a Seal and returns a new instance.
   * @param object {Object}
   * @return {Seal}
   */
  static fromObject(object) {
    const signer = new PublicKeyED25519(Buffer.from(object.signer, 'base64'))
    return new Seal(Buffer.from(object.signature, 'base64'), signer)
  }
}

module.exports = {
  Seal,
}