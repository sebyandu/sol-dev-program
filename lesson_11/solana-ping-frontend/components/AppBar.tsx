import { FC } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import dynamic from "next/dynamic";

const ReactUIWalletDisconnectButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletDisconnectButton,
  { ssr: false }
);
const ReactUIWalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
); 

export const AppBar: FC = () => {
  return (
    <div className={styles.AppHeader}>
      <Image src="/solanaLogo.png" height={30} width={200} alt="Solana Logo"/>
      <span>Wallet-Adapter Example</span>
      <ReactUIWalletMultiButtonDynamic />
    </div>
  );
};

