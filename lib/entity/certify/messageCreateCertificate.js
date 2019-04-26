/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const msgCreateCertificateType = "certify/MsgCreateCertificate"

/**
 * MsgCreateCertificate is wrapper to indicate that a create certificate action should be applied in a transaction.
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
   * toTypedObject returns the TypedObject representation of a MsgCreateCertificate (required for json marshaling).
   * It indicates which message action we want to sign.
   * @return {Object}
   */
  toTypedObject() {
    return {
      type: msgCreateCertificateType,
      value: this.toObject(),
    }
  }

  /**
   * toObject returns the Object representation of a MsgCreateCertificate (required for json marshaling).
   * @return {Object}
   */
  toObject() {
    return {
      certificate: this._certificate.toTypedObject(),
    }
  }
}

module.exports = {
  MsgCreateCertificate,
}