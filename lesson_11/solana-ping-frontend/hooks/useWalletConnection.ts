import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export const useWalletConnection = (): boolean => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    return !!connection && !!publicKey;
};