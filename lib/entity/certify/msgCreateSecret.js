/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { SecretV1 } = require('./secretV1')
const { sprintf } = require('../../utils/string')

/**
 * MsgCreateSecret is a wrapper to indicate that a create secret action should be applied in a transaction.
 */
class MsgCreateSecret {

  /**
   * MsgCreateSecret constructor.
   * @param secret {Object}
   */
  constructor(secret) {
    this._secret = secret
  }

  /**
   * secret getter.
   * @return {Object}
   */
  getSecret() {
    return this._secret
  }

  /**
   * type getter.
   * @return {string}
   */
  getType() {
    return MsgCreateSecret.TYPE
  }

  /**
   * toObject returns the object representation of a MsgCreateSecret.
   * It indicates which message action we want to sign.
   * @return {Object}
   */
  toObject() {
    return {
      type: MsgCreateSecret.TYPE,
      value: {
        secret: this._secret.toObject(),
      },
    }
  }

  /**
   * fromObject accepts an object representation of a MsgCreateSecret and returns a new instance.
   * @param object {Object}
   * @return {MsgCreateSecret}
   */
  static fromObject(object) {
    if (object.secret.type in MsgCreateSecret.MESSAGES_MAPPING) {
      const secret = MsgCreateSecret.MESSAGES_MAPPING[object.secret.type].fromObject(object.secret.value)
      return new MsgCreateSecret(secret)
    } else {
      throw new Error(sprintf('unknown secret type: %s', object.secret.type))
    }
  }

}

MsgCreateSecret.MESSAGES_MAPPING = {
  [SecretV1.TYPE]: SecretV1,
}
MsgCreateSecret.TYPE = 'certify/MsgCreateSecret'

module.exports = {
  MsgCreateSecret,
}