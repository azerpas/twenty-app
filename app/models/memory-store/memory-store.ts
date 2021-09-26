import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { KeyringModel } from "../keyring/keyring";

/**
 * Memory store  stores the decrypted wallet secrets. 
 * Data in this object stays in memory and will not be 
 * put into the device persistent storage. 
 */
export const MemoryStoreModel = types.model("MemoryStore")
    .props({
        isUnlocked: types.optional(types.boolean, false),
        keyrings: types.array(KeyringModel)
    })

type MemoryStoreType = Instance<typeof MemoryStoreModel>
export interface MemoryStore extends MemoryStoreType {}
type MemoryStoreSnapshotType = SnapshotOut<typeof MemoryStoreModel>
export interface MemoryStoreSnapshot extends MemoryStoreSnapshotType {}
export const createMemoryStoreDefaultModel = () => types.optional(MemoryStoreModel, {})
