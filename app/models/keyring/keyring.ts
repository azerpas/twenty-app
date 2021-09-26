import { castToSnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { WalletModel, WalletSnapshot } from "../wallet/wallet";
import { MnemonicKey } from "@terra-money/terra.js";

/**
 * Keyring model.
 */
export const KeyringModel = types.model("Keyring")
    .props({
        wallets: types.array(WalletModel),
        mnemonic: types.maybe(types.string)
    }).actions(self => ({
        serialize: async () => {
            return await self.wallets.map(value => { 
                return { privateKey: value.privateKey, publicKey: value.publicKey }
            });
        }
    }))

type KeyringType = Instance<typeof KeyringModel>
export interface Keyring extends KeyringType {}
type KeyringSnapshotType = SnapshotOut<typeof KeyringModel>
export interface KeyringSnapshot extends KeyringSnapshotType {}
export const createKeyringDefaultModel = () => types.optional(KeyringModel, {})