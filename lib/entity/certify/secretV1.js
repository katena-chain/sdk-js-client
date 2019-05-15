/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { Lock } = require('./lock')

/**
 * SecretV1 is the first version of a data secret to send in a transaction's message.
 */
class SecretV1 {

  /**
   * SecretV1 constructor.
   * @param certificateUuid {string}
   * @param companyChainID {string}
   * @param lock {Lock}
   */
  constructor(certificateUuid, companyChainID, lock) {
    this._certificateUuid = certificateUuid
    this._companyChainID = companyChainID
    this._lock = lock
  }

  /**
   * certificateUuid getter.
   * @return {string}
   */
  getCertificateUuid() {
    return this._certificateUuid
  }

  /**
   * companyChainID getter.
   * @return {string}
   */
  getCompanyChainID() {
    return this._companyChainID
  }

  /**
   * lock getter.
   * @return {Lock}
   */
  getLock() {
    return this._lock
  }

  /**
   * type getter.
   * @return {string}
   */
  getType() {
    return SecretV1.TYPE
  }

  /**
   * toObject returns the object representation of a SecretV1.
   * It indicates which version of a secret we want to encode.
   * @return {Object}
   */
  toObject() {
    return {
      type: SecretV1.TYPE,
      value: {
        certificate_uuid: this._certificateUuid,
        company_chain_id: this._companyChainID,
        lock: this._lock.toObject(),
      },
    }
  }

  /**
   * fromObject accepts an object representation of a Secret and returns a new instance.
   * @param object
   * @return {SecretV1}
   */
  static fromObject(object) {
    const lock = Lock.fromObject(object.lock)
    return new SecretV1(object.certificate_uuid, object.company_chain_id, lock)
  }

}

SecretV1.TYPE = 'certify/SecretV1'

module.exports = {
  SecretV1,
}