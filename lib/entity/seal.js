/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

/**
 * Seal is a wrapper to an ED25519 signature and its corresponding ED25519 public key.
 */
class Seal {

  /**
   * Seal constructor.
   * @param signature {Uint8Array}
   * @param signer {PublicKeyED25519}
   */
  constructor(signature, signer) {
    this._signature = signature
    this._signer = signer
  }

  /**
   * toObject returns the Object representation of a Seal (required for json marshaling).
   * @return {Object}
   */
  toObject() {
    return {
      signature: Buffer.from(this._signature, 'binary').toString('base64'),
      signer: this._signer.toBase64()
    }
  }
}

module.exports = {
  Seal,
}