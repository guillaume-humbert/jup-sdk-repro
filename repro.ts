import { Connection, PublicKey } from '@solana/web3.js';
import JSBI from 'jsbi';
import { Jupiter } from "@jup-ag/core";

async function repro() {
    const connection = new Connection('<some-paid-rpc>'); // update me

    const jupiter = await Jupiter.load({ connection, cluster: "mainnet-beta" });

    const usdc = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
    const promises: Promise<any>[] = [];

    for (let i = 0; i < 30; ++i) {
        const p = jupiter.computeRoutes({
            inputMint: new PublicKey(usdc),
            outputMint: new PublicKey(usdc),
            amount: JSBI.BigInt(100_000_000),
            slippageBps: 0,
        });
        promises.push(p);
    }

    await Promise.all(promises);
}

repro();
