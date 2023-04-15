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
dotenv.config();

// CONFIGS
const env = process.env.PUSH_NODE_NETWORK as any; // choose ENV.STAGING or ENV.PROD
const showAPIResponse = process.env.SHOW_API_RESPONSE === "true" ? true : false; // choose to show or hide API responses

// If you own a channel, you can use your channel address as well
const channelPrivateKey: string = process.env.WALLET_PRIVATE_KEY!;
const signerChannel = new ethers.Wallet(`0x${channelPrivateKey}`);
const channelAddress = signerChannel.address;

// Addresses that will be used to
const signer = new ethers.Wallet(`0x${channelPrivateKey}`);
const signerSecondAccount = ethers.Wallet.createRandom();
const receiver = "0x3A6666e9d8fc42d903807EF35c713527223b1ce3";
// generate some dummy wallets as well
const randomWallet1 = ethers.Wallet.createRandom().address;
const randomWallet2 = ethers.Wallet.createRandom().address;
const randomWallet3 = ethers.Wallet.createRandom().address;

// Group Chat Data
const groupName = uniqueNamesGenerator({
  dictionaries: [adjectives, colors, animals],
});
const groupDescription = uniqueNamesGenerator({
  dictionaries: [adjectives, colors, animals],
});
const groupImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAvklEQVR4AcXBsW2FMBiF0Y8r3GQb6jeBxRauYRpo4yGQkMd4A7kg7Z/GUfSKe8703fKDkTATZsJsrr0RlZSJ9r4RLayMvLmJjnQS1d6IhJkwE2bT13U/DBzp5BN73xgRZsJMmM1HOolqb/yWiWpvjJSUiRZWopIykTATZsJs5g+1N6KSMiO1N/5DmAkzYTa9Lh6MhJkwE2ZzSZlo7xvRwson3txERzqJhJkwE2bT6+JhoKTMJ2pvjAgzYSbMfgDlXixqjH6gRgAAAABJRU5ErkJggg==";

// Push Notification - Run Notifications Use cases
async function runNotificaitonsUseCases() {
  console.log(`
  ███    ██  ██████  ████████ ██ ███████ ██  ██████  █████  ████████ ██  ██████  ███    ██ ███████ 
  ████   ██ ██    ██    ██    ██ ██      ██ ██      ██   ██    ██    ██ ██    ██ ████   ██ ██      
  ██ ██  ██ ██    ██    ██    ██ █████   ██ ██      ███████    ██    ██ ██    ██ ██ ██  ██ ███████ 
  ██  ██ ██ ██    ██    ██    ██ ██      ██ ██      ██   ██    ██    ██ ██    ██ ██  ██ ██      ██ 
  ██   ████  ██████     ██    ██ ██      ██  ██████ ██   ██    ██    ██  ██████  ██   ████ ███████ 
`);
  console.log("PushAPI.user.getFeeds");
  await PushAPI_user_getFeeds();

  // IMPORTANT: VARIOUS OTHER NOTIFICATIONS FORMAT SUPPORTED
  // EXAMPLES HERE: https://github.com/ethereum-push-notification-service/push-sdk/blob/main/packages/restapi/README.md
  console.log(
    "PushAPI.payloads.sendNotification() [Direct Payload, Single Recipient]"
  );
  await PushAPI_payloads_sendNotification__direct_payload_single_recipient();

  console.log(
    "PushAPI.payloads.sendNotification() [Direct Payload, Batch of Recipients (Subset)]"
  );
  await PushAPI_payloads_sendNotification__direct_payload_group_of_recipient_subset();

  console.log(
    "PushAPI.payloads.sendNotification() [Direct Payload, All Recipients (Broadcast)]"
  );
  await PushAPI_payloads_sendNotification__direct_payload_all_recipients_brodcast();

  console.log("PushAPI.channels._getSubscribers()");
  await PushAPI_channels_getSubscribers();

  console.log("Push Notification - PushSDKSocket()");
  await PushSDKSocket();
}

