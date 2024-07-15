import { Metaplex, NftWithToken } from "@metaplex-foundation/js";

// helper function create NFT
async function createNft(
  metaplex: Metaplex,
  uri: string,
  nftData: NftData
): Promise<NftWithToken> {
  const { nft } = await metaplex.nfts().create(
    {
      uri: uri, // metadata URI
      name: nftData.name,
      sellerFeeBasisPoints: nftData.sellerFeeBasisPoints,
      symbol: nftData.symbol,
    },
    { commitment: "finalized" }
  );
  console.log(
    `Token Mint: https://explorer.solana.com/address/${nft.address.toString()}?cluster=devnet`
  );
  return nft;
}
