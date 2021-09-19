import { castToSnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Key } from "@terra-money/terra.js"

/**
 * Example store containing Rick and Morty characters
 */
export const KeyringStoreModel = types
  .model("KeyringStore")
  .props({
    keyrings: types.optional(types.array(castToSnapshot(Key)), [] as any),
  })

type KeyringStoreType = Instance<typeof KeyringStoreModel>
export interface KeyringStore extends KeyringStoreType {}
type KeyringStoreSnapshotType = SnapshotOut<typeof KeyringStoreModel>
export interface KeyringStoreSnapshot extends KeyringStoreSnapshotType {}
export const createKeyringStoreDefaultModel = () => types.optional(KeyringStoreModel, {})
