import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'
import { makeExecute } from '../../src/adapter'

describe('execute', () => {
  const timeout: number = 10000 // 10 seconds it ok for our API
  jest.setTimeout(timeout)

  const jobID: string = '1'
  const execute = makeExecute()
  const endpoint: string = "highest-lowest"
  interface IRequest {
    id: string
    data: {}
  }
  const requestData: IRequest = { id: jobID, data: { endpoint } }
  interface IRequestResult {
    jobRunID?: string,
    result?: { 
      highest: {
        address: string,
        address1: string,
        address2: string,
        balance: number,
      }, 
      lowest: {
        address: string,
        address1: string,
        address2: string,
        balance: number,
      }}
  }
  /*
  This is the expected output format
  {
    jobRunID = “,
    result : {
      highest : {
        address: “qwertyuiop”,
        balance: 2345678,
        address1: ‘qwerty’,
        address2: ‘uiop' 
      },
      lowest : {
        address: “qwertyuiop”,
        balance: 2345678,
        address1: ‘qwerty’,
        address2: ‘uiop' 
      }
    }
  }
  */

  describe('validation error', () => {
    const basicApiRequests = [
      { name: 'empty body', testData: {} },
      { name: 'empty data', testData: { data: {} } },
    ]

    basicApiRequests.forEach(req => {
      it(`${req.name}`, async () => {
        try {
          // Ensure the default endpoint works
          const response = await execute(req.testData as AdapterRequest)
          if(!response) throw new Error('The default endpoint did not work')
        } catch (error) {
          const errorResp = Requester.errored(jobID, error)
          assertError({ expected: 400, actual: errorResp.statusCode }, errorResp, jobID)
        }
      })
    })
  })

  describe('property presence validations', () => {
    let response = {}
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

    it('validates existence of result', async () => {
      expect(response).toHaveProperty('result.highest')
    })

    it('validates existence of result highest ', async () => {
      expect(response).toHaveProperty('result.highest')
    })

    it('validates existence of result highest address ', async () => {
      expect(response).toHaveProperty('result.highest.address')
    })

    it('validates existence of result highest balance ', async () => {
      expect(response).toHaveProperty('result.highest.balance')
    })

    it('validates existence of result highest address1 ', async () => {
      expect(response).toHaveProperty('result.highest.address1')
    })

    it('validates existence of result highest address2 ', async () => {
      expect(response).toHaveProperty('result.highest.address2')
    })

    it('validates existence of result lowest ', async () => {
      expect(response).toHaveProperty('result.lowest')
    })

    it('validates existence of result lowest address ', async () => {
      expect(response).toHaveProperty('result.lowest.address')
    })

    it('validates existence of result lowest address1 ', async () => {
      expect(response).toHaveProperty('result.lowest.address1')
    })

    it('validates existence of result lowest address2 ', async () => {
      expect(response).toHaveProperty('result.lowest.address2')
    })

    it('validates existence of result lowest balance ', async () => {
      expect(response).toHaveProperty('result.lowest.balance')
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

    it('validates highest address is a string', async () => {
      const type: string = typeof response.result.highest.address
      expect(type).toEqual('string')
    })

    it('validates highest address1 is a string', async () => {
      const type: string = typeof response.result.highest.address1
      expect(type).toEqual('string')
    })

    it('validates highest address2 is a string', async () => {
      const type: string = typeof response.result.highest.address2
      expect(type).toEqual('string')
    })

    it('validates highest address2 is a string', async () => {
      const type: string = typeof response.result.highest.address2
      expect(type).toEqual('string')
    })

    it('validates highest balance is a number', async () => {
      const type: string = typeof response.result.highest.balance
      expect(type).toEqual('number')
    })

    it('validates lowest balance is a number', async () => {
      const type: string = typeof response.result.lowest.balance
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

    it('validates not empty highest address ', async () => {
      const isEmpty: boolean = response.result.highest.address? false: true
      expect(isEmpty).toEqual(false)
    })

    it('validates not empty highest address1 ', async () => {
      const isEmpty: boolean = response.result.highest.address1? false: true
      expect(isEmpty).toEqual(false)
    })

    it('validates not empty highest address2 ', async () => {
      const isEmpty: boolean = response.result.highest.address2? false: true
      expect(isEmpty).toEqual(false)
    })

    it('validates not empty lowest address ', async () => {
      const isEmpty: boolean = response.result.lowest.address? false: true
      expect(isEmpty).toEqual(false)
    })

    it('validates not empty lowest address1 ', async () => {
      const isEmpty: boolean = response.result.lowest.address1? false: true
      expect(isEmpty).toEqual(false)
    })

    it('validates not empty lowest address2 ', async () => {
      const isEmpty: boolean = response.result.lowest.address2? false: true
      expect(isEmpty).toEqual(false)
    })

    it('validates not empty lowest address2 ', async () => {
      const isEmpty: boolean = response.result.lowest.address2? false: true
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

    it('validates highest positive balance', async () => {
      const isPositive: boolean = response.result.highest.balance >= 0
      expect(isPositive).toEqual(true)
    })

    it('validates lowest positive balance', async () => {
      const isPositive: boolean = response.result.lowest.balance >= 0
      expect(isPositive).toEqual(true)
    })

    it('validates highest balance to be greater than or equal to the lowest balance', async () => {
      const isGreater: boolean = response.result.highest.balance >= response.result.lowest.balance
      expect(isGreater).toEqual(true)
    })

    it('validates highest address to be equal to address1 and address2', async () => {
      const { address, address1, address2 } = response.result.highest
      const areEqual: boolean = address === `${address1}${address2}`
      expect(areEqual).toEqual(true)
    })

    it('validates lowest address to be equal to address1 and address2', async () => {
      const { address, address1, address2 } = response.result.lowest
      const areEqual: boolean = address === `${address1}${address2}`
      expect(areEqual).toEqual(true)
    })
  })
})
