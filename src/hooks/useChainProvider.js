import { providers } from 'ethers';
import { useAppContext } from 'src/auth/useAppContext';

export const useChainProvider = () => {
  let { chainUrl, chainId } = useAppContext();
  return new providers.StaticJsonRpcProvider(chainUrl, {
    chainId,
  });
};
