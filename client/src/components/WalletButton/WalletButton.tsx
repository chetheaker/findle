import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Connection } from '@solana/web3.js';
import { useEffect } from "react";
import './WalletButton.css';

const WalletButton = () => {

  const wallet = useAnchorWallet();
  const connection = new Connection(String(process.env.REACT_APP_CLUSTER_URL));

  let balance : number = 1;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getBalance = async () => {
      const userPubKey = wallet?.publicKey!;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      balance = await connection.getBalance(userPubKey);
      balance = Math.floor((balance/1000000000)*100)/100; // 1 billion lamports to 1 SOL (2 decimals)
      console.log('SOL', balance);
    };
    getBalance();

  }, []);


  return (
    <div className="btnContainer" >
      <WalletMultiButton/>
      { balance > 0 && <div className="userBalance">{balance} SOL</div> }
    </div>  
  );
};

export default WalletButton;