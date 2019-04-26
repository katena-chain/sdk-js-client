/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { AbstractKey } = require('./abstractKey')

/**
 * PublicKeyED25519 is an ED25519 public key wrapper (32 bytes).
 */
class PublicKeyED25519 extends AbstractKey {

  /**
   * PublicKeyED25519 constructor.
   * @param publicKey {Uint8Array}
   */
  constructor(publicKey) {
    super(publicKey)
  }

}

module.exports = {
  PublicKeyED25519,
}