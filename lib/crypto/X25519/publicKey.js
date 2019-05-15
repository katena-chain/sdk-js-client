/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { AbstractKey } = require('../abstractKey')

/**
 * PublicKey is an X25519 public key wrapper (32 bytes).
 * @alias PublicKeyX25519
 */
class PublicKey extends AbstractKey {
}

module.exports = {
  PublicKey,
}