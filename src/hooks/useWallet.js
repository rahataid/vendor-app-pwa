import ethers, { providers } from 'ethers';
import { useAppContext } from 'src/auth/useAppContext';

export const useWallet = (privateKey) => {
  let { chainUrl, chainId, wallet } = useAppContext();
  if (privateKey) wallet = new ethers.Wallet(privateKey);

  return wallet?.connect(
    new providers.StaticJsonRpcProvider(chainUrl, {
      chainId,
    })
  );
};
