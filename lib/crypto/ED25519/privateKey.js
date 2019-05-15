/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const tweetNacl = require('tweetnacl/nacl')
const { PublicKey } = require('./publicKey')
const { AbstractKey } = require('../abstractKey')

/**
 * PrivateKey is an ED25519 private key wrapper (64 bytes).
 * @alias PrivateKeyED25519
 */
class PrivateKey extends AbstractKey {

  /**
   * PrivateKey constructor.
   * @param privateKey {Buffer}
   */
  constructor(privateKey) {
    super(privateKey)
    this._publicKey = new PublicKey(privateKey.subarray(32))
  }

  /**
   * publicKey getter.
   */
  getPublicKey() {
    return this._publicKey
  }

  /**
   * sign accepts a message and returns its corresponding ED25519 signature.
   * @param message {Buffer}
   * @return {Buffer}
   */
  sign(message) {
    return Buffer.from(tweetNacl.sign.detached(message, this.getKey()), 'binary')
  }
}

module.exports = {
  PrivateKey,
}