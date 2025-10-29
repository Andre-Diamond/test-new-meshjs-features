declare module '@meshsdk/react' {
  import type { PropsWithChildren, FC } from 'react';
  export const MeshProvider: FC<PropsWithChildren>;
  export const CardanoWallet: FC<any>;
  export function useWallet(): any;
}


