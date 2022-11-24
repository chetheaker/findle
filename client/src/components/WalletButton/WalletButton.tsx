import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Connection } from '@solana/web3.js';
import { useEffect, useState } from "react";
import './WalletButton.css';

const WalletButton = () => {
  
  const wallet = useAnchorWallet();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const connection = new Connection(String(process.env.REACT_APP_CLUSTER_URL));
  const [balance, setBalance] = useState<number>(-1)
  //let balance : number = 0;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(wallet)
    try {
      const getBalance = async () => {
        const userPubKey = wallet? wallet.publicKey! : undefined;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        let balanceRes = userPubKey ? await connection.getBalance(userPubKey) : -1;
        balanceRes = Math.floor((balanceRes/1000000000)*100)/100; // 1 billion lamports to 1 SOL (2 decimals)
        setBalance(balanceRes)
        // console.log('SOL', balance);
      };
      getBalance();
    } catch (error) {
      console.log(error)
    }

  }, [balance, connection, wallet]);

  return (
    <div className="btnContainer" >
      <WalletMultiButton/>
      { balance >= 0 && <div className="userBalance">{balance} SOL</div> }
    </div>  
  );
};

export default WalletButton;