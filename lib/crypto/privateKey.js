/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const tweetNacl = require('tweetnacl')
const { PublicKeyED25519 } = require('./publicKey')
const { AbstractKey } = require('./abstractKey')

/**
 * PrivateKeyED25519 is an ED25519 private key wrapper (64 bytes).
 */
class PrivateKeyED25519 extends AbstractKey {

  /**
   * PrivateKeyED25519 constructor.
   * @param privateKey {Uint8Array}
   */
  constructor(privateKey) {
    super(privateKey)
    this._publicKey = new PublicKeyED25519(privateKey.subarray(32))
  }

  /**
   * sign accepts a message and returns its corresponding signature.
   * @param message {Uint8Array}
   * @return {Uint8Array}
   */
  sign(message) {
    return tweetNacl.sign.detached(message, this._key)
  }

  /**
   * getPublicKey returns the underlying ED25519 public key.
   * @return {PublicKeyED25519}
   */
  getPublicKey() {
    return this._publicKey
  }
}

module.exports = {
  PrivateKeyED25519,
}