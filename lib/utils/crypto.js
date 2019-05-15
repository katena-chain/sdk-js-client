/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const tweetNacl = require('tweetnacl/nacl')
const { PrivateKey: PrivateKeyED25519 } = require('../crypto/ED25519/privateKey')
const { PrivateKey: PrivateKeyX25519 } = require('../crypto/X25519/privateKey')
const { PublicKey: PublicKeyX25519 } = require('../crypto/X25519/publicKey')

/**
 * createPrivateKeyED25519FromBase64 accepts a base64 encoded ED25519 private key (88 chars) and returns an ED25519
 * private key.
 * @param privateKeyBase64 {string}
 * @return {PrivateKeyED25519}
 */
function createPrivateKeyED25519FromBase64(privateKeyBase64) {
  return new PrivateKeyED25519(Buffer.from(privateKeyBase64, 'base64'))
}

/**
 * createPrivateKeyX25519FromBase64 accepts a base64 encoded X25519 private key (44 chars) and returns an X25519
 * private key.
 * @param publicKeyBase64 {string}
 * @return {PublicKeyX25519}
 */
function createPublicKeyX25519FromBase64(publicKeyBase64) {
  return new PublicKeyX25519(Buffer.from(publicKeyBase64, 'base64'))
}

/**
 * createPublicKeyX25519FromBase64 accepts a base64 encoded X25519 public key (44 chars) and returns an X25519
 * public key.
 * @param privateKeyBase64 {string}
 * @return {PrivateKeyX25519}
 */
function createPrivateKeyX25519FromBase64(privateKeyBase64) {
  return new PrivateKeyX25519(Buffer.from(privateKeyBase64, 'base64'))
}

/**
 * createNewKeysX25519 returns a new X25519 key pair.
 * @return {{privateKey: PrivateKeyX25519, publicKey: PublicKeyX25519}}
 */
function createNewKeysX25519() {
  const keyPair = tweetNacl.box.keyPair()
  return {
    privateKey: new PrivateKeyX25519(Buffer.from(keyPair.secretKey, 'binary')),
    publicKey: new PublicKeyX25519(Buffer.from(keyPair.publicKey, 'binary')),
  }
}

module.exports = {
  createPrivateKeyED25519FromBase64,
  createPublicKeyX25519FromBase64,
  createPrivateKeyX25519FromBase64,
  createNewKeysX25519,
}