// Push Notification - PushAPI.user.getFeeds
async function PushAPI_user_getFeeds(silent: boolean = !showAPIResponse) {
  const notifications = await PushAPI.user.getFeeds({
    user: `eip155:5:${signer.address}`, // user address in CAIP
    env: env,
  });

  console.log("PushAPI.user.getFeeds | Response - 200 OK");
  if (!silent) {
    console.log(notifications);
  }
}

// Push Notification - PushAPI.user.getFeeds - Spam
async function PushAPI_user_getFeeds__spam(silent: boolean = !showAPIResponse) {
  const notifications = await PushAPI.user.getFeeds({
    user: `eip155:5:${signer.address}`, // user address in CAIP
    spam: true,
    env: env,
  });

  console.log("PushAPI.user.getFeeds [Spam] | Response - 200 OK");
  if (!silent) {
    console.log(notifications);
  }
}

// Push Notification - Send Notifications
// Direct payload for single recipient(target)
// PushAPI.payloads.sendNotification
async function PushAPI_payloads_sendNotification__direct_payload_single_recipient(
  silent: boolean = !showAPIResponse
) {
  const apiResponse = await PushAPI.payloads.sendNotification({
    signer: signerChannel,
    type: 3,
    identityType: 2,
    notification: {
      title: `notification TITLE:`,
      body: `notification BODY`,
    },
    payload: {
      title: `payload title`,
      body: `sample msg body`,
      cta: "",
      img: "",
    },
    recipients: `eip155:5:${signer.address}`,
    channel: `eip155:5:${signerChannel.address}`,
    env: env,
    senderType: 0,
  });

  console.log("PushAPI.payloads.sendNotification | Response - 204 OK");
  if (!silent) {
    console.log(apiResponse);
  }
}

// Push Notification - Direct payload for group of recipients(subset)
// PushAPI.payloads.sendNotification
async function PushAPI_payloads_sendNotification__direct_payload_group_of_recipient_subset(
  silent: boolean = !showAPIResponse
) {
  const apiResponse = await PushAPI.payloads.sendNotification({
    signer: signerChannel,
    type: 4,
    identityType: 2,
    notification: {
      title: `notification TITLE:`,
      body: `notification BODY`,
    },
    payload: {
      title: `payload title`,
      body: `sample msg body`,
      cta: "",
      img: "",
    },
    recipients: [
      `eip155:5:${signer.address}`,
      `eip155:5:${signerSecondAccount.address}`,
    ],
    channel: `eip155:5:${signerChannel.address}`,
    env: env,
    senderType: 0,
  });

  console.log("PushAPI.payloads.sendNotification | Response - 204 OK");
  if (!silent) {
    console.log(apiResponse);
  }
}

// Push Notification - Direct payload for all recipients(broadcast)
// PushAPI.payloads.sendNotification
async function PushAPI_payloads_sendNotification__direct_payload_all_recipients_brodcast(
  silent: boolean = !showAPIResponse
) {
  const apiResponse = await PushAPI.payloads.sendNotification({
    signer: signerChannel,
    type: 1,
    identityType: 2,
    notification: {
      title: `notification TITLE:`,
      body: `notification BODY`,
    },
    payload: {
      title: `payload title`,
      body: `sample msg body`,
      cta: "",
      img: "",
    },
    channel: `eip155:5:${signerChannel.address}`,
    env: env,
    senderType: 0,
  });

  console.log("PushAPI.payloads.sendNotification | Response - 204 OK");
  if (!silent) {
    console.log(apiResponse);
  }
}

// Push Notification - Get Subscribers list from channels (DEPRECATED)
async function PushAPI_channels_getSubscribers(
  silent: boolean = !showAPIResponse
) {
  const subscribers = await PushAPI.channels._getSubscribers({
    channel: `eip155:5:${channelAddress}`, // channel address in CAIP
    env: env,
  });

  console.log("PushAPI.channels._getSubscribers | Response - 200 OK");
  if (!silent) {
    console.log(subscribers);
  }
}

