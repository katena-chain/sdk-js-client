/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

/**
 * AbstractKey holds a binary key
 */
class AbstractKey {

  /**
   * AbstractKey constructor.
   * @param key {Uint8Array}
   */
  constructor(key) {
    this._key = key
  }

  /**
   * toBase64 returns the base64 value of a binary key.
   * @return {string}
   */
  toBase64() {
    return Buffer.from(this._key, 'binary').toString('base64')
  }
}

module.exports = {
  AbstractKey,
}