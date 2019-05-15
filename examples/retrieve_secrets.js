const { createPrivateKeyX25519FromBase64 } = require('../lib/utils/crypto')
const { Transactor } = require('../lib/transactor')
const { sprintf } = require('../lib/utils/string')

async function main() {

  // Common Katena network information
  const apiUrl = 'https://api.test.katena.transchain.io/api/v1'

  // Your Katena network information
  const companyChainID = 'abcdef'

  // Create a Katena API helper
  const transactor = new Transactor(apiUrl, companyChainID)

  // Your decryption private key
  const recipientPrivateKeyX25519Base64 = '/HYK9/xU3SSKNtylLEQs/MrjujgrxYkWuDFQ4A2QayQ='
  const recipientPrivateKey = createPrivateKeyX25519FromBase64(recipientPrivateKeyX25519Base64)

  // Certificate uuid you want to retrieve secrets
  const certificateUuid = '2075c941-6876-405b-87d5-13791c0dc53a'

  try {

    // Retrieve version 1 of secrets from Katena blockchain
    const secretV1Wrappers = await transactor.retrieveSecretsV1(certificateUuid)

    for (let i = 0; i < secretV1Wrappers.getSecrets().length; i++) {
      const secretV1Wrapper = secretV1Wrappers.getSecrets()[i]
      console.log('Transaction status')
      console.log(sprintf('  Code    : %s', secretV1Wrapper.getStatus().getCode().toString()))
      console.log(sprintf('  Message : %s', secretV1Wrapper.getStatus().getMessage()))

      console.log('SecretV1')
      console.log(sprintf('  Certificate uuid  : %s', secretV1Wrapper.getSecret().getCertificateUuid()))
      console.log(sprintf('  Company chain id  : %s', secretV1Wrapper.getSecret().getCompanyChainID()))
      console.log(sprintf('  Lock encryptor    : %s', secretV1Wrapper.getSecret().getLock().getEncryptor().getKey().toString('base64')))
      console.log(sprintf('  Lock nonce        : %s', secretV1Wrapper.getSecret().getLock().getNonce().toString('base64')))
      console.log(sprintf('  Lock content      : %s', secretV1Wrapper.getSecret().getLock().getContent().toString('base64')))

      // Try to decrypt the content
      let decryptedContent = recipientPrivateKey.open(
        secretV1Wrapper.getSecret().getLock().getContent(),
        secretV1Wrapper.getSecret().getLock().getEncryptor(),
        secretV1Wrapper.getSecret().getLock().getNonce(),
      ).toString('utf8')

      if (decryptedContent === '') {
        decryptedContent = 'Unable to decrypt'
      }
      console.log(sprintf('  Decrypted content : %s', decryptedContent))
      console.log()
    }

  } catch (e) {
    if (e.name === 'ApiError') {
      console.log(e.toString())
    } else {
      console.log(e)
    }
  }
}

main().then()