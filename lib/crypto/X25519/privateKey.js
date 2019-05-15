/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const tweetNacl = require('tweetnacl/nacl')
const crypto = require('crypto')
const { AbstractKey } = require('../abstractKey')

/**
 * PrivateKey is an X25519 private key wrapper (64 bytes).
 * @alias PrivateKeyX25519
 */
class PrivateKey extends AbstractKey {

  /**
   * seal encrypts a plain text message decipherable afterwards by the recipient public key.
   * @param message {Buffer}
   * @param recipientPublicKey  {PublicKeyX25519}
   * @return {{encryptedMessage: Buffer, nonce: Buffer}}
   */
  seal(message, recipientPublicKey) {
    const nonce = crypto.randomBytes(24)
    const encryptedMessage = Buffer.from(tweetNacl.box(message, nonce, recipientPublicKey.getKey(), this.getKey()), 'binary')
    return {
      encryptedMessage,
      nonce,
    }
  }

  /**
   * open decrypts an encrypted message with the appropriate sender information.
   * @param encryptedMessage {Buffer}
   * @param senderPublicKey {PublicKeyX25519}
   * @param nonce {Buffer}
   * @return {Buffer}
   */
  open(encryptedMessage, senderPublicKey, nonce) {
    let decryptedMessage = tweetNacl.box.open(encryptedMessage, nonce, senderPublicKey.getKey(), this.getKey())
    if (!decryptedMessage) {
      decryptedMessage = ''
    }
    return Buffer.from(decryptedMessage, 'binary')
  }

}

module.exports = {
  PrivateKey,
}