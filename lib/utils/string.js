/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

/**
 * sprintf replaces %s instance in the format string by variadic args values in the same order.
 * @param format {string}
 * @param args {...string}
 * @return {string}
 */
function sprintf(format, ...args) {
  let i = 0
  return format.replace(/%s/g, () => args[i++])
}

module.exports = {
  sprintf,
}