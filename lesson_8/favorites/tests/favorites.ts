import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Favorites } from "../target/types/favorites";
import { assert } from "chai";
const web3 = anchor.web3;

describe("Favorites", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const user = (provider.wallet as anchor.Wallet).payer;
  const program = anchor.workspace.Favorites as Program<Favorites>;

  before(async () => {
    // Add your setup logic here.
    const balance = await provider.connection.getBalance(user.publicKey);
    const balanceInSOL = balance / web3.LAMPORTS_PER_SOL;
    const formattedBalance = new Intl.NumberFormat().format(balanceInSOL);
    console.log(`User balance: ${formattedBalance} SOL`);
  });

  it("Save a user's favorite to the blockchain", async () => {
    const favoriteNo = new anchor.BN(23);
    const favoriteColor = "green";
    const favoriteHobbies = ["hiking", "trailing", "coding"];
    const tx = await program.methods
      .setFavorites(favoriteNo, favoriteColor, favoriteHobbies)
      .signers([user])
      .rpc();

    console.log("Transaction hash:", tx);

    const favoritesPdaAndBump = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("favorites"), user.publicKey.toBuffer()],
      program.programId
    );
    const favoritesPda = favoritesPdaAndBump[0];
    const dataFromPda = await program.account.favorites.fetch(favoritesPda);

    assert.equal(dataFromPda.color, favoriteColor);
    assert.equal(String(dataFromPda.number), String(favoriteNo));
    assert.deepEqual(dataFromPda.hobbies, favoriteHobbies);
  });

  it("Doesn't let people write to favorites for other users", async () => {
    const userX = anchor.web3.Keypair.generate();
    try {
      await program.methods
        .setFavorites(new anchor.BN(420), "red", ["basketball"])
        .signers([userX])
        .rpc();
    } catch (error) {
      const errorMessage = (error as Error).message;
      assert.isTrue(errorMessage.includes("unknown signer"));
    }
  });
});
