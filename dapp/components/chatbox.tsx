import React, { useEffect } from "react";
import { Chat, ITheme, NotificationItem } from "@pushprotocol/uiweb";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { user } from "@pushprotocol/restapi";

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
  const { account } = useWeb3React<Web3Provider>();
  const [notifications, setNotifications] = React.useState<any>([]);
  useEffect(() => {
    const getNotifications = async () => {
      const notifications = await user.getFeeds({
        user: "eip155:5:" + account, // user address in CAIP
        env: "staging" as any,
      });
      setNotifications(notifications);
    };
    if (account) {
      getNotifications();
    }
  }, []);
  return (
    <div>
      <div>
        {notifications.map((oneNotification: any, i: number) => {
          const {
            cta,
            title,
            message,
            app,
            icon,
            image,
            url,
            blockchain,
            notification,
          } = oneNotification;

          return (
            <NotificationItem
              key={i} // any unique id
              notificationTitle={title}
              notificationBody={message}
              cta={cta}
              app={app}
              icon={icon}
              image={image}
              url={url}
              theme={theme as any}
              chainName={blockchain}
              // chainName={blockchain as chainNameType} // if using Typescript
            />
          );
        })}
      </div>
      {account && (
        <Chat
          account={account}
          supportAddress="0x3A6666e9d8fc42d903807EF35c713527223b1ce3"
          // @ts-ignore: Unreachable code error
          env="staging"
          modalTitle={"I AM HERE"}
          theme={theme}
        />
      )}
    </div>
  );
}
