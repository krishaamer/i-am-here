import React from "react";
import { Chat, ITheme } from "@pushprotocol/uiweb";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

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
  const { chainId, account, activate, active, library } =
    useWeb3React<Web3Provider>();

  return (
    <div>
      <input />
      <Chat
        account={account || "0x3A6666e9d8fc42d903807EF35c713527223b1ce3"}
        supportAddress="0x3A6666e9d8fc42d903807EF35c713527223b1ce3"
        // @ts-ignore: Unreachable code error
        env="production"
        modalTitle={"I AM HERE"}
        theme={theme}
      />
    </div>
  );
}
