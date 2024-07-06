// SPL - Solana Program Library ( SOLANA standards)
import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
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
import { TOKEN_PROGRAM_ID, createMint, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";


const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const user = getKeypairFromEnvironment("SECRET_KEY");
const tkMintAccount = new PublicKey('2bEr5w4e6F7PwMr5r1DSYmSqzgWJd9f5ZjdhKn1nxTUc');

// Let's mint the tokens to ourselves for now!
const recipientAssociatedTokenAccount = await getOrCreateAssociatedTokenAccount(
connection,
user,
tkMintAccount,
user.publicKey
);

const transactionSignature = await mintTo(
  connection,
  user,
  tkMintAccount,
  recipientAssociatedTokenAccount.address,
  user,
  10 *10 **2);

  const link = getExplorerLink("transaction", transactionSignature, "devnet");
  console.log(`✅ Success! Mint Token Transaction: ${link}`);

  // https://explorer.solana.com/tx/2NPGzeh4c8h2pRBqJ9iN8MvgrAYJKoK6sZ9soi6EwLHESKNadPkF2sqE7tqyomSMqienDchf61CyDG6gXqFjmyXc?cluster=devnet