// Push Notification - Socket Connection
async function PushSDKSocket(silent: boolean = !showAPIResponse) {
  const pushSDKSocket = createSocketConnection({
    user: `eip155:5:${signer.address}`, // CAIP, see below
    socketOptions: { autoConnect: false },
    env: env,
  });

  if (!pushSDKSocket) {
    throw new Error("PushSDKSocket | Socket Connection Failed");
  }

  pushSDKSocket.connect();

  pushSDKSocket.on(EVENTS.CONNECT, async () => {
    console.log("Socket Connected - will disconnect after 4 seconds");

    // send a notification to see the result
    await PushAPI_payloads_sendNotification__direct_payload_single_recipient(
      true
    );
  });

  pushSDKSocket.on(EVENTS.DISCONNECT, () => {
    console.log("Socket Disconnected");
  });

  pushSDKSocket.on(EVENTS.USER_FEEDS, (feedItem) => {
    // feedItem is the notification data when that notification was received
    console.log("Incoming Feed from Socket");
    if (!silent) {
      console.log(feedItem);
    }

    // disconnect socket after this, not to be done in real implementations
    pushSDKSocket.disconnect();
  });

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  await delay(4000);
}

// Push Chat - Run Chat Use cases
async function runChatUseCases() {
  console.log(`
  ██████  ██   ██  █████  ████████ 
  ██      ██   ██ ██   ██    ██    
  ██      ███████ ███████    ██    
  ██      ██   ██ ██   ██    ██    
  ██████  ██   ██ ██   ██    ██    
`);
  console.log("PushAPI.user.create");
  try {
    await PushAPI_user_create();
  } catch (e) {
    console.log("User already created");
  }

  console.log("PushAPI.user.get");
  await PushAPI_user_get();

  console.log("PushAPI_chat_decryptPGPKey");
  await PushAPI_chat_decryptPGPKey();

  console.log("PushAPI.chat.chats");
  await PushAPI_chat_chats();

  console.log("PushAPI.chat.requests");
  await PushAPI_chat_requests();

  console.log("PushAPI.chat.send");
  await PushAPI_chat_send();

  console.log("PushAPI.chat.approve");
  await PushAPI_chat_approve();

  console.log("PushAPI.chat.createGroup");
  const chatId = await PushAPI_chat_createGroup();

  console.log("PushAPI.chat.conversationHash");
  await PushAPI_chat_conversationHash();

  console.log("PushAPI_chat_history");
  await PushAPI_chat_history();

  console.log("PushAPI.chat.latest");
  await PushAPI_chat_latest();

  console.log("PushAPI.chat.updateGroup");
  await PushAPI_chat_updateGroup(chatId);

  console.log("PushAPI.chat.getGroupByName");
  await PushAPI_chat_getGroupByName();

  console.log("PushAPI.chat.getGroup");
  await PushAPI_chat_getGroup();

  console.log("PushAPI.chat.decryptConversation");
  await PushAPI_chat_decryptConversation();

  console.log("Push Chat - PushSDKSocket()");
  await PushChatSDKSocket();
}

// Push Chat - PushAPI.user.create
async function PushAPI_user_create(silent: boolean = !showAPIResponse) {
  const user = await PushAPI.user.create({
    // @ts-ignore
    signer: signer,
    env: env,
  });

  const user_2 = await PushAPI.user.create({
    // @ts-ignore
    signer: signerSecondAccount,
    env: env,
  });

  console.log("PushAPI_user_create | Response - 200 OK");
  if (!silent) {
    console.log(user);
    console.log(user_2);
  }

  return user;
}

// Push Chat - PushAPI.user.get
async function PushAPI_user_get(silent: boolean = !showAPIResponse) {
  const user = await PushAPI.user.get({
    account: `eip155:${signer.address}`,
    env: env,
  });

  console.log("PushAPI_user_get | Response - 200 OK");

  if (!silent) {
    console.log(user);
  }
}

// Push Chat - PushAPI.chat.decryptPGPKey
async function PushAPI_chat_decryptPGPKey(silent: boolean = !showAPIResponse) {
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

  console.log("PushAPI_chat_decryptPGPKey | Response - 200 OK");
  if (!silent) {
    console.log(pgpKey);
  }
}

