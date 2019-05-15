/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { Client } = require('./client')
const { sprintf } = require('../utils/string')
const { ApiError } = require('../errors/apiError')
const { TransactionStatus } = require('../entity/api/transactionStatus')
const { TransactionWrapper } = require('../entity/api/transactionWrapper')
const { TransactionWrappers } = require('../entity/api/transactionWrappers')
const HttpStatus = require('http-status-codes')

/**
 * Handler provides helper methods to send and retrieve transactions without directly interacting with the HTTP Client.
 */
class Handler {

  /**
   * Handler constructor
   * @param apiUrl {string}
   */
  constructor(apiUrl) {
    this._apiClient = new Client(apiUrl)
  }

  /**
   * sendCertificate accepts a transaction and sends it to the appropriate certificate API route.
   * @param transaction {Transaction}
   * @return {Promise<TransactionStatus>}
   */
  sendCertificate(transaction) {
    return this.sendTransaction(Handler.CERTIFICATE_CERTIFY_ROUTE, transaction)
  }

  /**
   * sendSecret accepts a transaction and sends it to the appropriate secret API route.
   * @param transaction {Transaction}
   * @param companyChainID {string}
   * @param certificateUuid {string}
   * @return {Promise<TransactionStatus>}
   */
  async sendSecret(transaction, companyChainID, certificateUuid) {
    return this.sendTransaction(sprintf(Handler.SECRET_CERTIFY_ROUTE, companyChainID, certificateUuid), transaction)
  }

  /**
   * retrieveCertificate fetches the API and returns a transaction wrapper.
   * @param companyChainID {string}
   * @param uuid {string}
   * @return {Promise<TransactionWrapper>}
   */
  async retrieveCertificate(companyChainID, uuid) {
    const apiResponse = await this._apiClient.get(sprintf(Handler.CERTIFICATE_ROUTE, companyChainID, uuid))
    if (apiResponse.getStatusCode() === HttpStatus.OK) {
      return TransactionWrapper.fromJSON(apiResponse.getBody())
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }

  /**
   * retrieveSecrets fetches the API and returns a transaction wrapper list.
   * @param companyChainID {string}
   * @param certificateUuid {string}
   * @return {Promise<TransactionWrappers>}
   */
  async retrieveSecrets(companyChainID, certificateUuid) {
    const apiResponse = await this._apiClient.get(sprintf(Handler.SECRETS_ROUTE, companyChainID, certificateUuid))
    if (apiResponse.getStatusCode() === HttpStatus.OK) {
      return TransactionWrappers.fromJSON(apiResponse.getBody())
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }

  /**
   * sendTransaction tries to send a transaction to the API and returns a transaction status or throws an api error.
   * @param route {string}
   * @param transaction {Transaction}
   * @return {Promise<TransactionStatus>}
   */
  async sendTransaction(route, transaction) {
    const apiResponse = await this._apiClient.post(route, transaction.toJSON())
    if (apiResponse.getStatusCode() === HttpStatus.ACCEPTED) {
      return TransactionStatus.fromJSON(apiResponse.getBody())
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }
}

Handler.CERTIFICATES_ROUTE = 'certificates'
Handler.CERTIFICATE_ROUTE = Handler.CERTIFICATES_ROUTE + '/%s-%s'
Handler.CERTIFICATE_CERTIFY_ROUTE = Handler.CERTIFICATES_ROUTE + '/certify'
Handler.SECRETS_ROUTE = Handler.CERTIFICATE_ROUTE + '/secrets'
Handler.SECRET_CERTIFY_ROUTE = Handler.SECRETS_ROUTE + '/certify'

module.exports = {
  Handler,
}