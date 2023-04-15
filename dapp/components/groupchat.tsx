import * as PushAPI from "@pushprotocol/restapi";
import config from "../config";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useEffect, useState } from "react";

const GroupChat = (props: any) => {
  return;
  const [user, setUser] = useState<any>(null);
  const [signer, setSigner] = useState<any>(null);
  const [pgpDecryptedPvtKey, setPgpDecryptedPvtKey] = useState<any>(null);
  const { chainId, account, provider } = useWeb3React<Web3Provider>();
  useEffect(() => {
    if (provider) {
      setSigner(provider.getSigner());
    }
  }, [provider]);

  useEffect(() => {
    const getSigner = async () => {
      if (signer) {
        const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
          encryptedPGPPrivateKey: user.encryptedPrivateKey,
          signer: signer as any,
          env: config.pushStage,
        });
      }
    };
    getSigner();
  }, [signer]);

  return <div></div>;
};

// 			const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
// 				encryptedPGPPrivateKey: getUser.encryptedPrivateKey,
// 				signer: ,
// 				env: config.pushStage,
// 			});

// 			const response = await PushAPI.chat.createGroup({
// 				groupName: randomName,
// 				groupDescription: 'This is the oficial group for Push Protocol',
// 				members: ['0x9e60c47edF21fa5e5Af33347680B3971F2FfD464', '0x3829E53A15856d1846e1b52d3Bdf5839705c29e5'],
// 				groupImage: ' &lt;group image link&gt;',
// 				admins: [],
// 				isPublic: true,
// 				//@ts-ignore
// 				signer,
// 				pgpPrivateKey: pgpDecryptedPvtKey,
// 				env: ENV.STAGING,
// 			});

//     const user = await PushAPI.user.get({
//         account: `eip155:${address}`,
//         env: "staging" as any,
//     });
//     if (!user) {
//         return await PushAPI.user.create({
//             signer: address,
//             env: ENV.STAGING,
//         });

// };
