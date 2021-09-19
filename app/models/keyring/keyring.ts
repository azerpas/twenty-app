import { castToSnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { WalletModel, WalletSnapshot } from "../wallet/wallet";

/**
 * Keyring model.
 */
export const KeyringModel = types.model("Keyring").props({
    wallets: types.array(WalletModel)
})

type KeyringType = Instance<typeof KeyringModel>
export interface Keyring extends KeyringType {}
type KeyringSnapshotType = SnapshotOut<typeof KeyringModel>
export interface KeyringSnapshot extends KeyringSnapshotType {}
export const createKeyringDefaultModel = () => types.optional(KeyringModel, {})