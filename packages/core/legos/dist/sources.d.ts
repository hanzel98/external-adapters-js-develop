/// <reference types="node" />
/// <reference types="@chainlink/types" />
import * as ada_balance from '@chainlink/ada-balance-adapter';
import * as ap_election from '@chainlink/ap-election-adapter';
import * as chain_reserve_wallet from '@chainlink/chain-reserve-wallet-adapter';
import * as coinapi from '@chainlink/coinapi-adapter';
import * as coingecko from '@chainlink/coingecko-adapter';
import * as coinmarketcap from '@chainlink/coinmarketcap-adapter';
import * as coinmetrics from '@chainlink/coinmetrics-adapter';
import * as coinpaprika from '@chainlink/coinpaprika-adapter';
import * as cryptoapis_v2 from '@chainlink/cryptoapis-v2-adapter';
import * as cryptocompare from '@chainlink/cryptocompare-adapter';
import * as curve from '@chainlink/curve-adapter';
import * as dxfeed from '@chainlink/dxfeed-adapter';
import * as dxfeed_secondary from '@chainlink/dxfeed-secondary-adapter';
import * as enzyme from '@chainlink/enzyme-adapter';
import * as eth_balance from '@chainlink/eth-balance-adapter';
import * as gemini from '@chainlink/gemini-adapter';
import * as ipfs from '@chainlink/ipfs-adapter';
import * as kaiko from '@chainlink/kaiko-adapter';
import * as lotus from '@chainlink/lotus-adapter';
import * as nomics from '@chainlink/nomics-adapter';
import * as sportsdataio from '@chainlink/sportsdataio-adapter';
import * as synthetix_debt_pool from '@chainlink/synthetix-debt-pool-adapter';
import * as tiingo from '@chainlink/tiingo-adapter';
import * as uniswap_v2 from '@chainlink/uniswap-v2-adapter';
import * as uniswap_v3 from '@chainlink/uniswap-v3-adapter';
import * as wbtc_adapter_address from '@chainlink/wbtc-address-set-adapter';
declare const _default: {
    _1forge: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    ada_balance: typeof ada_balance;
    alphachain: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    alphavantage: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    amberdata: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    anyblock: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    ap_election: typeof ap_election;
    balances: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    binance: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    binance_dex: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    bitex: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    bitso: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    blockchain_com: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    blockchair: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    blockcypher: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    blockstream: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    bravenewcoin: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    btc_com: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    cache_gold: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    cfbenchmarks: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    chain_reserve_wallet: typeof chain_reserve_wallet;
    coinapi: typeof coinapi;
    coinbase: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    coincodex: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    coingecko: typeof coingecko;
    coinlore: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    coinmarketcap: typeof coinmarketcap;
    coinmetrics: typeof coinmetrics;
    coinpaprika: typeof coinpaprika;
    coinranking: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    covid_tracker: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    cryptoapis: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    cryptoapis_v2: typeof cryptoapis_v2;
    cryptocompare: typeof cryptocompare;
    cryptoid: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    cryptomkt: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    currencylayer: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    curve: typeof curve;
    deribit: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    dns_query: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeConfig: () => import("@chainlink/types").Config;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
    };
    dwolla: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    dxfeed: typeof dxfeed;
    dxfeed_secondary: typeof dxfeed_secondary;
    enzyme: typeof enzyme;
    eodhistoricaldata: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    eth_balance: typeof eth_balance;
    etherchain: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    etherscan: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    ethgasstation: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    ethgaswatch: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    expert_car_broker: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    fcsapi: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    finage: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    finnhub: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    fixer: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    flightaware: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    fmpcloud: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    gemini: typeof gemini;
    genesis_adapter: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    geodb: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    google_bigquery: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/google-bigquery-adapter/dist/config").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/google-bigquery-adapter/dist/config").Config;
    };
    graphql: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    iex_adapter: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    intrinio: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: (config?: import("@chainlink/types").Config | undefined) => (request: import("@chainlink/types").AdapterRequest) => Promise<import("@chainlink/types").AdapterResponse>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    ipfs: typeof ipfs;
    json_adapter: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        execute: import("@chainlink/types").ExecuteWithConfig<import("@chainlink/json-rpc-adapter/dist/config").ExtendedConfig>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/json-rpc-adapter/dist/config").ExtendedConfig;
    };
    kaiko: typeof kaiko;
    layer2_sequencer_health: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/layer2-sequencer-health-adapter/dist/config").ExtendedConfig>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/layer2-sequencer-health-adapter/dist/config").ExtendedConfig;
    };
    lcx: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    linkpool: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    lition: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    lotus: typeof lotus;
    marketstack: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    messari: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    metalsapi: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    mycryptoapi: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    ncfx: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    nikkei: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    nomics: typeof nomics;
    oilpriceapi: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    onchain: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    onchain_gas: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    openexchangerates: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    orchid_adapter: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    paxos: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    paypal: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    poa: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    polygon: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    reduce: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        execute: import("@chainlink/types").Execute;
    };
    renvm_adapter_address: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    satoshitango: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    sochain: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    spectral_macro_score: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/spectral-macro-score-adapter/dist/config").SpectralAdapterConfig>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/spectral-macro-score-adapter/dist/config").SpectralAdapterConfig;
    };
    sportsdataio: typeof sportsdataio;
    stasis: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    synthetix_debt_pool: typeof synthetix_debt_pool;
    taapi: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    therundown: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    tiingo: typeof tiingo;
    tradermade: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    tradingeconomics: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: (config?: import("@chainlink/tradingeconomics-adapter/dist/config").Config | undefined) => (request: import("@chainlink/types").AdapterRequest) => Promise<import("@chainlink/types").AdapterResponse>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/tradingeconomics-adapter/dist/config").Config;
    };
    trueusd: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    twelvedata: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    unibit: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    uniswap_v2: typeof uniswap_v2;
    uniswap_v3: typeof uniswap_v3;
    upvest: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    uscpi_one: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    view_function: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/view-function-adapter/dist/config").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/view-function-adapter/dist/config").Config;
    };
    wbtc_adapter_address: typeof wbtc_adapter_address;
    wootrade: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeWSHandler: (config?: import("@chainlink/types").Config | undefined) => import("@chainlink/types").MakeWSHandler;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
    xbto: {
        server: () => Promise<import("http").Server>;
        NAME: string;
        makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
        makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    };
};
export default _default;
//# sourceMappingURL=sources.d.ts.map