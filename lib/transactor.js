/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { Handler } = require('./api/handler')
const { CertificateV1 } = require('./entity/certify/certificateV1')
const { SecretV1 } = require('./entity/certify/secretV1')
const { DataSeal } = require('./entity/certify/dataSeal')
const { Seal } = require('./entity/seal')
const { Lock } = require('./entity/certify/lock')
const { MsgCreateCertificate } = require('./entity/certify/msgCreateCertificate')
const { MsgCreateSecret } = require('./entity/certify/msgCreateSecret')
const { SealState } = require('./entity/sealState')
const { Transaction } = require('./entity/api/transaction')
const { CertificateV1Wrapper } = require('./entity/client/certificateV1Wrapper')
const { SecretV1Wrapper } = require('./entity/client/secretV1Wrapper')
const { SecretV1Wrappers } = require('./entity/client/secretV1Wrappers')
const { sprintf } = require('./utils/string')
const moment = require('moment/moment')

/**
 * Transactor provides helper function to hide the complexity of Transaction creation, signature and API dialog.
 */
class Transactor {

  /**
   * Transactor constructor
   * @param apiUrl {string}
   * @param chainID {string}
   * @param msgSigner {PrivateKeyED25519}
   * @param companyChainID {string}
   */
  constructor(apiUrl, companyChainID, chainID = '', msgSigner = null) {
    this._apiHandler = new Handler(apiUrl)
    this._chainID = chainID
    this._msgSigner = msgSigner
    this._companyChainID = companyChainID
  }

  /**
   * sendCertificateV1 wraps a CertificateV1 in a MsgCreateCertificate, creates a transaction and sends it to the API.@param uuid {string}
   * @param dataSignature {Buffer}
   * @param dataSigner {Buffer}
   * @return Promise<TransactionStatus>
   */
  sendCertificateV1(uuid, dataSignature, dataSigner) {
    const dataSeal = new DataSeal(dataSignature, dataSigner)
    const certificate = new CertificateV1(uuid, this._companyChainID, dataSeal)
    const message = new MsgCreateCertificate(certificate)

    const transaction = this.getTransaction(message)

    return this._apiHandler.sendCertificate(transaction)
  }

  /**
   * retrieveCertificateV1 fetches the API to find the corresponding transaction and converts its content to a
   * CertificateV1 with its blockchain status.
   * @param uuid {string}
   * @return {Promise<CertificateV1Wrapper>}
   */
  async retrieveCertificateV1(uuid) {
    const transactionWrapper = await this._apiHandler.retrieveCertificate(this._companyChainID, uuid)
    if (transactionWrapper.getTransaction().getMessage().getType() === MsgCreateCertificate.TYPE) {
      const message = transactionWrapper.getTransaction().getMessage()
      if (message.getCertificate().getType() === CertificateV1.TYPE) {
        const certificate = message.getCertificate()
        return new CertificateV1Wrapper(certificate, transactionWrapper.getStatus())
      } else {
        throw new Error(sprintf('bad certificate type: %s', message.getCertificate().getType()))
      }
    } else {
      throw new Error(sprintf('bad message type: %s', transactionWrapper.getTransaction().getMessage().getType()))
    }
  }

  /**
   * sendSecretV1 wraps a SecretV1 in a MsgCreateSecret, creates a transaction and sends it to the API.
   * @param certificateUuid {string}
   * @param lockEncryptor {PublicKeyX25519}
   * @param lockNonce {Buffer}
   * @param lockContent {Buffer}
   * @return Promise<TransactionStatus>
   */
  sendSecretV1(certificateUuid, lockEncryptor, lockNonce, lockContent) {
    const lock = new Lock(lockEncryptor, lockNonce, lockContent)
    const secret = new SecretV1(certificateUuid, this._companyChainID, lock)
    const message = new MsgCreateSecret(secret)

    const transaction = this.getTransaction(message)

    return this._apiHandler.sendSecret(transaction, this._companyChainID, certificateUuid)

  }

  /**
   * retrieveSecretsV1 fetches the API to find the corresponding transactions and converts their content to a SecretV1
   * with its blockchain status.
   * @param uuid {string}
   * @return {Promise<SecretV1Wrappers>}
   */
  async retrieveSecretsV1(uuid) {
    const transactionWrappers = await this._apiHandler.retrieveSecrets(this._companyChainID, uuid)
    const secretV1WrappersArray = []
    for (let i = 0; i < transactionWrappers.getTransactions().length; i++) {
      const transactionWrapper = transactionWrappers.getTransactions()[i]
      if (transactionWrapper.getTransaction().getMessage().getType() === MsgCreateSecret.TYPE) {
        const message = transactionWrapper.getTransaction().getMessage()
        if (message.getSecret().getType() === SecretV1.TYPE) {
          const secret = message.getSecret()
          secretV1WrappersArray.push(new SecretV1Wrapper(secret, transactionWrapper.getStatus()))
        } else {
          throw new Error(sprintf('bad secret type: %s', message.getSecret().getType()))
        }
      } else {
        throw new Error(sprintf('bad message type: %s', transactionWrapper.getTransaction().getMessage().getType()))
      }
    }
    return new SecretV1Wrappers(secretV1WrappersArray, transactionWrappers.getTotal())
  }

  /**
   * getTransaction signs a message and returns a new transaction ready to be sent.
   * @param message {Object}
   * @returns {Transaction}
   */
  getTransaction(message) {

    const now = moment()
    const nonceTime = now.utc().format()

    const sealState = new SealState(message, this._chainID, nonceTime)
    const sealStateBytes = sealState.getSignBytes()

    if (!this._msgSigner) {
      throw new Error('impossible to create transactions without a private key')
    }
    const messageSignature = this._msgSigner.sign(sealStateBytes)
    const seal = new Seal(messageSignature, this._msgSigner.getPublicKey())

    return new Transaction(message, seal, nonceTime)
  }
}

module.exports = {
  Transactor,
}