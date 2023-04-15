import type { Web3ReactHooks } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { CHAINS, getAddChainParameters } from "../connectors/chains";

function ChainSelect({
  activeChainId,
  switchChain,
  chainIds,
}: {
  activeChainId: number;
  switchChain: (chainId: number) => void;
  chainIds: number[];
}) {
  return (
    <select
      value={activeChainId}
      onChange={(event) => {
        switchChain(Number(event.target.value));
      }}
      disabled={switchChain === undefined}
    >
      <option hidden disabled selected={activeChainId === undefined}>
        Select chain
      </option>
      <option value={-1} selected={activeChainId === -1}>
        Default
      </option>
      {chainIds.map((chainId) => (
        <option
          key={chainId}
          value={chainId}
          selected={chainId === activeChainId}
        >
          {CHAINS[chainId]?.name ?? chainId}
        </option>
      ))}
    </select>
  );
}

export function ConnectWithSelect({
  connector,
  activeChainId,
  chainIds = Object.keys(CHAINS).map(Number),
  isActivating,
  isActive,
  error,
  setError,
}: {
  connector: MetaMask;
  activeChainId: ReturnType<Web3ReactHooks["useChainId"]>;
  chainIds?: ReturnType<Web3ReactHooks["useChainId"]>[];
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
  error: Error | undefined;
  setError: (error: Error | undefined) => void;
}) {
  // @ts-ignore: Unreachable code error
  const [desiredChainId, setDesiredChainId] = useState<number>(undefined);

  /**
   * When user connects eagerly (`desiredChainId` is undefined) or to the default chain (`desiredChainId` is -1),
   * update the `desiredChainId` value so that <select /> has the right selection.
   */
  useEffect(() => {
    if (activeChainId && (!desiredChainId || desiredChainId === -1)) {
      setDesiredChainId(activeChainId);
    }
  }, [desiredChainId, activeChainId]);

  const switchChain = useCallback(
    async (desiredChainId: number) => {
      setDesiredChainId(desiredChainId);

      try {
        if (
          // If we're already connected to the desired chain, return. If they want to connect to the default chain and we're already connected, return

          desiredChainId === activeChainId ||
          (desiredChainId === -1 && activeChainId !== undefined)
        ) {
          setError(undefined);
          return;
        }

        await connector.activate(desiredChainId);

        setError(undefined);
      } catch (error) {
        // @ts-ignore: Unreachable code error
        setError(error);
      }
    },
    [connector, activeChainId, setError]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: "1rem" }} />
      {isActive ? (
        error ? (
          <Button onClick={() => switchChain(desiredChainId)}>
            Try again?
          </Button>
        ) : (
          <Button
            onClick={() => {
              if (connector?.deactivate) {
                void connector.deactivate();
              } else {
                void connector.resetState();
              }

              // @ts-ignore: Unreachable code error
              setDesiredChainId(undefined);
            }}
          >
            Disconnect
          </Button>
        )
      ) : (
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => switchChain(desiredChainId)}
        >
          {error ? "Try again?" : "Connect"}
        </Button>
      )}
    </div>
  );
}
