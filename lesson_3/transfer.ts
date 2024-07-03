import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { createMemoInstruction } from "@solana/spl-memo";
import "dotenv/config";

let getBalance = async (connection: Connection, pubkey: PublicKey) => {
  const balance = await connection.getBalance(pubkey);
  console.log(`Balance of ${pubkey.toString()}:`, balance / LAMPORTS_PER_SOL);
  return balance;
};

const sender = getKeypairFromEnvironment("SECRET_KEY");
const receiver = new PublicKey("AMhdHJ83EQnFRp3DXKr9NCJxZCUjjoqpHf63XnuYT81G");

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

getBalance(connection, sender.publicKey);
getBalance(connection, receiver);

const transaction = new Transaction();

const transferInstruction: TransactionInstruction = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: receiver,
  lamports: 0.1 * LAMPORTS_PER_SOL,
});

const memoInstruction = createMemoInstruction("Thanks mate!");

transaction.add(transferInstruction, memoInstruction);
try {
  const signature = await sendAndConfirmTransaction(connection, transaction, [
    sender,
  ]);
  console.log("Signature: ", signature);
} catch (error) {
  console.error("Transaction failed:", error);
}
