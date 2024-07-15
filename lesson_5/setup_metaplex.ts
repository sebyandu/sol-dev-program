import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
} from "@metaplex-foundation/js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, clusterApiUrl } from "@solana/web3.js";

async function main() {
  // create a new connection to the cluster's API
  const connection = new Connection(clusterApiUrl("devnet"));
  // initialize a keypair for the user
  const user = getKeypairFromEnvironment("PRIVATE_KEY");
  console.log(
    `
    We've loaded our keypair securely, using an env file! Our public key is:
    ${user.publicKey.toBase58()}`
  );
  // metaplex set up
  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(user))
    .use(
      bundlrStorage({
        address: "https://devnet.bundlr.network",
        providerUrl: "https://api.devnet.solana.com",
        timeout: 60000,
      })
    );

  // upload the NFT data and get the URI for the metadata
  const uri = await uploadMetadata(metaplex, nftData);
  // create an NFT using the helper function and the URI from the metadata
  const nft = await createNft(metaplex, uri, nftData);
}
