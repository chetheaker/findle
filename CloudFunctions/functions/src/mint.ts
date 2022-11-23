/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import axios from 'axios';
import sendToken from "./sendToken";
import {Buffer} from 'buffer';
import {Connection, Keypair, PublicKey} from '@solana/web3.js';
import {Metaplex, keypairIdentity, bundlrStorage, toMetaplexFile, toBigNumber} from '@metaplex-foundation/js';
//import * as fs from 'fs';

const secret = [4, 58, 161, 182, 185, 42, 208, 25, 189, 53, 91, 18, 153, 38, 17, 208, 238, 252, 229, 74, 113, 124, 184, 22, 20, 41, 112, 222, 103, 36, 4, 53, 7, 84, 97, 87, 88, 109, 49, 183, 87, 144, 123, 212, 59, 189, 34, 81, 164, 130, 35, 91, 112, 78, 166, 194, 211, 87, 193, 242, 219, 255, 178, 193];


const QUICKNODE_RPC = 'https://warmhearted-winter-river.solana-devnet.discover.quiknode.pro/f0a750831d453a3e404bfcd2017bbe0f601242a3/';
const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);

const WALLET = Keypair.fromSecretKey(new Uint8Array(secret));

const METAPLEX = Metaplex.make(SOLANA_CONNECTION)
    .use(keypairIdentity(WALLET))
    .use(bundlrStorage({
      address: 'https://devnet.bundlr.network',
      providerUrl: QUICKNODE_RPC,
      timeout: 60000,
    }));

const CONFIG = {
  uploadPath: './img.png',
  imgFileName: 'img.png',
  imgType: 'image/png',
  imgName: 'trinity',
  //description: 'Solucky token to play in https://www.soluckygames.com',
  attributes: [
    {trait_type: 'DATE', value: String(Date.now())},
    // {trait_type: 'VALUE', value: '1 SOL'},
    // {trait_type: 'WEBSITE', value: 'https://soluckygames.com'},
    // {trait_type: 'TWITTER', value: 'https://www.twitter.com/solucky__games'},
  ],
  sellerFeeBasisPoints: 500, // 500 bp = 5%
  symbol: 'TRINITY',
  creators: [
    {address: WALLET.publicKey, share: 100},
  ],
};

async function uploadImage(filePath: string,fileName: string) {
  console.log(`Step 1 - Uploading Image`);
  const { data } = await axios.get(filePath, { responseType: "arraybuffer", });
  const imgBuffer = Buffer.from(data);
  const imgMetaplexFile = toMetaplexFile(imgBuffer, fileName);
  const imgUri = await METAPLEX.storage().upload(imgMetaplexFile);
  return imgUri
}

async function uploadMetadata(imgUri: any, imgType: string, nftName: string, description: string, attributes: {trait_type: string, value: string}[]) {
  console.log(`Step 2 - Uploading Metadata`);
  const {uri} = await METAPLEX
      .nfts()
      .uploadMetadata({
        name: nftName,
        description: description,
        image: imgUri,
        attributes: attributes,
        properties: {
          files: [
            {
              type: imgType,
              uri: imgUri,
            },
          ],
        },
      });
  return uri;
}

async function mintNft(metadataUri: string, name: string, sellerFee: number, symbol: string, creators: {address: PublicKey, share: number}[]) {
  console.log(`Step 3 - Minting NFT`);
  const {nft} = await METAPLEX
      .nfts()
      .create({
        uri: metadataUri,
        name: name,
        sellerFeeBasisPoints: sellerFee,
        symbol: symbol,
        creators: creators,
        isMutable: false,
        maxSupply: toBigNumber(1),
      });
  console.log(`   Success!🎉`);
  console.log(`   Minted NFT: https://explorer.solana.com/address/${nft.address}?cluster=devnet`);
  return nft;
}

export default async function mintFN(input: any) {
  console.log(`Minting ${CONFIG.imgName} to an NFT in Wallet ${WALLET.publicKey.toBase58()}.`);
  // Step 1 - Upload Image
  const imgUri = await uploadImage(input.url, CONFIG.imgName);
  // Step 2 - Upload Metadata
  const metadataUri = await uploadMetadata(imgUri, CONFIG.imgType, CONFIG.imgName, input.prompt, CONFIG.attributes);
  // Step 3 - Mint NFT
  const res = await mintNft(metadataUri, CONFIG.imgName, CONFIG.sellerFeeBasisPoints, CONFIG.symbol, CONFIG.creators);
  console.log("res:", res);
  // Step 4 - Send token to client
  console.log("input.wallet:", input.wallet)
  console.log("HEREEEEE, res.addres:", res.address)
  await sendToken(String(input.wallet), String(res.address))
  return true;
}
