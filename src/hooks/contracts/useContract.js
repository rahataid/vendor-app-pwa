import { useWallet } from '@hooks/useWallet';
import { Contract, providers } from 'ethers';
import { useEffect, useState } from 'react';
import { useAppContext } from 'src/auth/useAppContext';
import { useAbi } from './useAbi';

export const useContract = (contractName, options = { isWebsocket: false }) => {
  let { chainWebSocket, contracts } = useAppContext();
  const [abi] = useAbi(contractName);
  const wallet = useWallet();
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (contracts && abi?.length && contractName) {
      let con = null;
      if (options?.isWebsocket)
        con = new Contract(
          options?.contractAddress || contracts[contractName],
          abi,
          new providers.WebSocketProvider(chainWebSocket)
        );
      else con = new Contract(options?.contractAddress || contracts[contractName], abi, wallet);
      setContract(con);
    }
  }, [abi, contracts]);
  // console.log('USE CONTRACT RES', contractName, contract);
  return contract;
};
