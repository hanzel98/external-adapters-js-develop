import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'
import { makeExecute } from '../../src/adapter'

describe('execute', () => {
  const timeout: number = 10000 // 10 seconds it ok for our API
  jest.setTimeout(timeout)

  const jobID: string = '1'
  const execute = makeExecute()
  const endpoint: string = "sum"
  interface IRequest {
    id: string
    data: {}
  }
  const requestData: IRequest = { id: jobID, data: { endpoint } }
  interface IRequestResult {
    jobRunID?: string,
    result?: number,
  }
  /*
  This is the expected output format
  "{
    jobRunID: '1',
    data: { result: 462122230678539 },
    result: 462122230678539,
    statusCode: 200,
    debug: undefined
  }"
  */

  describe('validation error', () => {

    const basicApiRequests = [
      { name: 'empty body', testData: {} },
      { name: 'empty data', testData: { data: {} } },
    ]

    basicApiRequests.forEach((req) => {
      it(`${req.name}`, async () => {
        try {
          // Ensure the default endpoint works
          const result = await execute(req.testData as AdapterRequest)
          if(!result) throw new Error('The default endpoint did not work')
        } catch (error) {
          const errorResp = Requester.errored(jobID, error)
          assertError({ expected: 400, actual: errorResp.statusCode }, errorResp, jobID)
        }
      })

      describe('property presence validations', () => {
        let response: IRequestResult
        // Calling the execute function for all the validation since it validates over the same response
        beforeAll(async () => {
          response = await execute(requestData as AdapterRequest)
        })

        it('validates existence of result', async () => {
          expect(response).toHaveProperty('result')
        })
    
        it('validates existence of jobID', async () => {
          expect(response).toHaveProperty('jobRunID')
        })
  
      })

      describe('type validations', () => {
        let response: IRequestResult
        // Calling the execute function for all the validation since it validates over the same response
        beforeAll(async () => {
          response = await execute(requestData as AdapterRequest)
        })
    
        it('validates jobRunID is a string', async () => {
          const type: string = typeof response.jobRunID
          expect(type).toEqual('string')
        })

        it('validates result is a number', async () => {
          const type: string = typeof response.result
          expect(type).toEqual('number')
        })
      })

      describe('property valid value validations', () => {
        let response: IRequestResult
        // Calling the execute function for all the validation since it validates over the same response
        beforeAll(async () => {
          response = await execute(requestData as AdapterRequest)
        })
    
        it('validates not empty jobID', async () => {
          const isEmpty: boolean = response.jobRunID? false: true
          expect(isEmpty).toEqual(false)
        })

        it('validates not empty result', async () => {
          const isEmpty: boolean = response.result? false: true
          expect(isEmpty).toEqual(false)
        })
      })

      describe('property value expectations', () => {
        let response: IRequestResult
        // Calling the execute function for all the validation since it validates over the same response
        beforeAll(async () => {
          response = await execute(requestData as AdapterRequest)
        })
    
        it('validates correct Job Id', async () => {
          const isEqual: boolean = response.jobRunID === jobID
          expect(isEqual).toEqual(true)
        })

        it('validates result is a positive number', async () => {
          const isPositive: boolean = response.result >= 0
          expect(isPositive).toEqual(true)
        })
      })
    })
  })
})
