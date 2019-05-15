/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

/**
 * SecretV1Wrapper wraps a SecretV1 with its blockchain status.
 */
class SecretV1Wrapper {

  /**
   * SecretV1Wrapper constructor.
   * @param secret {SecretV1}
   * @param status {TransactionStatus}
   */
  constructor(secret, status) {
    this._secret = secret
    this._status = status
  }

  /**
   * secret getter.
   * @return {SecretV1}
   */
  getSecret() {
    return this._secret
  }

  /**
   * status getter.
   * @return {TransactionStatus}
   */
  getStatus() {
    return this._status
  }

}

module.exports = {
  SecretV1Wrapper,
}