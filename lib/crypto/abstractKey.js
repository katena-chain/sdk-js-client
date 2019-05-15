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
   * @param key {Buffer}
   */
  constructor(key) {
    this._key = key
  }

  /**
   * key getter.
   * @return {Buffer}
   */
  getKey() {
    return this._key
  }
}

module.exports = {
  AbstractKey,
}