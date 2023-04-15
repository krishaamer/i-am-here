import React from "react";
import cn from "cnz";
import Confetti from "../components/confetti";
import Events from "../components/events";
import Friends from "../components/friends";
import ChatBox from "../components/chatbox";
import {
  Sora,
  Gloria_Hallelujah
} from "next/font/google";
import MetaMaskCard from "../components/MetaMaskCard";
import Provider from "../components/Provider";
import Head from "next/head";

const sora = Sora({ subsets: ["latin"] });
const gloria = Gloria_Hallelujah({ subsets: ["latin"], weight: ["400"] });

// @ts-ignore: Unreachable code error
export default function StakeChat({ friends }) {

  //console.log(posts?.data?.TokenBalances?.TokenBalance);

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
          <h1 className={cn("text-5xl", gloria.className)}>Tokyo</h1>
        </div>
        <div className="header grid h-screen place-items-center">
          <h1 className={cn("text-5xl", gloria.className)}>
            People to meet at Pragma
          </h1>
          <Friends friends={friends} />
        </div>
        <div className="header grid h-screen place-items-center">
          <h1 className={cn("text-5xl", gloria.className)}>Events</h1>
          <div>
            <Events />
          </div>
        </div>
      </div>
      <div className="chat-container sora">
        <Provider>
          <ChatBox />
        </Provider>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://api.airstack.xyz/gql", {
    body: '{"query":"# Please verify the address 0x860B26a769FDBDBc293DC871e80A05c1E45eEf74\\nquery GetNFTOwners {\\n  TokenBalances(\\n    input: {\\n      filter: { \\n        tokenAddress: \\n        { _eq: \\"0x860B26a769FDBDBc293DC871e80A05c1E45eEf74\\" }, tokenType: { _in: [ERC1155, ERC721] } }\\n      blockchain: ethereum\\n      limit: 30\\n    }\\n  ) {\\n    TokenBalance {\\n      owner {\\n        addresses\\n        primaryDomain {\\n          name\\n        }\\n        domains {\\n          name\\n        }\\n      }\\n    }\\n  }\\n}","operationName":"GetNFTOwners"}',
    cache: "default",
    credentials: "include",
    headers: {
      Accept: "application/json, multipart/mixed",
      "Accept-Language": "en-GB,en;q=0.9",
      Authorization: "aaffa845f57e4e2386834c62b9abd402",
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15",
    },
    method: "POST",
    mode: "cors",
    redirect: "follow",
    referrer: "https://app.airstack.xyz/",
    referrerPolicy: "strict-origin-when-cross-origin",
  });
  const friends = await res.json();

  return {
    props: {
      friends,
    },
  };
}
