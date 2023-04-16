import type { Web3ReactHooks } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import { useCallback, useEffect, useState } from "react";
import { CHAINS, getAddChainParameters } from "../utils/chains";

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
          // If we're already connected to the desired chain, return
          desiredChainId === activeChainId ||
          // If they want to connect to the default chain and we're already connected, return
          (desiredChainId === -1 && activeChainId !== undefined)
        ) {
          setError(undefined);
          return;
        }

        if (desiredChainId === -1) {
          await connector.activate();
        } else {
          await connector.activate(getAddChainParameters(desiredChainId));
        }

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
      <ChainSelect
        activeChainId={desiredChainId}
        switchChain={switchChain}
        // @ts-ignore: Unreachable code error
        chainIds={chainIds}
      />
      <div style={{ marginBottom: "1rem" }} />
      {isActive ? (
        error ? (
          <button
            className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => switchChain(desiredChainId)}
          >
            Try again?
          </button>
        ) : (
          <button
            className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
          </button>
        )
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => switchChain(desiredChainId)}
          disabled={isActivating || !desiredChainId}
        >
          {error ? "Try again?" : "Connect"}
        </button>
      )}
    </div>
  );
}
