/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

/**
 * SecretV1Wrappers wraps a list of SecretV1Wrapper with the total transactions available in the blockchain.
 * The API by default, will only returns 10 transactions.
 */
class SecretV1Wrappers {

  /**
   * SecretV1Wrappers constructor.
   * @param secrets {SecretV1Wrapper[]}
   * @param total {Number}
   */
  constructor(secrets, total) {
    this._secrets = secrets
    this._total = total
  }

  /**
   * secrets getter.
   * @return {SecretV1Wrapper[]}
   */
  getSecrets() {
    return this._secrets
  }

  /**
   * total getter.
   * @return {Number}
   */
  getTotal() {
    return this._total
  }

}

module.exports = {
  SecretV1Wrappers,
}