// Push Chat - PushAPI.chat.chats
async function PushAPI_chat_chats(silent: boolean = !showAPIResponse) {
  // Fetch user
  const user = await PushAPI.user.get({
    account: `eip155:${signer.address}`,
    env: env,
  });

  // Decrypt PGP Key
  const pgpDecrpyptedPvtKey = await PushAPI.chat.decryptPGPKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    // @ts-ignore
    signer: signer,
  });

  // Actual api
  const response = await PushAPI.chat.chats({
    account: `eip155:${signer.address}`,
    toDecrypt: true,
    pgpPrivateKey: pgpDecrpyptedPvtKey,
    env: env,
  });

  console.log("PushAPI_chat_chats | Response - 200 OK");
  if (!silent) {
    console.log(response);
  }
}

// Push Chat - PushAPI.chat.requests
async function PushAPI_chat_requests(silent: boolean = !showAPIResponse) {
  // Fetch user
  const user = await PushAPI.user.get({
    account: `eip155:${signer.address}`,
    env: env,
  });

  // Decrypt PGP Key
  const pgpDecrpyptedPvtKey = await PushAPI.chat.decryptPGPKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    // @ts-ignore
    signer: signer,
  });

  // Actual api
  const response = await PushAPI.chat.requests({
    account: `eip155:${signer.address}`,
    toDecrypt: true,
    pgpPrivateKey: pgpDecrpyptedPvtKey,
    env: env,
  });

  console.log("PushAPI_chat_requests | Response - 200 OK");
  if (!silent) {
    console.log(response);
  }
}

// Push Chat - PushAPI.chat.conversationHash
async function PushAPI_chat_conversationHash(
  silent: boolean = !showAPIResponse
) {
  // conversation hash are also called link inside chat messages
  const conversationHash = await PushAPI.chat.conversationHash({
    account: `eip155:${signer.address}`,
    conversationId: `eip155:${signerSecondAccount.address}`, // 2nd address
    env: env,
  });

  console.log("PushAPI_chat_conversationHash | Response - 200 OK");
  if (!silent) {
    console.log(conversationHash);
  }
}

// Push Chat - PushAPI.chat.latest
async function PushAPI_chat_latest(silent: boolean = !showAPIResponse) {
  // Fetch user
  const user = await PushAPI.user.get({
    account: `eip155:${signer.address}`,
    env: env,
  });

  // Decrypt PGP Key
  const pgpDecrpyptedPvtKey = await PushAPI.chat.decryptPGPKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    // @ts-ignore
    signer: signer,
  });

  // Fetch conversation hash
  // conversation hash are also called link inside chat messages
  const conversationHash = await PushAPI.chat.conversationHash({
    account: `eip155:${signer.address}`,
    conversationId: `eip155:${signerSecondAccount.address}`, // 2nd address
    env: env,
  });

  // Actual API
  const response = await PushAPI.chat.latest({
    // @ts-ignore
    threadhash: conversationHash.threadHash, // get conversation hash from conversationHash function and send the response threadhash here
    account: `eip155:${signer.address}`,
    toDecrypt: true,
    pgpPrivateKey: pgpDecrpyptedPvtKey,
    env: env,
  });

  console.log("PushAPI_chat_latest | Response - 200 OK");
  if (!silent) {
    console.log(response);
  }
}

// Push Chat - PushAPI.chat.history
async function PushAPI_chat_history(silent: boolean = !showAPIResponse) {
  // Fetch user
  const user = await PushAPI.user.get({
    account: `eip155:${signer.address}`,
    env: env,
  });

  // Decrypt PGP Key
  const pgpDecrpyptedPvtKey = await PushAPI.chat.decryptPGPKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    // @ts-ignore
    signer: signer,
  });

  // Fetch conversation hash
  // conversation hash are also called link inside chat messages
  const conversationHash = await PushAPI.chat.conversationHash({
    account: `eip155:${signer.address}`,
    conversationId: `eip155:${receiver}`, // 2nd address
    env: env,
  });

  // Actual API
  const response = await PushAPI.chat.history({
    // @ts-ignore
    threadhash: conversationHash.threadHash, // get conversation hash from conversationHash function and send the response threadhash here
    account: `eip155:${signer.address}`,
    limit: 2,
    toDecrypt: true,
    pgpPrivateKey: pgpDecrpyptedPvtKey,
    env: env,
  });

  console.log("PushAPI_chat_history | Response - 200 OK");
  if (!silent) {
    console.log(response);
  }
}

