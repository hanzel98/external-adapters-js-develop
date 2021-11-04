# Chainlink External Adapter for Balances

This is part of a Chainlink Solutions take home project. This project consists of a Smart Contract that using the Chainlink Client calls a Chainlink Node, and this node has an External Adapter Job to call this API.
When the API responds, that response goes the opposite direction towards the initial requester's Smart Contract.
The Chainlink Node Job provides different ways to parse the data before using it in the smart contract, so it chooses only the specific property it needs.

### Environment Variables

| Required? |  Name   |                                                        Description                                                         | Options | Defaults to |
| :-------: | :-----: | :------------------------------------------------------------------------------------------------------------------------: | :-----: | :---------: |
|     ❌      | API_KEY | An API key that can be obtained from the data provider's dashboard |         |             |

---

### Input Parameters

| Required? |   Name   |     Description     |           Options            | Defaults to |
| :-------: | :------: | :-----------------: | :--------------------------: | :---------: |
|           | endpoint | The endpoint to use | "sum", "highest-lowest" |   sum   |

---

## Sum Balances Endpoint

Endpoint to get the sum of all the balances from this array: https://gist.githubusercontent.com/thodges-gh/3bd03660676504478de60c3a17800556/raw/0013f560b97eb1b2481fd4d57f02507c96f0d88f/balances.json

### Input Params

Remember to use the endpoint name set to `sum`

This is the default endpoint if none is provided

### Sample Input

```json
{
  "id": "1",
  "data": {
    "endpoint": "sum"
  }
}
```
### Sample Output

```json
{
  "jobRunID": "278c97ffadb54a5bbb93cfec5f7b5503",
  "data": {
    "result": 462122230678539
  },
  "statusCode": 200,
  "debug": undefined
}
```

## Highest Lowest Balances Endpoint

Endpoint to get the addresses with the highest and lowest balance from this array: https://gist.githubusercontent.com/thodges-gh/3bd03660676504478de60c3a17800556/raw/0013f560b97eb1b2481fd4d57f02507c96f0d88f/balances.json

This returns address1 and address2 to overcome a limitation in the solidity smart contract that Chainklink Client currently has in the fulfillOracleRequest, where it only allows values less than bytes32, but in this exercise the addresses are longer than that. So, the address1 and address2 are requested one after the other but not in the same request, and then combined in the smart contract. it is remarkable that this has some implications, for example, this request needs at least 2 LINK tokens instead of one, it is generally more inefficient than a single call, but the limitation is in a place where it is better not to modify it: https://github.com/smartcontractkit/chainlink/blob/d8982d45739a2157c3c5d73d2462b8b449165308/contracts/src/v0.8/interfaces/OracleInterface.sol#L11


### Input Params

Remember to use the endpoint name set to `highest-lowest`

### Sample Input


```json
{
  "id": "1",
  "data": {
    "endpoint": "highest-lowest"
  }
}
```

### Sample Output

```json
{
  "jobRunID" = "1",
  "result": {
    "highest": {
      "address": "1MejgD79BrWdMzFVuF9JxRC1sXury17LUp",
      "balance": 9864586407198,
      "address1": "1MejgD79BrWdMzFVu",
      "address2": "F9JxRC1sXury17LUp" 
    },
    "lowest": {
      "address": "15XPFnJAjPiyTi59BexgHpQBMsA9xzjNn9",
      "balance": 38860414198,
      "address1": "15XPFnJAjPiyTi59B",
      "address2": "exgHpQBMsA9xzjNn9" 
    }
  },
  "statusCode": 200
}
```
