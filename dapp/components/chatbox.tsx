import React from "react";
import { Chat, ITheme } from "@pushprotocol/uiweb";

export default function ChatBox() {

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
      <Chat
        account="0x3A6666e9d8fc42d903807EF35c713527223b1ce3"
        supportAddress="0xFfEa14430490eDB32Ed08828B2C237888972095b"
        // @ts-ignore: Unreachable code error
        env="staging"
        modalTitle="I AM HERE."
        theme={theme}
      />
    </div>
  );
}
