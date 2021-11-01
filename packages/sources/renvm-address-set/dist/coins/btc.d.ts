/// <reference types="node" />
import * as bitcoin from 'bitcoinjs-lib';
export declare const getNetwork: (network: string) => bitcoin.networks.Network | undefined;
export declare const p2pkh: (pubkey: Buffer, network: bitcoin.networks.Network) => bitcoin.payments.Payment;
//# sourceMappingURL=btc.d.ts.map