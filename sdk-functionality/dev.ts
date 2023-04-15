import * as PushAPI from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { createSocketConnection, EVENTS } from "@pushprotocol/socket";
import * as dotenv from "dotenv";
import { ethers } from "ethers";
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { initChain } from "./todo";
dotenv.config();
const selfAddress = "0xFfEa14430490eDB32Ed08828B2C237888972095b";
// CONFIGS
const env = process.env.PUSH_NODE_NETWORK as any; // choose ENV.STAGING or ENV.PROD
const showAPIResponse = process.env.SHOW_API_RESPONSE === "true" ? true : false; // choose to show or hide API responses

// If you own a channel, you can use your channel address as well
const channelPrivateKey: string = process.env.WALLET_PRIVATE_KEY!;
const signerChannel = new ethers.Wallet(`0x${channelPrivateKey}`);
const channelAddress = signerChannel.address;

// Addresses that will be used to
const signer = new ethers.Wallet(`0x${channelPrivateKey}`);

const main = async () => {
  // get user and derive encrypted PGP key
  const user = await PushAPI.user.get({
    account: `eip155:${signer.address}`,
    env: env,
  });

  // decrypt the PGP Key
  const pgpKey = await PushAPI.chat.decryptPGPKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    // @ts-ignore
    signer: signer,
  });

  let lastTimestamp = 0;
  let chain = await initChain();
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Checking for new messages...");

    const latestMessage = await PushAPI.chat.chats({
      account: `eip155:${signer.address}`,
      pgpPrivateKey: pgpKey,
      toDecrypt: true,
      env: env,
    });
    console.log(
      latestMessage["0"].msg?.timestamp,
      (latestMessage?.["0"]?.msg?.timestamp || 0) > lastTimestamp
    );
    if ((latestMessage?.["0"]?.msg?.timestamp || 0) > lastTimestamp) {
      if (latestMessage?.["0"]?.msg?.timestamp) {
        lastTimestamp = latestMessage["0"].msg.timestamp;
        const msg = latestMessage["0"].msg.messageContent;
        const sender = latestMessage["0"].msg.fromDID;
        const senderAddress = sender.slice(7, 54);
        if (senderAddress === selfAddress) {
          console.log("Skipping self message");
          continue;
        }
        console.log(`New message from ${sender}: ${msg}`);
        const response = await chain.run(msg);
        console.log("response");
        console.log(response);
        const sentMessage = await PushAPI.chat.send({
          messageContent: response,
          messageType: "Text", // can be "Text" | "Image" | "File" | "GIF"
          receiverAddress: sender,
          // @ts-ignore
          signer: signer,
          pgpPrivateKey: pgpKey,
          env: env,
        });

        console.log(latestMessage["0"].msg.messageContent);
      }
    }
  }
};
main();
