import { airdropIfRequired } from "@solana-developers/helpers";
import { clusterApiUrl,LAMPORTS_PER_SOL,Connection, PublicKey } from "@solana/web3.js";
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log('connection to cluster established');
const sebiPublicKey = new PublicKey("AjSSsjFAWhxEHgJRQom65Rnf55YoKRZmVixGVk5F44Ee");

await airdropIfRequired (
    connection, sebiPublicKey,
    2 * LAMPORTS_PER_SOL,
    0.5 * LAMPORTS_PER_SOL,
    ) ;

const balanceInLamport = await connection.getBalance(sebiPublicKey);
console.log ('Balance', balanceInLamport, LAMPORTS_PER_SOL, 'SOL');
// TODO
// >solana airdrop 0.5
// then the current script should be executed