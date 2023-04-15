import React from "react";
import { Chat, ITheme } from "@pushprotocol/uiweb";
import { Inter, Sora, Gloria_Hallelujah } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const zora = Sora({ subsets: ["latin"] });
const gloria = Gloria_Hallelujah({ subsets: ["latin"], weight:["400"] });

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
        <div className="header grid h-screen place-items-center">
          <h1 className="text-5xl gloria">I AM HERE.</h1>
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