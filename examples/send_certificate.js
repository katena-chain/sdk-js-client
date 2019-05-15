const { createPrivateKeyED25519FromBase64 } = require('../lib/utils/crypto')
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

  // Off chain information you want to send
  const certificateUuid = '2075c941-6876-405b-87d5-13791c0dc53a'
  const dataSignature = Buffer.from('off_chain_data_signature_from_js', 'utf-8')
  const dataSigner = Buffer.from('off_chain_data_signer_from_js', 'utf-8')

  try {

    // Send a version 1 of a certificate on Katena blockchain
    const transactionStatus = await transactor.sendCertificateV1(certificateUuid, dataSignature, dataSigner)

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