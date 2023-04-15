import React from "react";
import cn from "cnz";
import Confetti from "../components/confetti";
import Events from "../components/events";
import Friends from "../components/friends";
import ChatBox from "../components/chatbox";
import { Inter, Sora, Gloria_Hallelujah as Gloria, Rubik_80s_Fade as Rubik } from "next/font/google";
import MetaMaskCard from "../components/MetaMaskCard";
import Provider from "../components/Provider";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
const zora = Sora({ subsets: ["latin"] });
const gloria = Gloria({ subsets: ["latin"], weight:["400"] });
const rubik = Rubik({ subsets: ["latin"], weight:["400"] });

export default function StakeChat() {
  return (
    <div>
      <Head>
        <title>I am here.</title>
      </Head>
      <div className="container mx-auto">
        <Confetti />
        <div className="header grid h-screen place-items-center">
          <h1 className={cn("text-5xl", gloria.className)}>I AM HERE.</h1>
          <MetaMaskCard />
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
        <Provider>
          <ChatBox />
        </Provider>
      </div>
    </div>
  );
}