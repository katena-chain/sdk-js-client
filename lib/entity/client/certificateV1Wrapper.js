/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

/**
 * CertificateV1Wrapper wraps a CertificateV1 with its blockchain status.
 */
class CertificateV1Wrapper {

  /**
   * CertificateV1Wrapper constructor.
   * @param certificate {CertificateV1}
   * @param status {TransactionStatus}
   */
  constructor(certificate, status) {
    this._certificate = certificate
    this._status = status
  }

  /**
   * certificate getter.
   * @return {CertificateV1}
   */
  getCertificate() {
    return this._certificate
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
  CertificateV1Wrapper,
}