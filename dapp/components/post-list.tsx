import { gql, useQuery, NetworkStatus } from "@apollo/client";

export const ALL_POSTS_QUERY = gql`
  query GetOwners {
    TokenBalances(
      input: {
        filter: {
          tokenAddress: { _eq: "0x860B26a769FDBDBc293DC871e80A05c1E45eEf74" }
        }
        blockchain: ethereum
        limit: 10
      }
    ) {
      TokenBalance {
        owner {
          addresses
          primaryDomain {
            name
          }
          domains {
            name
          }
          socials {
            profileName
            userAddress
            userAssociatedAddresses
          }
        }
      }
    }
  }
`;

export default function PostList() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_POSTS_QUERY,
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  const { allPosts } = data;

  if (error) return <div>Error loading posts.</div>;

  return (
    <section>
      <ul>
       ad
      </ul>
    </section>
  );
}
