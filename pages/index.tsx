import React from "react";
import cn from "cnz";
import Confetti from "../components/confetti";
import Events from "../components/events";
import Friends from "../components/friends";
import ChatBox from "../components/chatbox";
import { Inter, Sora, Gloria_Hallelujah as Gloria, Rubik_80s_Fade as Rubik } from "next/font/google";
import Head from "next/head";
import * as PushAPI from "@pushprotocol/restapi";
import { useWeb3React } from "@web3-react/core";

const inter = Inter({ subsets: ["latin"] });
const zora = Sora({ subsets: ["latin"] });
const gloria = Gloria({ subsets: ["latin"], weight:["400"] });
const rubik = Rubik({ subsets: ["latin"], weight:["400"] });

export function StakeChat() {
  return (
    <div>
      <Head>
        <title>I am here.</title>
      </Head>
      <div className="container mx-auto">
        <Confetti />
        <div className="header grid h-screen place-items-center">
          <h1 className={cn("text-5xl", gloria.className)}>I AM HERE.</h1>
        </div>
        <div className="header grid h-screen place-items-center">
          <h1 className={cn("text-5xl", gloria.className)}>Lisbon</h1>
        </div>
        <div className="header grid h-screen place-items-center">
          <h1 className={cn("text-5xl", gloria.className)}>Friends</h1>
          <div>
            <Friends />
          </div>
        </div>
        <div className="header grid h-screen place-items-center">
          <h1 className={cn("text-5xl", gloria.className)}>Events</h1>
          <div>
            <Events />
          </div>
        </div>
      </div>
      <div className="chat-container inter">
       <ChatBox />
      </div>
    </div>
  );
}

export default async function Page() {

  const { account, library, chainId } = useWeb3React();
  const signer = library.getSigner(account);

  // pre-requisite API calls that should be made before
  // need to get user and through that encryptedPvtKey of the user
  // @ts-ignore: Unreachable code error
  const user = await PushAPI.user.get({
    account: "eip155:0xFe6C8E9e25f7bcF374412c5C81B2578aC473C0F7",
  });

  // need to decrypt the encryptedPvtKey to pass in the api using helper function
  // @ts-ignore: Unreachable code error
  const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
    // @ts-ignore: Unreachable code error
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    // @ts-ignore: Unreachable code error
    signer: _signer,
  });

  // actual api
  // @ts-ignore: Unreachable code error
  const response = await PushAPI.chat.createGroup({
    groupName: "Push Group Chat 3",
    groupDescription: "This is the oficial group for Push Protocol",
    members: [
      "0x9e60c47edF21fa5e5Af33347680B3971F2FfD464",
      "0x3829E53A15856d1846e1b52d3Bdf5839705c29e5",
    ],
    groupImage: "",
    admins: ["0x3829E53A15856d1846e1b52d3Bdf5839705c29e5"],
    isPublic: true,
    account: "0xD993eb61B8843439A23741C0A3b5138763aE11a4",
    pgpPrivateKey: pgpDecryptedPvtKey, //decrypted private key
  });

  return (
    <>
      <StakeChat />
    </>
  );
}