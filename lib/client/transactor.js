/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { Handler } = require('../api/handler')
const { createPrivateKeyFromBase64 } = require('../utils/crypto')
const { CertificateV1 } = require('../entity/certify/certificateV1')
const { MsgCreateCertificate } = require('../entity/certify/messageCreateCertificate')
const { SealState } = require('../entity/sealState')
const { Transaction } = require('../entity/api/transaction')
const moment = require('moment')

/**
 * Transactor provides helper function to hide the complexity of Transaction creation, signature and API dialog.
 */
class Transactor {

  /**
   * Transactor constructor
   * @param apiUrl {string}
   * @param apiUrlSuffix {string}
   * @param chainID {string}
   * @param privateKeyBase64 {string}
   * @param companyChainID {string}
   */
  constructor(apiUrl, apiUrlSuffix, chainID, privateKeyBase64, companyChainID) {
    this._apiHandler = new Handler(apiUrl, apiUrlSuffix)
    this._chainID = chainID
    this._privateKey = createPrivateKeyFromBase64(privateKeyBase64)
    this._companyChainID = companyChainID
  }

  /**
   * sendCertificate creates a CertificateV1 wrapped in a MsgCreateCertificate, signs it and sends it to the API.
   * @param uuid {string}
   * @param dataSignature {string}
   * @param dataSigner {string}
   * @return {Promise}
   */
  sendCertificate(uuid, dataSignature, dataSigner) {
    const certificate = new CertificateV1(uuid, this._companyChainID, dataSignature, dataSigner)
    const nonceTime = moment()
    const message = new MsgCreateCertificate(certificate)

    const sealState = new SealState(message, this._chainID, nonceTime)
    const sealStateBytes = sealState.getSignBytes()
    const messageSignature = this._privateKey.sign(sealStateBytes)

    const transaction = new Transaction(message, messageSignature, this._privateKey.getPublicKey(), nonceTime)

    return this._apiHandler.sendCertificate(transaction)
  }
}

module.exports = {
  Transactor,
}