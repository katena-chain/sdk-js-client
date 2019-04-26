/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const certificateV1Type = "certify/CertificateV1"

/**
 * CertificateV1 is the first version of a data certificate to send in a transaction's message.
 */
class CertificateV1 {

  /**
   * CertificateV1 constructor.
   * @param uuid {string}
   * @param companyChainID {string}
   * @param dataSignature {string}
   * @param dataSigner {string}
   */
  constructor(uuid, companyChainID, dataSignature, dataSigner) {
    this._uuid = uuid
    this._companyChainID = companyChainID
    this._seal = new DataSeal(dataSignature, dataSigner)
  }

  /**
   * toTypedObject returns the TypedObject representation of a CertificateV1 (required for json marshaling).
   * It indicates which version of a certificate we want to encode.
   * @return {Object}
   */
  toTypedObject() {
    return {
      type: certificateV1Type,
      value: this.toObject(),
    }
  }

  /**
   * toObject returns the Object representation of a CertificateV1 (required for json marshaling).
   * @return {Object}
   */
  toObject() {
    return {
      company_chain_id: this._companyChainID,
      seal: this._seal.toObject(),
      uuid: this._uuid,
    }
  }
}

/**
 * DataSeal is a wrapper to a raw signature (16 < x < 128 bytes) and its corresponding raw signer (16 < x < 128 bytes).
 */
class DataSeal {

  /**
   * DataSeal constructor.
   * @param signature {string}
   * @param signer {string}
   */
  constructor(signature, signer) {
    this._signature = signature
    this._signer = signer
  }

  /**
   * toObject returns the Object representation of a DataSeal (required for json marshaling).
   * @return {Object}
   */
  toObject() {
    return {
      signature: Buffer.from(this._signature, 'utf8').toString('base64'),
      signer: Buffer.from(this._signer, 'utf8').toString('base64')
    }
  }
}

module.exports = {
  CertificateV1,
}