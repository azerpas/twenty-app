import { cast, castToSnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"
import encryptor from "@metamask/browser-passworder";
import { Keyring, KeyringModel } from "../keyring/keyring";

/**
 * Example store containing Keyrings
 */
export const KeyringStoreModel = types.model("KeyringStore")
    .props({
        encryptedKeyrings: types.maybe(types.string),
        isUnlocked: types.optional(types.boolean, false),
        keyrings: types.array(KeyringModel)
    })
    .actions(self => ({
        persist: async (keyrings: Keyring[], password: string) => {
            const serialized = await keyrings.map(
                (value) => value.serialize()
            );
            self.encryptedKeyrings = await encryptor.encrypt(password, serialized);
        },
        setUnlocked: () => { self.isUnlocked = !self.isUnlocked },
        unlockKeyrings: async (password: string) => {
            if(!self.encryptedKeyrings)
                throw new Error("Canno't unlock keyrings: encryptedKeyrings is empty.");
            
            const serialized = await encryptor.decrypt(password, self.encryptedKeyrings);
            console.log(serialized);
        },
        clearKeyrings: () => {
            self.keyrings = cast([]);
        },
        hello: () => console.log("HELLOo")
    }))

type KeyringStoreType = Instance<typeof KeyringStoreModel>
export interface KeyringStore extends KeyringStoreType {}
type KeyringStoreSnapshotType = SnapshotOut<typeof KeyringStoreModel>
export interface KeyringStoreSnapshot extends KeyringStoreSnapshotType {}
export const createKeyringStoreDefaultModel = () => types.optional(KeyringStoreModel, {})
