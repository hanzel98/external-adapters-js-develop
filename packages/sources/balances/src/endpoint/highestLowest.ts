import { Requester, Validator } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { DEFAULT_API_ENDPOINT } from '../config'

// Call this endpont to execute the highestLowest function
export const supportedEndpoints = ['highest-lowest'] 

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

// Validate the correct values in the result path
const validateResultPath = (resultPath: string[] = []) => {
  const allowedPath1: string[] = ['lowest', 'highest']
  // Validates that the path value is in the expected values
  if(resultPath[0] && !allowedPath1.includes(resultPath[0])){
    throw Error(`Path is invalid, this property does not exist: ${resultPath[0]}`)
  }
}

interface IAccountResult {
  address: string,
  balance: number,
  address1?: string,
  address2?: string,

}
const includeSplittedAddress = (account: IAccountResult): IAccountResult => {
  if(!account) {
    throw Error(`Unable to find values`)
  }
  const accountCopy: IAccountResult = {...account}
  const accountAddressLength = accountCopy.address.length
  const halfElementIndex = Math.round(accountAddressLength/2)
  accountCopy.address1 = accountCopy.address.substr(0, halfElementIndex)
  accountCopy.address2 = accountCopy.address.substr(halfElementIndex, accountAddressLength-1)
  return accountCopy
}
const calculateHighestLowest = (results: IAccountResult[]): IAccountResult[] =>{
  // Calculates the highest and lowest values obtained in the query response
  // Assign the first value as highest and lowest to compare later
  let highest: IAccountResult = results[0]
  let lowest: IAccountResult = results[0]
  results.forEach((element:IAccountResult) => { // TODO: consider big numbers
      if(element.balance > highest.balance) highest = element // Compares previous highest with current
      if(element.balance < lowest.balance) lowest = element  // Compares previous lowest with current
  })

  return [highest, lowest]
}


export const execute: ExecuteWithConfig<Config> = async (request: any, _: any, config: any) => {
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

  const results: IAccountResult[] = response.data
  let [highest, lowest] = calculateHighestLowest(results)
  highest = includeSplittedAddress(highest)
  lowest = includeSplittedAddress(lowest)
  // Properties highest/lowest include address and balance
  response.data = { highest, lowest } // Insert results in the response

  const resultPath = validator.validated.data.resultPath
  let result: any = { highest, lowest }
  if(resultPath){  // Result path was specified
    validateResultPath(resultPath)
    result = response.data[resultPath[0]].address // Formatting the output
    return Requester.success(jobRunID, Requester.withResult(response, result), config.verbose)
  }
  return Requester.success(jobRunID, Requester.withResult(response, result), config.verbose)

}