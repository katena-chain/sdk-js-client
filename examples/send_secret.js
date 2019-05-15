const {
  createPrivateKeyED25519FromBase64,
  createPublicKeyX25519FromBase64,
  createNewKeysX25519,
} = require('../lib/utils/crypto')
const { Transactor } = require('../lib/transactor')
const { sprintf } = require('../lib/utils/string')

async function main() {

  // Common Katena network information
  const apiUrl = 'https://api.test.katena.transchain.io/api/v1'
  const chainID = 'katena-chain-test'

  // Your Katena network information
  const privateKeyED25519Base64 = '7C67DeoLnhI6jvsp3eMksU2Z6uzj8sqZbpgwZqfIyuCZbfoPcitCiCsSp2EzCfkY52Mx58xDOyQLb1OhC7cL5A=='
  const companyChainID = 'abcdef'

  // Convert your private key
  const privateKey = createPrivateKeyED25519FromBase64(privateKeyED25519Base64)

  // Create a Katena API helper
  const transactor = new Transactor(apiUrl, companyChainID, chainID, privateKey)

  // Secret information about a certificate you want to send
  const certificateUuid = '2075c941-6876-405b-87d5-13791c0dc53a'
  const content = Buffer.from('off_chain_data_aes_encryption_key_from_js')

  // The recipient public key able to decrypt the secret later
  const recipientPublicKeyX25519Base64 = 'CgguJuEb+/cSHD4Jo8JcVRpwDlt834pFijvd2AdWIgE='
  const recipientPublicKey = createPublicKeyX25519FromBase64(recipientPublicKeyX25519Base64)

  try {

    // Ephemeral key pair (recommended) to encrypt the secret
    const senderEphemeralKeys = createNewKeysX25519()
    const senderEphemeralPublicKey = senderEphemeralKeys.publicKey
    const senderEphemeralPrivateKey = senderEphemeralKeys.privateKey

    // Encrypt the secret
    const encryptedInfo = senderEphemeralPrivateKey.seal(content, recipientPublicKey)

    // Send a version 1 of a secret on Katena blockchain
    const transactionStatus = await transactor.sendSecretV1(certificateUuid, senderEphemeralPublicKey, encryptedInfo.nonce, encryptedInfo.encryptedMessage)

    console.log('Transaction status')
    console.log(sprintf('  Code    : %s', transactionStatus.getCode().toString()))
    console.log(sprintf('  Message : %s', transactionStatus.getMessage()))

  } catch (e) {
    if (e.name === 'ApiError') {
      console.log(e.toString())
    } else {
      console.log(e)
    }
  }

}

main().then()