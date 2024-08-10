import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import React, { FC, useMemo } from "react";

import * as web3 from "@solana/web3.js";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

interface WalletContextProviderProps {
  children: React.ReactNode;
}

require("@solana/wallet-adapter-react-ui/styles.css");

export const WalletContextProvider: FC<WalletContextProviderProps> = ({
  children,
}) => {
  const endpoint = web3.clusterApiUrl("devnet");
  const wallets = useMemo(() => [], []);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
