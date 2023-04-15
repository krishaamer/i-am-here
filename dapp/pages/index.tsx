import React from "react";
import cn from "cnz";
import Confetti from "../components/confetti";
import Friends from "../components/friends";
import ChatBox from "../components/chatbox";
import IntroAnimation from "../components/intro-animation";
import { Dropdown } from "flowbite-react";
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

  return (
    <div>
      <Head>
        <title>I am here.</title>
      </Head>
      <div className="container mx-auto">
        <Confetti />
        <div className="header grid h-screen place-items-center">
          <h1 className={cn("text-5xl", gloria.className)}>I AM HERE</h1>
          <IntroAnimation />
          <MetaMaskCard />
        </div>
        <div className="grid place-items-center">
          <span className="inline-block mb-4">
            <Dropdown
              label="Tokyo"
              dismissOnClick={false}
              size="xl"
              className="inline"
            >
              <Dropdown.Item>Taipei</Dropdown.Item>
              <Dropdown.Item>Lisbon</Dropdown.Item>
            </Dropdown>
          </span>
          <span className="inline-block">
            <Dropdown
              label="This week"
              dismissOnClick={false}
              size="xl"
              className="inline"
            >
              <Dropdown.Item>Taipei</Dropdown.Item>
              <Dropdown.Item>Lisbon</Dropdown.Item>
            </Dropdown>
          </span>
        </div>
        <div className="header grid place-items-center mt-20 mb-96">
          <h1 className={cn("text-5xl", gloria.className)}>
            People to meet in Tokyo
          </h1>
          <Friends friends={friends} />
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
