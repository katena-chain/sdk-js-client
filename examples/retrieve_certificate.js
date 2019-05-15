const { Transactor } = require('../lib/transactor')
const { sprintf } = require('../lib/utils/string')

async function main() {

  // Common Katena network information
  const apiUrl = 'https://api.test.katena.transchain.io/api/v1'

  // Your Katena network information
  const companyChainID = 'abcdef'

  // Create a Katena API helper
  const transactor = new Transactor(apiUrl, companyChainID)

  // Certificate uuid you want to retrieve
  const certificateUuid = '2075c941-6876-405b-87d5-13791c0dc53a'

  try {

    // Retrieve a version 1 of a certificate from Katena blockchain
    const certificateV1Wrapper = await transactor.retrieveCertificateV1(certificateUuid)

    console.log('Transaction status')
    console.log(sprintf('  Code    : %s', certificateV1Wrapper.getStatus().getCode().toString()))
    console.log(sprintf('  Message : %s', certificateV1Wrapper.getStatus().getMessage()))

    console.log('CertificateV1')
    console.log(sprintf('  Uuid             : %s', certificateV1Wrapper.getCertificate().getUuid()))
    console.log(sprintf('  Company chain id : %s', certificateV1Wrapper.getCertificate().getCompanyChainID()))
    console.log(sprintf('  Data signer      : %s', certificateV1Wrapper.getCertificate().getSeal().getSigner()))
    console.log(sprintf('  Data signature   : %s', certificateV1Wrapper.getCertificate().getSeal().getSignature()))

  } catch (e) {
    if (e.name === 'ApiError') {
      console.log(e.toString())
    } else {
      console.log(e)
    }
  }
}

main().then()