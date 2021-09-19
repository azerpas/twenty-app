import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Wallet model.
 */
export const WalletModel = types.model("Wallet").props({
    publicKey: types.maybe(types.string),
    privateKey: types.maybe(types.string)
})

type WalletType = Instance<typeof WalletModel>
export interface Wallet extends WalletType {}
type WalletSnapshotType = SnapshotOut<typeof WalletModel>
export interface WalletSnapshot extends WalletSnapshotType {}
export const createWalletDefaultModel = () => types.optional(WalletModel, {})