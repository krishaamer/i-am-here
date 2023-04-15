import React from "react";
import cn from "cnz";
import Confetti from "../components/confetti";

import { Chat, ITheme } from "@pushprotocol/uiweb";
import { Inter, Sora, Gloria_Hallelujah as Gloria, Rubik_80s_Fade as Rubik } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const zora = Sora({ subsets: ["latin"] });
const gloria = Gloria({ subsets: ["latin"], weight:["400"] });
const rubik = Rubik({ subsets: ["latin"], weight:["400"] });

export default function ChatSupportTest() {
  
  const theme: ITheme = {
    bgColorPrimary: "#FFB4EF",
    bgColorSecondary: "#FFB4EF",
    textColorPrimary: "#fff",
    textColorSecondary: "#fff",
    btnColorPrimary: "#FFB4EF",
    btnColorSecondary: "#fff",
    border: "1px solid #FFB4EF",
    borderRadius: "10px",
    moduleColor: "#fff",
  };

  return (
    <div>
      <div className="container mx-auto">
        <Confetti />
        <div className="header grid h-screen place-items-center">
          <h1 className={cn("text-5xl", gloria.className)}>I AM HERE.</h1>
        </div>
        <div className="header grid h-screen place-items-center">
          <h1 className={cn("text-5xl", gloria.className)}>Lisbon</h1>
        </div>
      </div>
      <div className="chat-container inter">
        <Chat
          account="0x3A6666e9d8fc42d903807EF35c713527223b1ce3"
          supportAddress="0x3A6666e9d8fc42d903807EF35c713527223b1ce3"
          // @ts-ignore: Unreachable code error
          env="staging"
          modalTitle="I AM HERE."
          theme={theme}
        />
      </div>
    </div>
  );
}