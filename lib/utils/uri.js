/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const urlJoin = require('url-join')
const queryString = require('querystring')

/**
 * getUri joins the base path and paths array and adds the query values to return a new url.
 * @param basePath {string}
 * @param paths {string[]}
 * @param queryValues {Object}
 * @return {string}
 */
function getUri(basePath, paths, queryValues) {
  let uri = urlJoin(basePath, ...paths)
  if (queryValues) {
    const qs = queryString.stringify(queryValues)
    uri += '?' + qs
  }
  return uri
}

module.exports = {
  getUri,
}