// Push Chat - PushAPI.chat.send
// // Will send a message to the user or chat request in case user hasn't approved them
async function PushAPI_chat_send(silent: boolean = !showAPIResponse) {
  // Fetch user
  const user = await PushAPI.user.get({
    account: `eip155:${signer.address}`,
    env: env,
  });

  // Decrypt PGP Key
  const pgpDecrpyptedPvtKey = await PushAPI.chat.decryptPGPKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    // @ts-ignore
    signer: signer,
  });

  // Actual api
  const response = await PushAPI.chat.send({
    messageContent: "Gm gm! It's me... Mario",
    messageType: "Text", // can be "Text" | "Image" | "File" | "GIF"
    receiverAddress: receiver,
    // @ts-ignore
    signer: signer,
    pgpPrivateKey: pgpDecrpyptedPvtKey,
    env: env,
  });

  console.log("PushAPI_chat_send | Response - 200 OK");
  if (!silent) {
    console.log(response);
  }
}

// Push Chat - Approve
async function PushAPI_chat_approve(silent: boolean = !showAPIResponse) {
  // Fetch user
  const user = await PushAPI.user.get({
    account: `eip155:${signerSecondAccount.address}`,
    env: env,
  });

  // Decrypt PGP Key
  const pgpDecrpyptedPvtKey = await PushAPI.chat.decryptPGPKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    // @ts-ignore
    signer: signerSecondAccount,
  });

  // Actual api
  const approve = await PushAPI.chat.approve({
    status: "Approved",
    senderAddress: signer.address, // receiver's address or chatId of a group
    // @ts-ignore
    signer: signerSecondAccount,
    pgpPrivateKey: pgpDecrpyptedPvtKey,
    env: env,
  });

  console.log("PushAPI_chat_approve | Response - 200 OK");
  if (!silent) {
    console.log(approve);
  }
}

// Push Chat - PushAPI.chat.createGroup
async function PushAPI_chat_createGroup(
  silent: boolean = !showAPIResponse
): Promise<string> {
  // Fetch user
  const user = await PushAPI.user.get({
    account: `eip155:${signer.address}`,
    env: env,
  });

  // Decrypt PGP Key
  const pgpDecrpyptedPvtKey = await PushAPI.chat.decryptPGPKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    // @ts-ignore
    signer: signer,
  });

  // Actual API
  // Convert image to base 64 and pass
  const response = await PushAPI.chat.createGroup({
    groupName,
    groupDescription,
    members: [`eip155:${randomWallet1}`, `eip155:${randomWallet2}`],
    groupImage,
    admins: [], // takes signer as admin automatically, add more if you want to
    isPublic: true,
    // @ts-ignore
    signer: signer,
    pgpPrivateKey: pgpDecrpyptedPvtKey,
    env: env,
  });

  console.log("PushAPI_chat_createGroup | Response - 200 OK");
  if (!silent) {
    console.log(response);
  }
  return response.chatId;
}

