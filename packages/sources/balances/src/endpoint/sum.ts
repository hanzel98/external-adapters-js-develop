import { Requester, Validator } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { DEFAULT_API_ENDPOINT } from '../config';

// Call this endpont to execute the sum function
export const supportedEndpoints = ['sum'] 

export const endpointResultPaths = {}

const customError = (data: any) => data.Response === 'Error'

export const inputParameters: InputParameters = {} // Not needed

// Validate that some values were received
const validateResponse = (response: {data: number[]}) => {
  const accounts = response.data
  if (!accounts || accounts.length === 0) {
    throw Error('There are no accounts with balance')
  }
}

interface IAccountResult {
  address: string,
  balance: number
}
export const execute: ExecuteWithConfig<Config> = async (request: any, _:any, config:any) => {
  const validator = new Validator(request)
  if (validator.error) throw validator.error


  const jobRunID = validator.validated.id
  // No special url or query needed to call the API
  const options = {
    ...config.api,
    baseURL: DEFAULT_API_ENDPOINT,
    url: '',
  }

  const response = await Requester.request(options, customError)
  validateResponse(response)
  const results = response.data;
  // Sum all the balances obtained in the query response
  const total: number = results.reduce((accumulator: number, current: IAccountResult) => accumulator + current.balance, 0);
  response.data = {
    total,
  }
  const result = Requester.validateResultNumber(response.data, ['total'])
  return Requester.success(jobRunID, Requester.withResult(response, result), config.verbose)
}
