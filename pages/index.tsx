import React from "react";
import { Chat, ITheme } from "@pushprotocol/uiweb";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function ChatSupportTest() {
  const theme: ITheme = {
    bgColorPrimary: "#efefef",
    bgColorSecondary: "#efefef",
    textColorPrimary: "#ffffff",
    textColorSecondary: "#ffffff",
    btnColorPrimary: "#246724",
    btnColorSecondary: "#ffffff",
    border: "none",
    borderRadius: "0",
    moduleColor: "#efefef",
  };

  return (
    <Chat
      account="0x3A6666e9d8fc42d903807EF35c713527223b1ce3"
      supportAddress="0x3A6666e9d8fc42d903807EF35c713527223b1ce3"
      env="staging"
      theme={theme}
    />
  );
}