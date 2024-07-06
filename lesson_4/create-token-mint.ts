import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import "dotenv/config";
import { getOrCreateAssociatedTokenAccount, createMint } from "@solana/spl-token";

const user = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");


const tokenMint = await createMint(
  connection,
  user,
  user.publicKey,
  null,
  2
  );
  const link = getExplorerLink("address", tokenMint.toString(), "devnet");
  console.log(`✅ Token Mint: ${link}`);