// Push Chat - PushAPI.chat.updateGroup
async function PushAPI_chat_updateGroup(
  chatId: string,
  silent: boolean = !showAPIResponse
) {
  // Fetch user
  const user = await PushAPI.user.get({
    account: `eip155:${signer.address}`,
    env: env,
  });

  // Decrypt PGP Key
  const pgpDecrpyptedPvtKey = await PushAPI.chat.decryptPGPKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    // @ts-ignore
    signer: signer,
  });

  // Actual API
  // Convert image to base 64 and pass
  // This is an idempotent operation, meaning it requires all group info to be passed no matter if only few things change
  // Why so? To ensure that verificationProof always is able to replicate the current group info (trustless since signature is stored with the info)
  const response = await PushAPI.chat.updateGroup({
    chatId,
    groupName,
    groupDescription,
    members: [
      `eip155:${randomWallet1}`,
      `eip155:${randomWallet2}`,
      `eip155:${randomWallet3}`,
      `eip155:${signer.address}`,
    ],
    groupImage,
    admins: [`eip155:${signer.address}`], // takes signer as admin automatically, add more if you want to
    // @ts-ignore
    signer: signer,
    pgpPrivateKey: pgpDecrpyptedPvtKey,
    env: env,
  });

  console.log("PushAPI_chat_updateGroup | Response - 200 OK");
  if (!silent) {
    console.log(response);
  }
}

// Push Chat - PushAPI.chat.getGroupByName
async function PushAPI_chat_getGroupByName(silent: boolean = !showAPIResponse) {
  const response = await PushAPI.chat.getGroupByName({
    groupName: "Push Group Chat 3",
    env: env,
  });

  console.log("PushAPI_chat_getGroupByName | Response - 200 OK");
  if (!silent) {
    console.log(response);
  }
}

// Push Chat - PushAPI.chat.getGroup
async function PushAPI_chat_getGroup(silent: boolean = !showAPIResponse) {
  const response = await PushAPI.chat.getGroup({
    chatId: "870cbb20f0b116d5e461a154dc723dc1485976e97f61a673259698aa7f48371c",
    env: env,
  });

  console.log("PushAPI_chat_getGroup | Response - 200 OK");
  if (!silent) {
    console.log(response);
  }
}

// Push Chat - PushAPI.chat.decryptConversation
async function PushAPI_chat_decryptConversation(
  silent: boolean = !showAPIResponse
) {
  // Fetch user
  const user = await PushAPI.user.get({
    account: `eip155:${signer.address}`,
    env: env,
  });

  // Decrypt PGP Key
  const pgpDecrpyptedPvtKey = await PushAPI.chat.decryptPGPKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    // @ts-ignore
    signer: signer,
  });

  // Fetch conversation hash
  // conversation hash are also called link inside chat messages
  const conversationHash = await PushAPI.chat.conversationHash({
    account: `eip155:${signer.address}`,
    conversationId: `eip155:${signerSecondAccount.address}`, // 2nd address
    env: env,
  });

  // Chat History
  const encryptedChats = await PushAPI.chat.history({
    // @ts-ignore
    threadhash: conversationHash.threadHash, // get conversation hash from conversationHash function and send the response threadhash here
    account: `eip155:${signer.address}`,
    limit: 5,
    toDecrypt: false,
    pgpPrivateKey: pgpDecrpyptedPvtKey,
    env: env,
  });

  // Decrypted Chat
  const decryptedChat = await PushAPI.chat.decryptConversation({
    messages: encryptedChats, // array of message object fetched from chat.history method
    connectedUser: user, // user meta data object fetched from chat.get method
    pgpPrivateKey: pgpDecrpyptedPvtKey, //decrypted private key
    env: env,
  });

  console.log("PushAPI_chat_decryptConversation | Response - 200 OK");
  if (!silent) {
    console.log(decryptedChat);
  }
}

