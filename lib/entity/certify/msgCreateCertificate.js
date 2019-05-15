/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { CertificateV1 } = require('./certificateV1')
const { sprintf } = require('../../utils/string')

/**
 * MsgCreateCertificate is a wrapper to indicate that a create certificate action should be applied in a transaction.
 */
class MsgCreateCertificate {

  /**
   * MsgCreateCertificate constructor.
   * @param certificate {Object}
   */
  constructor(certificate) {
    this._certificate = certificate
  }

  /**
   * certificate getter.
   * @return {Object}
   */
  getCertificate() {
    return this._certificate
  }

  /**
   * type getter
   * @return {string}
   */
  getType() {
    return MsgCreateCertificate.TYPE
  }

  /**
   * toObject returns the object representation of a MsgCreateCertificate.
   * It indicates which message action we want to sign.
   * @return {Object}
   */
  toObject() {
    return {
      type: MsgCreateCertificate.TYPE,
      value: {
        certificate: this._certificate.toObject(),
      },
    }
  }

  /**
   * fromObject accepts an object representation of a MsgCreateCertificate and returns a new instance.
   * @param object {Object}
   * @return {MsgCreateCertificate}
   */
  static fromObject(object) {
    if (object.certificate.type in MsgCreateCertificate.MESSAGES_MAPPING) {
      const certificate = MsgCreateCertificate.MESSAGES_MAPPING[object.certificate.type].fromObject(object.certificate.value)
      return new MsgCreateCertificate(certificate)
    } else {
      throw new Error(sprintf('unknown certificate type: %s', object.certificate.type))
    }
  }

}

MsgCreateCertificate.MESSAGES_MAPPING = {
  [CertificateV1.TYPE]: CertificateV1,
}
MsgCreateCertificate.TYPE = 'certify/MsgCreateCertificate'

module.exports = {
  MsgCreateCertificate,
}