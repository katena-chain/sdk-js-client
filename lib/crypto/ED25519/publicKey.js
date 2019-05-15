/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const tweetNacl = require('tweetnacl/nacl')
const { AbstractKey } = require('../abstractKey')

/**
 * PublicKey is an ED25519 public key wrapper (32 bytes).
 * @alias PublicKeyED25519
 */
class PublicKey extends AbstractKey {

  /**
   * verify indicates if a message and a signature match.
   * @param message {Buffer}
   * @param signature {Buffer}
   * @return {boolean}
   */
  verify(message, signature) {
    return tweetNacl.sign.detached.verify(message, signature, this.getKey())
  }

}

module.exports = {
  PublicKey,
}