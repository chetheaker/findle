
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, Transaction, SystemProgram, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useCallback } from 'react';
import { nftMintReq } from '../../services/FireStore';
import './MintButton.css';

type MintButtonProps = {
  uid: string;
  userImageUrl: string;
  userPrompt: string;
};

function MintButton ( { uid, userImageUrl, userPrompt }: MintButtonProps ) {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const connection = new Connection(String(process.env.REACT_APP_CLUSTER_URL));
  const { publicKey, sendTransaction } = useWallet();

  const onClick = useCallback( async () => {

    if (!publicKey) throw new WalletNotConnectedError();
    connection.getBalance(publicKey).then((bal: number) => {
      console.log(bal/LAMPORTS_PER_SOL);
    });

    let lamportsI = LAMPORTS_PER_SOL*Number(process.env.REACT_APP_MINT_COST);
    console.log(publicKey.toBase58());
    console.log("lamports sending: {}", lamportsI)
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey(String(process.env.REACT_APP_MASTER_WALLET)),
            lamports: lamportsI,
        })
    );

    const signature = await sendTransaction(transaction, connection);
    await connection.confirmTransaction(signature, 'processed');

    nftMintReq( String(userImageUrl), String(userPrompt), String(publicKey.toBase58()), String(uid))

  }, [connection, publicKey, sendTransaction, uid, userImageUrl, userPrompt]);

  return (
    <button className="mint-button" onClick={onClick}>MINT YOUR NFT</button>
  );
};

export default MintButton;