// Push Chat - Socket Connection
async function PushChatSDKSocket(silent: boolean = !showAPIResponse) {
  const pushSDKSocket = createSocketConnection({
    user: `eip155:${signer.address}`,
    socketType: "chat",
    socketOptions: { autoConnect: true, reconnectionAttempts: 3 },
    env: env,
  });

  if (!pushSDKSocket) {
    throw new Error("Socket not connected");
  }

  pushSDKSocket.on(EVENTS.CONNECT, async () => {
    console.log("Socket Connected - will disconnect after 4 seconds");

    // send a chat from other wallet to this one to see the result
    // Fetch user
    const user = await PushAPI.user.get({
      account: `eip155:${signerSecondAccount.address}`,
      env: env,
    });

    // Decrypt PGP Key
    const pgpDecrpyptedPvtKey = await PushAPI.chat.decryptPGPKey({
      encryptedPGPPrivateKey: user.encryptedPrivateKey,
      // @ts-ignore
      signer: signerSecondAccount,
    });

    // Actual api
    const response = await PushAPI.chat.send({
      messageContent: "Gm gm! It's me... Mario",
      messageType: "Text",
      receiverAddress: `eip155:${signer.address}`,
      // @ts-ignore
      signer: signerSecondAccount,
      pgpPrivateKey: pgpDecrpyptedPvtKey,
      env: env,
    });
    console.log("PushAPI_chat_send | Response - 200 OK");
  });

  pushSDKSocket.on(EVENTS.DISCONNECT, () => {
    console.log("Socket Disconnected");
  });

  pushSDKSocket.on(EVENTS.CHAT_RECEIVED_MESSAGE, (message) => {
    // feedItem is the notification data when that notification was received
    console.log("Incoming Push Chat message from Socket");
    if (!silent) {
      console.log(message);
    }

    // disconnect socket after this, not to be done in real implementations
    pushSDKSocket.disconnect();
  });

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  await delay(4000);
}

// Use Cases
function start() {
  console.log(`${returnHeadingLog()}`);
  console.log(`${returnENVLog()}`);

  runNotificaitonsUseCases().then(() => {
    runChatUseCases();
  });
}

start();

// -----------
// -----------
// FUNCTION TO EMIT HEADER
// -----------
// -----------
function returnHeadingLog() {
  const headingLog = `
    ███████ ██████  ██   ██     ███████ ██    ██ ███    ██  ██████ ████████ ██  ██████  ███    ██  █████  ██      ██ ████████ ██    ██ 
    ██      ██   ██ ██  ██      ██      ██    ██ ████   ██ ██         ██    ██ ██    ██ ████   ██ ██   ██ ██      ██    ██     ██  ██  
    ███████ ██   ██ █████       █████   ██    ██ ██ ██  ██ ██         ██    ██ ██    ██ ██ ██  ██ ███████ ██      ██    ██      ████   
        ██ ██   ██ ██  ██      ██      ██    ██ ██  ██ ██ ██         ██    ██ ██    ██ ██  ██ ██ ██   ██ ██      ██    ██       ██    
    ███████ ██████  ██   ██     ██       ██████  ██   ████  ██████    ██    ██  ██████  ██   ████ ██   ██ ███████ ██    ██       ██    
  `;
  return headingLog;
}

function returnENVLog() {
  let environmentLog = `
    ███████ ████████  █████   ██████  ██ ███    ██  ██████  
    ██         ██    ██   ██ ██       ██ ████   ██ ██       
    ███████    ██    ███████ ██   ███ ██ ██ ██  ██ ██   ███ 
         ██    ██    ██   ██ ██    ██ ██ ██  ██ ██ ██    ██ 
    ███████    ██    ██   ██  ██████  ██ ██   ████  ██████  
  `;

  if (env === ENV.PROD) {
    environmentLog = `
      ██████  ██████   ██████  ██████  ██    ██  ██████ ████████ ██  ██████  ███    ██
      ██   ██ ██   ██ ██    ██ ██   ██ ██    ██ ██         ██    ██ ██    ██ ████   ██
      ██████  ██████  ██    ██ ██   ██ ██    ██ ██         ██    ██ ██    ██ ██ ██  ██
      ██      ██   ██ ██    ██ ██   ██ ██    ██ ██         ██    ██ ██    ██ ██  ██ ██
      ██      ██   ██  ██████  ██████   ██████   ██████    ██    ██  ██████  ██   ████
    `;
  } else if (env === ENV.DEV) {
    environmentLog = `
      ██████  ███████ ██    ██
      ██   ██ ██      ██    ██
      ██   ██ █████   ██    ██
      ██   ██ ██       ██  ██
      ██████  ███████   ████
    `;
  }

  return environmentLog;
}
