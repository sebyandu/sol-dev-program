import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import BaseInput from "./BaseInput";
import BaseButton from "./BaseButton";

import styles from "./../styles/BaseButton.module.css";
import { useWalletConnection } from "../hooks/useWalletConnection";

const TransferForm = () => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection(); // Use the connection from the context

  const [balance, setBalance] = useState<number | null>(null);
  const [toAddress, setToAddress] = useState<string>(
    "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod"
  );
  const [amount, setAmount] = useState<string>("0.1");
  const [transactionSignature, setTransactionSignature] = useState<
    string | null
  >(null);
  const [transactionStatus, setTransactionStatus] = useState<string | null>(
    null
  );
  const getSolanaExplorerLink = (
    linkType: "tx" | "address",
    id: string,
    cluster: "devnet" | "mainnet-beta" = "mainnet-beta"
  ) => {
    return `https://explorer.solana.com/${linkType}/${id}?cluster=${cluster}`;
  };
  const isConnected = useWalletConnection();
  useEffect(() => {
    const getBalance = async () => {
      if (publicKey) {
        try {
          const balance = await connection.getBalance(publicKey);
          setBalance(balance / LAMPORTS_PER_SOL); // convert lamports to SOL
        } catch (error) {
          console.error("Error fetching balance:", error);
          setBalance(null);
        }
      }
    };

    getBalance();
  }, [publicKey, connection]);

  const sendTransactionHandler = async () => {
    if (!publicKey) {
      setTransactionStatus("Please connect your wallet.");
      return;
    }
    if (!isConnected) {
      setTransactionStatus("Please connect your wallet.");
      return;
    }

    try {
      setTransactionStatus("Preparing transaction...");
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey as PublicKey,
          toPubkey: new PublicKey(toAddress),
          lamports: Number(amount) * LAMPORTS_PER_SOL,
        })
      );

      setTransactionStatus("Sending transaction...");
      const signature = await sendTransaction(transaction, connection);
      setTransactionSignature(signature);
      const latestBlockhash = await connection.getLatestBlockhash();
      setTransactionStatus("Transaction sent. Waiting for confirmation...");

      await connection.confirmTransaction(
        {
          signature,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        },
        "processed"
      );

      setTransactionStatus(`Transaction successful: ${signature}`);
    } catch (error) {
      setTransactionStatus(`Transaction failed: ${error.message}`);
    }
  };

  const explorerUrl = transactionSignature
    ? getSolanaExplorerLink("tx", transactionSignature, "devnet")
    : "";

  return (
    <>
      <div style={{ textAlign: "center", maxWidth: "400px", margin: "0 auto" }}>
        <h2>Wallet-Adapter Example</h2>
        {publicKey && (
          <div style={{ marginBottom: "20px" }}>
            <p style={{ fontSize: "1.5rem" }}>
              Balance: {balance !== null ? balance.toFixed(6) : "Loading..."}{" "}
              SOL
            </p>
          </div>
        )}
        <div style={{ marginBottom: "20px" }}>
          <BaseInput
            type="text"
            placeholder="Amount (in SOL) to send:"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <BaseInput
            type="text"
            placeholder="Send SOL to:"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
          />
        </div>
        <div className={styles.buttonContainer}>
          <BaseButton onClick={sendTransactionHandler}>Send</BaseButton>
        </div>
      </div>
      {transactionStatus && (
        <p
          style={{
            textAlign: "center",
            maxWidth: "700px",
            margin: "0 auto",
            fontSize: "0.8rem",
          }}
        >
          {transactionSignature ? (
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white" }}
            >
              {transactionStatus} - View on Solana Explorer
            </a>
          ) : (
            transactionStatus
          )}
        </p>
      )}
    </>
  );
};

export default TransferForm;
