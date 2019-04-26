/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { Client } = require('../utils/api/client')
const { getUri } = require('../utils/uri')

const certificateRoute = "certificates/certify"

/**
 * Handler provides helper methods to send and retrieve transactions without directly interacting with the HTTP Client.
 */
class Handler {

  /**
   * Handler constructor
   * @param apiUrl {string}
   * @param apiUrlSuffix {string}
   */
  constructor(apiUrl, apiUrlSuffix) {
    const fullApiUrl = getUri(apiUrl, [ apiUrlSuffix ], null)
    this._apiClient = new Client(fullApiUrl)
  }

  /**
   * sendCertificate accepts a transaction and sends it to the appropriate API route.
   * @param transaction {Transaction}
   * @return {Object}
   */
  async sendCertificate(transaction) {
    const response = await this._apiClient.post(certificateRoute, null, transaction.toObject())
    return {
      statusCode: response.status,
      body: await response.json(),
    }
  }
}

module.exports = {
  Handler,
}