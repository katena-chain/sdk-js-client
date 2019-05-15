/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { DataSeal } = require('./dataSeal')

/**
 * CertificateV1 is the first version of a certificate to send in a transaction's message.
 */
class CertificateV1 {

  /**
   * CertificateV1 constructor.
   * @param uuid {string}
   * @param companyChainID {string}
   * @param dataSeal {DataSeal}
   */
  constructor(uuid, companyChainID, dataSeal) {
    this._uuid = uuid
    this._companyChainID = companyChainID
    this._seal = dataSeal
  }

  /**
   * companyChainID getter.
   * @return {string}
   */
  getCompanyChainID() {
    return this._companyChainID
  }

  /**
   * uuid getter.
   * @return {string}
   */
  getUuid() {
    return this._uuid
  }

  /**
   * seal getter.
   * @return {DataSeal}
   */
  getSeal() {
    return this._seal
  }

  /**
   * type getter.
   * @return {string}
   */
  getType() {
    return CertificateV1.TYPE
  }

  /**
   * toObject returns the object representation of a CertificateV1.
   * It indicates which version of a certificate we want to encode.
   * @return {Object}
   */
  toObject() {
    return {
      type: CertificateV1.TYPE,
      value: {
        company_chain_id: this._companyChainID,
        seal: this._seal.toObject(),
        uuid: this._uuid,
      },
    }
  }

  /**
   * fromObject accepts an object representation of a CertificateV1 and returns a new instance.
   * @param object {Object}
   * @return {CertificateV1}
   */
  static fromObject(object) {
    const seal = DataSeal.fromObject(object.seal)
    return new CertificateV1(object.uuid, object.company_chain_id, seal)
  }

}

CertificateV1.TYPE = 'certify/CertificateV1'

module.exports = {
  CertificateV1,
}