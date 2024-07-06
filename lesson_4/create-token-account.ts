import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import "dotenv/config";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

const user = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
console.log(
  `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toString()}`
);

const recipient = new PublicKey('Hxsgo2tPiu6967VUaEquk232riDKkaqK89wBvdSCgjH7');

const tokenMintAccount = new PublicKey('2bEr5w4e6F7PwMr5r1DSYmSqzgWJd9f5ZjdhKn1nxTUc');

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMintAccount,
  recipient
);

const link = getExplorerLink(
  "address",
  tokenAccount.address.toBase58(),
  "devnet"
);
console.log(`Created token Account: ${link}`);
