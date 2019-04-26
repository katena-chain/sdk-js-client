# SDK JS Client

## Requirements

- NodeJS >= 8.x

## Install

```bash
npm install @katena-chain/sdk-js-client
```

## Usage

To rapidly interact with our API, you can use our `Transactor` helper. It handles all the steps needed to correctly
format, sign and send a transaction.

Feel free to explore and modify its code to meet your expectations.

Here is a snippet to demonstrate its usage:

```javascript
const { Transactor } = require('@katena-chain/sdk-js-client/lib/client/transactor')

async function main() {
  const apiUrl = 'https://api.demo.katena.transchain.io'
  const apiUrlSuffix = 'api/v1'
  const chainID = 'katena-chain'
  const privateKeyBase64 = '7C67DeoLnhI6jvsp3eMksU2Z6uzj8sqZbpgwZqfIyuCZbfoPcitCiCsSp2EzCfkY52Mx58xDOyQLb1OhC7cL5A=='
  const companyChainID = 'abcdef'

  const transactor = new Transactor(apiUrl, apiUrlSuffix, chainID, privateKeyBase64, companyChainID)

  const uuid = '7529b5d0-16ba-4856-b139-dd6a48a87ad4'
  const dataSignature = 'document_signature_value'
  const dataSigner = 'document_signer_value'

  try {
    const apiResponse = await transactor.sendCertificate(uuid, dataSignature, dataSigner)
    console.log('API status code : ' + apiResponse.statusCode)
    console.log('API body        : ' + JSON.stringify(apiResponse.body).replace('\n', ''))
  } catch (e) {
    console.log(e.message)
  }
}

main().then()
```

## Katena documentation

For more information, check the [katena documentation](https://doc.katena.transchain.io)