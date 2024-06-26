import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import "dotenv/config";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`✅ Finished! We've loaded our keypair securely, using an env file! Our public key
is: ${keypair.publicKey.toBase58()}`);
