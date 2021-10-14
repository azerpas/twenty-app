import { cast, castToSnapshot, flow, Instance, SnapshotOut, types } from "mobx-state-tree"
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
        persist: flow(function* (keyrings: Keyring[], password: string) {
            console.log(`persisting...`);
            const serialized = keyrings.map(
                (value) => value.serialize()
            );
            console.log(`${serialized}`);
            self.encryptedKeyrings = yield encryptor.encrypt(password, serialized);
            console.log(`encrypted: ${self.encryptedKeyrings}`)
        }),
        setUnlocked: () => { self.isUnlocked = !self.isUnlocked },
        unlockKeyrings: flow(function* (password: string) {
            if(!self.encryptedKeyrings)
                throw new Error("Canno't unlock keyrings: encryptedKeyrings is empty.");
            
            const serialized = yield encryptor.decrypt(password, self.encryptedKeyrings);
            console.log(serialized);
        }),
        clearKeyrings: () => {
            self.keyrings = cast([]);
        },
        getUnlocked: () => self.isUnlocked,
        hello: () => console.log(`:)`)
    }))

type KeyringStoreType = Instance<typeof KeyringStoreModel>
export interface KeyringStore extends KeyringStoreType {}
type KeyringStoreSnapshotType = SnapshotOut<typeof KeyringStoreModel>
export interface KeyringStoreSnapshot extends KeyringStoreSnapshotType {}
export const createKeyringStoreDefaultModel = () => types.optional(KeyringStoreModel, {})
