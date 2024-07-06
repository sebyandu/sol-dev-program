import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import {
  Connection,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import "dotenv/config";

const user = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const recipient = new PublicKey("AjSSsjFAWhxEHgJRQom65Rnf55YoKRZmVixGVk5F44Ee");
const tkMintAccount = new PublicKey('2bEr5w4e6F7PwMr5r1DSYmSqzgWJd9f5ZjdhKn1nxTUc');

console.log(`💸 Attempting to send 1 token to ${recipient.toBase58()}...`);

// Get or create the source and destination token accounts to store this token
const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tkMintAccount,
  user.publicKey
  );
  const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tkMintAccount,
  recipient
  );
  // Transfer the tokens
  const signature = await transfer(
  connection,
  user,
  sourceTokenAccount.address,
  destinationTokenAccount.address,
  user,
  1 * 10**2
  );
  const explorerLink = getExplorerLink("transaction", signature, "devnet");
  console.log(`✅ Transaction confirmed, explorer link is: ${explorerLink}!`);
  // https://explorer.solana.com/tx/3wA5irrEvHq7spWvHayPjNStDno9sRMxbdt3bSAYWHrUfAecgNJGoSdFwvdW6v5f78MuKrvevsCQuwrepH6DEmVH?cluster=devnet!