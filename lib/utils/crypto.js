/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { PrivateKeyED25519 } = require('../crypto/privateKey')

/**
 * createPrivateKeyED25519FromBase64 accepts a base64 encoded ED25519 private key (88 chars) and returns an ED25519
 * private key.
 * @param privateKeyBase64 {string}
 * @return {PrivateKeyED25519}
 */
function createPrivateKeyFromBase64(privateKeyBase64) {
  const privateKey = Uint8Array.from(Buffer.from(privateKeyBase64, 'base64'))
  return new PrivateKeyED25519(privateKey)
}

module.exports = {
  createPrivateKeyFromBase64,
}