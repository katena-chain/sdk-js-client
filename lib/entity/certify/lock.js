/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { PublicKey: PublicKeyX25519 } = require('../../crypto/X25519/publicKey')

/**
 * Lock is a wrapper to an X25519 encryptor (32 bytes), its corresponding nonce (24 bytes) and the raw encrypted content
 * (16 < x < 128 bytes) to perform an ECDH shared key agreement.
 */
class Lock {

  /**
   * Lock constructor.
   * @param encryptor {PublicKeyX25519}
   * @param nonce {Buffer}
   * @param content {Buffer}
   */
  constructor(encryptor, nonce, content) {
    this._encryptor = encryptor
    this._nonce = nonce
    this._content = content
  }

  /**
   * encryptor getter.
   * @return {PublicKeyX25519}
   */
  getEncryptor() {
    return this._encryptor
  }

  /**
   * nonce getter.
   * @return {Buffer}
   */
  getNonce() {
    return this._nonce
  }

  /**
   * content getter.
   * @return {Buffer}
   */
  getContent() {
    return this._content
  }

  /**
   * toObject returns the object representation of a Lock.
   * @return {Object}
   */
  toObject() {
    return {
      content: this._content.toString('base64'),
      encryptor: this._encryptor.getKey().toString('base64'),
      nonce: this._nonce.toString('base64'),
    }
  }

  /**
   * fromObject accepts an object representation of a Lock and returns a new instance.
   * @param object {Object}
   * @return {Lock}
   */
  static fromObject(object) {
    const encryptor = new PublicKeyX25519(Buffer.from(object.encryptor, 'base64'))
    return new Lock(encryptor, Buffer.from(object.nonce, 'base64'), Buffer.from(object.content, 'base64'))
  }
}

module.exports = {
  Lock,
}