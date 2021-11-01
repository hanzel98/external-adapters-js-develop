import { Requester } from '@chainlink/ea-bootstrap'
import { Config } from '@chainlink/types'

export const NAME = 'BALANCEPROVIDER' // This should be filled in with a name corresponding to the data provider using UPPERCASE and _underscores_.
export const DEFAULT_API_ENDPOINT = 'https://gist.githubusercontent.com/thodges-gh/3bd03660676504478de60c3a17800556/raw/0013f560b97eb1b2481fd4d57f02507c96f0d88f/balances.json'
export const DEFAULT_ENDPOINT = 'sum'

export const makeConfig = (prefix?: string): Config => {
  const config = Requester.getDefaultConfig(prefix)
  config.defaultEndpoint = DEFAULT_ENDPOINT
  return config
}
