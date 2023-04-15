import type { Web3ReactHooks } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import { getName } from "../utils/utils";
import { Accounts } from "./Accounts";
import { Chain } from "./Chain";
import { ConnectWithSelect } from "./ConnectWithSelect";
import { Status } from "./Status";

interface Props {
  connector: MetaMask;
  activeChainId: ReturnType<Web3ReactHooks["useChainId"]>;
  chainIds?: ReturnType<Web3ReactHooks["useChainId"]>[];
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
  error: Error | undefined;
  setError: (error: Error | undefined) => void;
  ENSNames: ReturnType<Web3ReactHooks["useENSNames"]>;
  provider?: ReturnType<Web3ReactHooks["useProvider"]>;
  accounts?: string[];
}

export function MetaCard({
  connector,
  activeChainId,
  chainIds,
  isActivating,
  isActive,
  error,
  setError,
  ENSNames,
  accounts,
  provider,
}: Props) {
  // <div
  //   style={{
  //     display: 'flex',
  //     flexDirection: 'column',
  //     justifyContent: 'space-between',
  //     width: '20rem',
  //     padding: '1rem',
  //     margin: '1rem',
  //     overflow: 'auto',
  //     border: '1px solid',
  //     borderRadius: '1rem',
  //   }}
  // >
  //   <b>{getName(connector)}</b>
  //   <div style={{ marginBottom: '1rem' }}>
  //     <Status isActivating={isActivating} isActive={isActive} error={error} />
  //   </div>
  //   <Chain chainId={activeChainId} />
  //   <div style={{ marginBottom: '1rem' }}>
  //     <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
  //   </div>
  return (
    <div>
      <ConnectWithSelect
        connector={connector}
        activeChainId={activeChainId}
        chainIds={chainIds}
        isActivating={isActivating}
        isActive={isActive}
        error={error}
        setError={setError}
      />
    </div>
  );
}
