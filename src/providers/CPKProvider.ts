import { NonStandardTransaction, SafeProviderSendTransaction } from '../utils/transactions';

export interface CPKProviderInit {
  isConnectedToSafe: boolean;
  ownerAccount: string;
  masterCopyAddress: string;
  proxyFactoryAddress: string;
  multiSendAddress: string;
}

export interface CPKProviderInitResult {
  multiSend: any;
  contract: any;
  viewContract?: any;
  proxyFactory: any;
  viewProxyFactory?: any;
}

export interface TransactionResult {
  hash: string;
}

interface CPKProvider {
  init({
    isConnectedToSafe,
    ownerAccount,
    masterCopyAddress,
    proxyFactoryAddress,
    multiSendAddress
  }: CPKProviderInit): Promise<CPKProviderInitResult>;

  getProvider(): any;

  getNetworkId(): Promise<number>;

  getOwnerAccount(): Promise<string>;

  getCodeAtAddress(contract: any): Promise<string>;

  getContractAddress(contract: any): string;

  checkSingleCall(from: string, to: string, value: number, data: string): Promise<any>;

  attemptTransaction(
    contract: any,
    viewContract: any,
    methodName: string,
    params: Array<any>,
    sendOptions: object,
    err: Error
  ): Promise<TransactionResult>;

  attemptSafeProviderSendTx(
    tx: SafeProviderSendTransaction,
    options: object
  ): Promise<TransactionResult>;

  attemptSafeProviderMultiSendTxs(
    transactions: SafeProviderSendTransaction[]
  ): Promise<{ hash: string }>;

  encodeMultiSendCallData(transactions: NonStandardTransaction[]): string;

  getSendOptions(options: object, ownerAccount: string): object;
}

export default CPKProvider;
