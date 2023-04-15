fetch("https://api.airstack.xyz/gql", {
    "body": "{\"query\":\"# Please verify the address 0x860B26a769FDBDBc293DC871e80A05c1E45eEf74\\nquery GetNFTOwners {\\n  TokenBalances(\\n    input: {\\n      filter: { \\n        tokenAddress: \\n        { _eq: \\\"0x860B26a769FDBDBc293DC871e80A05c1E45eEf74\\\" }, tokenType: { _in: [ERC1155, ERC721] } }\\n      blockchain: ethereum\\n      limit: 50\\n    }\\n  ) {\\n    TokenBalance {\\n      owner {\\n        addresses\\n        primaryDomain {\\n          name\\n        }\\n        domains {\\n          name\\n        }\\n      }\\n    }\\n  }\\n}\",\"operationName\":\"GetNFTOwners\"}",
    "cache": "default",
    "credentials": "include",
    "headers": {
        "Accept": "application/json, multipart/mixed",
        "Accept-Language": "en-GB,en;q=0.9",
        "Authorization": "aaffa845f57e4e2386834c62b9abd402",
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15"
    },
    "method": "POST",
    "mode": "cors",
    "redirect": "follow",
    "referrer": "https://app.airstack.xyz/",
    "referrerPolicy": "strict-origin-when-cross-origin"
})