import { getOrCreateAssociatedTokenAccount, createTransferInstruction } from "@solana/spl-token";
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";
​//import { secret } from './keypair';

const secret = [4, 58, 161, 182, 185, 42, 208, 25, 189, 53, 91, 18, 153, 38, 17, 208, 238, 252, 229, 74, 113, 124, 184, 22, 20, 41, 112, 222, 103, 36, 4, 53, 7, 84, 97, 87, 88, 109, 49, 183, 87, 144, 123, 212, 59, 189, 34, 81, 164, 130, 35, 91, 112, 78, 166, 194, 211, 87, 193, 242, 219, 255, 178, 193];

// const QUICKNODE_RPC = process.env.QUICKNODE_URL
const QUICKNODE_URL = "https://dry-nameless-moon.solana-mainnet.discover.quiknode.pro/f61fa4c0c62f358f4b77346ad4faa84f8742ed73/"
const SOLANA_CONNECTION = new Connection(QUICKNODE_URL);
​
const WALLET = Keypair.fromSecretKey(new Uint8Array(secret));
const TRANSFER_AMOUNT = 1;
​
async function sendToken( destination: string, token: any ) {
​
  console.log(`Sending ${TRANSFER_AMOUNT} ${(token)} from ${(WALLET.publicKey.toString())} to ${(destination)}.`)
  
  //Step 1
  console.log(`1 - Getting Source Token Account`);
  let sourceAccount = await getOrCreateAssociatedTokenAccount(
      SOLANA_CONNECTION, 
      WALLET,
      new PublicKey(token),
      WALLET.publicKey
  );
  console.log(`    Source Account: ${sourceAccount.address.toString()}`);
​
  //Step 2
  console.log(`2 - Getting Destination Token Account`);
  let destinationAccount: any;
  try {
        destinationAccount = await getOrCreateAssociatedTokenAccount(
        SOLANA_CONNECTION, 
        WALLET,
        new PublicKey(token),
        new PublicKey(destination)
    );
    console.log(`    Destination Account: ${destinationAccount.address.toString()}`);
    
  } catch (error) {
    console.log(error)
  }
​
  //Step 3
  console.log(`3 - Fetching Number of Decimals for Mint: ${token}`);
  const numberDecimals = 0;// await getNumberDecimals(MINT_ADDRESS);
  console.log(`    Number of Decimals: ${numberDecimals}`);
​
  //Step 4
  console.log(`4 - Creating and Sending Transaction`);
  const tx = new Transaction();
  tx.add(createTransferInstruction(
      sourceAccount.address,
      destinationAccount.address,
      WALLET.publicKey,
      TRANSFER_AMOUNT * Math.pow(10, numberDecimals)
  ))
​
  const latestBlockHash = await SOLANA_CONNECTION.getLatestBlockhash('confirmed');
  tx.recentBlockhash = latestBlockHash.blockhash;    
  const signature = await sendAndConfirmTransaction(SOLANA_CONNECTION,tx,[WALLET]);
  console.log(
      '\x1b[32m', //Green Text
      `   Transaction Success!🎉`,
      `\n    https://explorer.solana.com/tx/${signature}?cluster=${process.env.NET}`
  );
​
}
​
export default sendToken;