declare module 'react-native-mnemonic-key' {
    import { RawKey } from '@terra-money/terra.js';
    
    declare type NativeMKExports = {
        generateMnemonic(): Promise<string>;
        derivePrivateKey(mnemonic: string, coinType: number, account: number, index: number): Promise<string>;
    };
    export declare const MK: NativeMKExports;
    export declare const LUNA_COIN_TYPE = 330;
    interface MnemonicKeyOptions {
        /**
         * Space-separated list of words for the mnemonic key.
         */
        mnemonic?: string;
        /**
         * BIP44 account number.
         */
        account?: number;
        /**
         * BIP44 index number
         */
        index?: number;
        /**
         * Coin type. Default is LUNA, 330.
         */
        coinType?: number;
    }
    /**
     * Implements a BIP39 mnemonic wallet with standard key derivation from a word list. Note
     * that this implementation exposes the private key in memory, so it is not advised to use
     * for applications requiring high security.
     */
    export declare class RNMnemonicKey extends RawKey {
        mnemonic: string;
        privateKey: Buffer;
        private constructor();
        /**
         * Creates a new signing key from a mnemonic phrase. If no mnemonic is provided, one
         * will be automatically generated.
         *
         * ### Providing a mnemonic
         *
         * ```ts
         * import { MnemonicKey } from 'terra.js';
         *
         * const mk = new MnemonicKey({ mnemonic: '...' });
         * console.log(mk.accAddress);
         * ```
         *
         * ### Generating a random mnemonic
         *
         * ```ts
         * const mk2 = new MnemonicKey();
         * console.log(mk2.mnemonic);
         * ```
         *
         * @param options
         */
        static create(options?: MnemonicKeyOptions): Promise<RNMnemonicKey>;
    }
    export {};
}