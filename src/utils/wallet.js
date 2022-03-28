import Errors from './errors';

export const connectWallet = async () => {
  if (window.ethereum) { // NOTE: if-else 리팩토링 할 수 있을까? 
    try {
      // call metamask
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // get current connecting wallet 
      return accounts[0];
    } catch (error) {
      throw Errors.CONNECT_FAILED;
    }
  } else {
    throw Errors.METAMASK_NOT_INSTALLED;
  }
}


export const getAccount = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      return accounts[0];
    } catch (error) {
      throw error.message;
    }
  } else {
    throw Errors.METAMASK_NOT_INSTALLED;
  }
};

export const getChainId = async () => {
  if (window.ethereum) {
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      return chainId;
    } catch (error) {
      throw error.message;
    }
  } else {
    throw Errors.METAMASK_NOT_INSTALLED;
  }
};
